// file that contain all the CRUD (create, read, update, delete)

const db = require('../db');

exports.getAll = (req, res) => {
    const query = `SELECT e.*, l.room_name, l.building_type FROM equipment e 
                   LEFT JOIN locations l ON e.location_id = l.id`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const data = rows.map(row => ({
            id: row.id, model: row.model, equipment_type: row.equipment_type,
            updated_at: row.updated_at,
            loc: { id: row.location_id, room_name: row.room_name, building_type: row.building_type }
        }));
        res.json({ data });
    });
};

exports.create = (req, res) => {
    const { model, equipment_type, location_id } = req.body;
    const query = `INSERT INTO equipment (model, equipment_type, location_id) VALUES (?, ?, ?)`;
    db.run(query, [model, equipment_type, location_id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, model, equipment_type, location_id });
    });
};

exports.update = (req, res) => {
    const { model, equipment_type, location_id } = req.body;
    const query = `UPDATE equipment SET model=?, equipment_type=?, location_id=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`;
    db.run(query, [model, equipment_type, location_id, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Updated' });
    });
};

exports.transfer = (req, res) => {
    const query = `UPDATE equipment SET location_id=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`;
    db.run(query, [req.body.location_id, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Transferred' });
    });
};

exports.remove = (req, res) => {
    db.run(`DELETE FROM equipment WHERE id = ?`, req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted' });
    });
};