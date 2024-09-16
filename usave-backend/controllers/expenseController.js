const connection = require('../config/db'); // Ensure this points to your database connection

// Add Expense
exports.addExpense = (req, res) => {
    const { name, amount, date } = req.body;
    const query = `INSERT INTO expenses (user_id, name, amount, date) VALUES (?, ?, ?, ?)`;
    connection.execute(query, [req.user.id, name, amount, date], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error adding expense' });
        res.status(201).json({ message: 'Expense added' });
    });
};

// Get User Expenses
exports.getExpenses = (req, res) => {
    const query = `SELECT * FROM expenses WHERE user_id = ?`;
    connection.execute(query, [req.user.id], (err, expenses) => {
        if (err) return res.status(500).json({ message: 'Error fetching expenses' });
        res.json(expenses);
    });
};

// Edit Expense
exports.editExpense = (req, res) => {
    const { id, name, amount, date } = req.body;
    const query = `UPDATE expenses SET name = ?, amount = ?, date = ? WHERE id = ? AND user_id = ?`;
    connection.execute(query, [name, amount, date, id, req.user.id], (err, result) => {
        if (err) {
            console.error('Error updating expense:', err); // Log the error for debugging
            return res.status(500).json({ message: 'Error updating expense' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Expense not found or you do not have permission to edit this expense' });
        }
        res.status(200).json({ message: 'Expense updated successfully' });
    });
};


// Delete Expense
exports.deleteExpense = (req, res) => {
    const { id } = req.body; // Expecting the ID of the expense to delete

    console.log('Deleting expense with ID:', id); // Log the ID
    console.log('User ID from token:', req.user.id); // Log the user ID

    const query = `DELETE FROM expenses WHERE id = ? AND user_id = ?`;
    connection.execute(query, [id, req.user.id], (err, result) => {
        if (err) {
            console.error('Error deleting expense:', err);
            return res.status(500).json({ message: 'Error deleting expense' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted successfully' });
    });
};


