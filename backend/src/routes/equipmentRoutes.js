// file that contain all the CRUD (create, read, update, delete) routes

const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all equipment
router.get('/', (req, res) => {
    const query = `
        SELECT e.id, e.model, e.equipment_type,
               l.room_name, l.building_type
        FROM equipment e
        LEFT JOIN locations l ON e.location_id = l.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// GET one equipment item by ID (with location details)
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `
        SELECT e.id, e.model, e.equipment_type,
               l.id AS location_id, l.room_name, l.building_type
        FROM equipment e
        LEFT JOIN locations l ON e.location_id = l.id
        WHERE e.id = ?
    `;
    db.get(query, [id], (err, row) => {
        if (err) return res.status(500).send(err.message);
        if (!row) return res.status(404).json({ error: 'Equipment not found' });
        res.json(row);
    });
});

// ADD new equipment
router.post('/', (req, res) => {
    const { model, equipment_type, location_id } = req.body;
    const query = `
        INSERT INTO equipment (model, equipment_type, location_id)
        VALUES (?, ?, ?)
    `;
    db.run(query, [model, equipment_type, location_id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.json({ id: this.lastID, model, equipment_type, location_id });
    });
});

// UPDATE equipment
router.put('/:id', (req, res) => {
    const { id } = req.params; // extracts the ID from the URL
    const { model, equipment_type, location_id } = req.body;
    const query = `
        UPDATE equipment
        SET model = ?, equipment_type = ?, location_id = ?
        WHERE id = ?
    `;
    db.run(query, [model, equipment_type, location_id, id], function (err) {
        if (err) return res.status(500).send(err.message);
        if (this.changes === 0) return res.status(404).send('Equipment not found');
        res.json({
            id,
            model,
            equipment_type,
            location_id
        });
    });
});

// Update equipment location (transfer between locations)
router.put('/:id/location', (req, res) => {
    const { id } = req.params;
    const { location_id } = req.body;

    const query = `
        UPDATE equipment
        SET location_id = ?
        WHERE id = ?
    `;

    db.run(query, [location_id, id], function(err) {
        if (err) return res.status(500).send(err.message);
        if (this.changes === 0) return res.status(404).send("Equipment not found");
        res.json({ transferredID: id, newLocation: location_id });
    });
});

// DELETE equipment
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM equipment WHERE id = ?`;

    db.run(query, id, function (err) {
        if (err) return res.status(500).send(err.message);
        if (this.changes === 0) return res.status(404).send('Equipment not found');
        res.json({ deletedID: id });
    });
});

module.exports = router;
