// src/components/AddExpense.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddExpense.css'; // Import CSS for specific styling

const AddExpense = ({ token, onAdd }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5003/api/expenses/add', {
                name,
                amount: parseFloat(amount),
                date,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setName('');
            setAmount('');
            setDate('');
            onAdd();
            navigate('/expenses');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div className="container">
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
                    placeholder="$"
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
            <button
                onClick={() => navigate('/expenses')}
                style={{ marginTop: '15px', background: 'none', border: 'none', color: '#007aff', cursor: 'pointer' }}
            >
                Go Back
            </button>
        </div>
    );
};

export default AddExpense;
