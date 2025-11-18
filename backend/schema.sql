-- Locations table
CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_name TEXT NOT NULL,
    building_type TEXT NOT NULL
);

-- Equipment table
CREATE TABLE IF NOT EXISTS equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model TEXT NOT NULL,
    equipment_type TEXT NOT NULL,
    location_id INTEGER,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Sample data
INSERT INTO locations (room_name, building_type) VALUES
('HON Warehouse', 'Warehouse'),
('HON 3017', 'Classroom'),
('HON 4015B', 'Office');

INSERT INTO equipment (model, equipment_type, location_id) VALUES
('HP LaserJet', 'Printer', 2),
('Dell Elite8', 'Laptop', 3),
('Dell Monitor', 'Monitor', 1);
