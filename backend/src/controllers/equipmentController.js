// file that contain all the CRUD (create, read, update, delete)

const db = require('../db');

exports.getAll = (req, res) => {
    const query = `SELECT e.*, l.id AS loc_id, l.room_name, l.building_type FROM equipment e 
                   LEFT JOIN locations l ON e.location_id = l.id`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const data = rows.map(row => ({
            eqId: row.id, 
            eqModel: row.model,
            eqType: row.equipment_type,
            eqUpdatedAt: row.updated_at,
            eqLocId: row.loc_id, 
            eqRoomName: row.room_name, 
            eqBuildingType: row.building_type
        }));
        res.json({ data });
    });
};

exports.create = (req, res) => {
    const { ceiModel, ceiEqType, ceiLocId } = req.body;
    const query = `INSERT INTO equipment (model, equipment_type, location_id) VALUES (?, ?, ?)`;
    db.run(query, [ceiModel, ceiEqType, ceiLocId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ eqId: this.lastID, eqModel: ceiModel, eqType: ceiEqType, eqLocId: ceiLocId });
    });
};

exports.update = (req, res) => {
    const { ceiModel, ceiEqType, ceiLocId } = req.body;
    const query = `UPDATE equipment SET model=?, equipment_type=?, location_id=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`;
    db.run(query, [ceiModel, ceiEqType, ceiLocId, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Updated' });
    });
};

exports.transfer = (req, res) => {
    const query = `UPDATE equipment SET location_id=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`;
    db.run(query, [req.body.ceiLocId, req.params.id], function(err) {
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