const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/auth');

// Routes for expenses
router.post('/add', authMiddleware, expenseController.addExpense);
router.get('/', authMiddleware, expenseController.getExpenses);
router.put('/edit', authMiddleware, expenseController.editExpense); // Route for editing an expense
router.delete('/delete', authMiddleware, expenseController.deleteExpense);

module.exports = router;
