const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Import database connection
const auth = require('../middleware/auth'); // Import authentication middleware

const router = express.Router();

// User Registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const sqlCheckUser = 'SELECT * FROM users WHERE username = ?';
    connection.query(sqlCheckUser, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password' });
            }

            // Insert new user into the database
            const sqlInsertUser = 'INSERT INTO users (username, password) VALUES (?, ?)';
            connection.query(sqlInsertUser, [username, hash], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Error registering user' });
                }
                res.status(201).json({ success: true, message: 'User registered successfully' });
            });
        });
    });
});

// User Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user in the database
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const user = results[0];

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ message: 'Authentication failed' });
            }

            // Create a JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.status(200).json({ token });
        });
    });
});

// Protected route example
router.get('/protected', auth, (req, res) => {
    res.json({ message: 'You have access to this protected route!', user: req.user });
});

module.exports = router;
