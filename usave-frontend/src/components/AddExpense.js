// src/components/AddExpense.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const AddExpense = ({ token, onAdd }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5003/api/expenses/add', {
                name,
                amount: parseFloat(amount), // Ensure amount is a number
                date,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setName('');
            setAmount('');
            setDate('');
            onAdd(); // Notify parent to fetch updated expense list
            navigate('/expenses'); // Redirect to expense list after adding
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div>
            {/* Go Back button */}
            <button
                onClick={() => navigate('/expenses')}
                style={{ position: 'absolute', top: '10px', left: '10px' }}
            >
                Go Back
            </button>

            <form onSubmit={handleSubmit}>
                <h2>Add Expense</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Expense Name"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
