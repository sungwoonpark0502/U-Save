const express = require('express');
require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./config/db'); // Import the connection from db.js
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes); // User routes for registration and login
app.use('/api/expenses', expenseRoutes); // Expense routes for managing expenses

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
