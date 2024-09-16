const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register User
exports.register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.execute(query, [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error creating user' });
    res.status(201).json({ message: 'User registered' });
  });
};

// Login User
exports.login = (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ?`;
  db.execute(query, [username], (err, users) => {
    if (err || users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = users[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  });
};
