// file to create the database and its tables
// reads the schema.sql file and executes all CREATE TABLE and INSERT
// after it runs, my database.db file exists

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// path.join to avoid issues between OS's paths
const dbFile = path.join(__dirname, '../database.db');
const schemaFile = path.join(__dirname, '../../schema.sql');

// Delete existing database only if it exists
if (fs.existsSync(dbFile)){
    fs.unlinkSync(dbFile);
    console.log('Old database deleted.');
}

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to SQLite database.');
});

const schema = fs.readFileSync(schemaFile, 'utf8');

db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.error('Schema Execution Error:', err.message);
        } else {
            console.log('Database initialized successfully with schema.sql!');
        }
    });
});

db.close();
