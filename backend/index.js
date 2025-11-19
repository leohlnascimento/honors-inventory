// this is my file to run my backend server and handle requests from clients
// it connects to the existing database (database.db) and lets my routes query, add, update, or delete data

const express = require('express'); // import the Express library
const cors = require('cors');
const app = express(); // creating an Express application
const PORT = 3001; // defining the port my server will run on; 3000 is the frontend

app.use(cors());
app.use(express.json());

// load routes
const equipmentRoutes = require('./src/routes/equipmentRoutes');
const locationRoutes = require('./src/routes/locationRoutes')
app.use('/equipment', equipmentRoutes);
app.use('/locations', locationRoutes);

// initially, here I connected with the database
// but now that code is in db.js
const db = require('./src/db');

// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Honors Inventory Backend is running!');
});