const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/auth');

// Routes for expenses
router.post('/add', authMiddleware, expenseController.addExpense);
router.get('/', authMiddleware, expenseController.getExpenses);
router.put('/edit', authMiddleware, expenseController.editExpense);
router.delete('/:id', authMiddleware, expenseController.deleteExpense); // Change here

module.exports = router;
