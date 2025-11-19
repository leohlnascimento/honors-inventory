const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all locations
router.get('/', (req, res) => {
    const query = `
        SELECT id, room_name, building_type
        FROM locations
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// GET one location by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `
        SELECT id, room_name, building_type
        FROM locations
        WHERE id = ?
    `;
    db.get(query, [id], (err, row) => {
        if (err) return res.status(500).send(err.message);
        if (!row) return res.status(404).json({ error: 'Location not found' });
        res.json(row);
    });
});

module.exports = router;
