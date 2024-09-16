// src/components/EditExpense.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditExpense = ({ token }) => {
    const { id } = useParams(); // Get the expense ID from the URL
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await axios.get(`http://localhost:5003/api/expenses/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const expense = response.data;
                setName(expense.name);
                setAmount(expense.amount);
                setDate(expense.date);
            } catch (error) {
                console.error('Error fetching expense:', error);
                setError('Could not fetch expense details. Please try again.');
            }
        };

        fetchExpense();
    }, [id, token]);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5003/api/expenses/${id}`, {
                name,
                amount,
                date,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/expenses'); // Navigate back to the expense list after editing
        } catch (error) {
            console.error('Error updating expense:', error);
            setError('Error updating expense. Please check your inputs and try again.');
        }
    };

    return (
        <div className="edit-expense-container">
            <h2>Edit Expense</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleEdit}>
                <input
                    type="text"
                    placeholder="Expense Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
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
        </div>
    );
};

export default EditExpense;
