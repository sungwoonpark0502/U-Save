// src/components/ExpenseList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ExpenseList.css'; // Import the CSS file

const ExpenseList = ({ token, setToken }) => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [budget, setBudget] = useState(0); // State for budget
    const [remainingBudget, setRemainingBudget] = useState(0); // State for remaining budget
    const [percentageUsed, setPercentageUsed] = useState(0); // State for percentage used
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5003/api/expenses', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Sort expenses by date in ascending order (oldest to newest)
                const sortedExpenses = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));

                setExpenses(sortedExpenses);
                setFilteredExpenses(sortedExpenses);

                // Extract unique years and months from the expenses
                const uniqueYears = [...new Set(sortedExpenses.map(expense => new Date(expense.date).getFullYear()))];
                const uniqueMonths = [...Array(12).keys()].map(i => i + 1); // Generate months 1-12

                setYears(uniqueYears);
                setMonths(uniqueMonths);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, [token]);

    const handleYearChange = (e) => {
        const year = e.target.value;
        setSelectedYear(year);
        filterExpenses(year, selectedMonth);
    };

    const handleMonthChange = (e) => {
        const month = e.target.value;
        setSelectedMonth(month);
        filterExpenses(selectedYear, month);
    };

    const filterExpenses = (year, month) => {
        let filtered = expenses;

        if (year) {
            filtered = filtered.filter(expense => new Date(expense.date).getFullYear() === parseInt(year, 10));
        }
        if (month) {
            filtered = filtered.filter(expense => new Date(expense.date).getMonth() + 1 === parseInt(month, 10)); // getMonth returns 0-11
        }

        setFilteredExpenses(filtered);
        calculateBudget(filtered); // Calculate budget based on filtered expenses
    };

    const calculateBudget = (filtered) => {
        const totalSpent = filtered.reduce((acc, expense) => acc + expense.amount, 0);
        const remaining = budget - totalSpent;
        const percentage = budget > 0 ? ((totalSpent / budget) * 100).toFixed(2) : 0;

        setRemainingBudget(remaining);
        setPercentageUsed(percentage);
    };

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
        calculateBudget(filteredExpenses); // Recalculate budget when user inputs new budget
    };

    const handleLogout = () => {
        setToken(''); // Clear the token
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="expense-list-container"> {/* Use the new class for centering */}
            <h2>Expense List</h2>

            {/* Logout button */}
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="year">Year: </label>
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                    <option value="">All</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <label htmlFor="month" style={{ marginLeft: '20px' }}>Month: </label>
                <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                    <option value="">All</option>
                    {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="budget">Budget: </label>
                <input 
                    type="number" 
                    id="budget" 
                    value={budget} 
                    onChange={handleBudgetChange} 
                    placeholder="Enter budget"
                />
            </div>

            <div>
                <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
                <p>Percentage Used: {percentageUsed}%</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button onClick={() => navigate('/add-expense')}>
                    Add Expense
                </button>
            </div>

            <ul>
                {filteredExpenses.length > 0 ? (
                    filteredExpenses.map(expense => (
                        <li key={expense.id}>
                            {expense.name}: ${expense.amount} on {new Date(expense.date).toLocaleDateString()}
                        </li>
                    ))
                ) : (
                    <li>No expenses found.</li>
                )}
            </ul>
        </div>
    );
};

export default ExpenseList;
