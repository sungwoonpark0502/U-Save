const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return; // Exit if there's a connection error
    }
    console.log('Connected to the MySQL database');
});

// Handle connection errors
connection.on('error', (err) => {
    console.error('Database connection error:', err);
});

// Export the connection for use in other files
module.exports = connection;
