// src/components/EditExpense.js
import React, { useState } from 'react';
import axios from 'axios';

const EditExpense = ({ token, expense, onEdit }) => {
    const [name, setName] = useState(expense.name);
    const [amount, setAmount] = useState(expense.amount);
    const [date, setDate] = useState(expense.date);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5003/api/expenses/edit`, {
                id: expense.id,
                name,
                amount,
                date
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            onEdit();
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    return (
        <form onSubmit={handleEdit}>
            <h2>Edit Expense</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">Update Expense</button>
        </form>
    );
};

export default EditExpense;
