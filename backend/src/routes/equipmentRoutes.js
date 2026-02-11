// file that contain all the CRUD (create, read, update, delete) routes

const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all equipment (with location details)
router.get('/', (req, res) => {
    const query = `
        SELECT e.*, l.room_name, l.building_type
        FROM equipment e
        LEFT JOIN locations l ON e.location_id = l.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// ADD new equipment
router.post('/', (req, res) => {
    const { model, equipment_type, location_id } = req.body;

    if (!model || !equipment_type || !location_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
        INSERT INTO equipment (model, equipment_type, location_id)
        VALUES (?, ?, ?)
    `;

    db.run(query, [model, equipment_type, location_id], function (err) {
        if (err) {
            if (err.message.includes('FOREIGN KEY constraint failed')) {
                return res.status(400).json({ error: 'Invalid location_id' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, model, equipment_type, location_id });
    });
});

// UPDATE equipment details (Model, Type, etc.)
router.put('/:id', (req, res) => {
    const { id } = req.params; // extracts the ID from the URL
    const { model, equipment_type, location_id } = req.body;

    if (!model || !equipment_type || !location_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
        UPDATE equipment
        SET model = ?, equipment_type = ?, location_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    db.run(query, [model, equipment_type, location_id, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Equipment not found' });
        res.json({
            id,
            model,
            equipment_type,
            location_id
        });
    });
});

// PATCH: Update equipment location (Transfer)
// why .patch and not .put? to follow REST standards for partial updates
router.patch('/:id/transfer', (req, res) => {
    const { id } = req.params;
    const { location_id } = req.body;

    if (!location_id) return res.status(400).json({ error: 'location_id is required' });

    const query = `
        UPDATE equipment
        SET location_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    db.run(query, [location_id, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Equipment not found' });
        res.json({ id, location_id, message: 'Transfer successful'});
    });
});

// DELETE equipment
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM equipment WHERE id = ?`;

    db.run(query, id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Equipment not found' });
        res.json({ message: 'Deleted successfully', deletedID: id });
    });
});

module.exports = router;
