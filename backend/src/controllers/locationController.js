const db = require('../db');

exports.getAll = (req, res) => {
    const query = `SELECT id, room_name, building_type FROM locations`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows }); //'data' to match frontend API calls
    });
};

exports.getById = (req, res) => {
    const query = `SELECT id, room_name, building_type FROM locations WHERE id = ?`;
    db.get(query, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Location not found' });
        res.json({ data: row });
    });
};