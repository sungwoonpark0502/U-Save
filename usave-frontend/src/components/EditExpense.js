import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditExpense = ({ token }) => {
    const { id } = useParams();
    const [expense, setExpense] = useState({ name: '', amount: '', date: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await axios.get(`http://localhost:5003/api/expenses/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setExpense(response.data);
            } catch (error) {
                console.error('Error fetching expense:', error);
            }
        };

        fetchExpense();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5003/api/expenses/${id}`, expense, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            navigate('/expenses'); // Navigate back to the expense list after editing
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    return (
        <div>
            <h2>Edit Expense</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={expense.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Expense</button>
            </form>
        </div>
    );
};

export default EditExpense;
