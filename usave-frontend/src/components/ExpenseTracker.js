// src/components/ExpenseTracker.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import EditExpense from './EditExpense';

const ExpenseTracker = ({ token }) => {
    const [expenses, setExpenses] = useState([]);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [refresh, setRefresh] = useState(false); // State to trigger refresh

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:5003/api/expenses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setExpenses(response.data); // Assuming response data is an array of expenses
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleAddExpense = () => {
        fetchExpenses(); // Refresh expenses list after adding a new expense
    };

    const handleEditExpense = (expense) => {
        setCurrentExpense(expense);
    };

    useEffect(() => {
        fetchExpenses(); // Fetch expenses when component mounts
    }, [token, refresh]); // Include token and refresh in dependencies

    return (
        <div>
            <h1>USave - Expense Tracker</h1>
            <AddExpense token={token} onAdd={handleAddExpense} /> {/* Pass refresh callback */}
            <ExpenseList expenses={expenses} /> {/* Pass expenses state */}
            {currentExpense && (
                <EditExpense 
                    token={token} 
                    expense={currentExpense} 
                    onEdit={() => {
                        setCurrentExpense(null);
                        handleAddExpense(); // Refresh the list after editing
                    }} 
                />
            )}
        </div>
    );
};

export default ExpenseTracker;
