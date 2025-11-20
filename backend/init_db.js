// file to create the database and its tables
// reads the schema.sql file and executes all CREATE TABLE and INSERT
// after it runs, my database.db file exists

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './database.db';
const schemaFile = '../schema.sql';

// Delete existing database
fs.unlinkSync(dbFile);

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to database.');
});

const schema = fs.readFileSync(schemaFile, 'utf8');

db.exec(schema, (err) => {
    if (err) return console.error(err.message);
    console.log('Database initialized successfully!');
});

db.close();
