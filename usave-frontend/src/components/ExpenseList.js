import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ExpenseList.css';

const ExpenseList = ({ token, setToken }) => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [budget, setBudget] = useState(0);
    const [remainingBudget, setRemainingBudget] = useState(0);
    const [percentageUsed, setPercentageUsed] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5003/api/expenses', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const sortedExpenses = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setExpenses(sortedExpenses);
                setFilteredExpenses(sortedExpenses);

                const uniqueYears = [...new Set(sortedExpenses.map(expense => new Date(expense.date).getFullYear()))];
                const uniqueMonths = [...Array(12).keys()].map(i => i + 1); // Generate months 1-12

                setYears(uniqueYears);
                setMonths(uniqueMonths);

                calculateTotalSpent(sortedExpenses);
                calculateBudget(sortedExpenses); // Initial budget calculation
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
            filtered = filtered.filter(expense => new Date(expense.date).getMonth() + 1 === parseInt(month, 10));
        }

        setFilteredExpenses(filtered);
        calculateBudget(filtered);
        calculateTotalSpent(filtered);
    };

    const calculateBudget = (filtered, budgetInput) => {
        const totalSpent = filtered.reduce((acc, expense) => acc + Number(expense.amount), 0);
        const remaining = budgetInput - totalSpent;
        const percentage = budgetInput > 0 ? ((totalSpent / budgetInput) * 100).toFixed(2) : 0;
    
        setRemainingBudget(Number(remaining.toFixed(2)));
        setPercentageUsed(percentage);
    };

    const calculateTotalSpent = (filtered) => {
        const total = filtered.reduce((acc, expense) => acc + Number(expense.amount), 0);
        setTotalSpent(total);
    };

    const handleBudgetChange = (e) => {
        const newBudget = e.target.value; // Keep the input as a string for now
        setBudget(newBudget); // Update state with string value
    
        // Calculate budget only if the input is not empty
        if (newBudget !== '') {
            const numericBudget = parseFloat(newBudget) || 0; // Convert input to number
            calculateBudget(filteredExpenses, numericBudget);
        } else {
            // Handle empty input
            calculateBudget(filteredExpenses, 0);
        }
    };
    
    const handleDelete = async (id) => {
        console.log('Attempting to delete expense with ID:', id);

        try {
            const response = await axios.delete(`http://localhost:5003/api/expenses/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Delete response:', response.data);

            if (response.status === 200) {
                const updatedExpenses = expenses.filter(expense => expense.id !== id);
                setExpenses(updatedExpenses);
                setFilteredExpenses(updatedExpenses);

                // Recalculate total spent and budget after deletion
                calculateTotalSpent(updatedExpenses);
                calculateBudget(updatedExpenses); 
                console.log('Expense deleted and state updated.');
            }
        } catch (error) {
            console.error('Error deleting expense:', error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-expense/${id}`); // Navigate to the edit page with the expense ID
    };

    const handleLogout = () => {
        setToken('');
        navigate('/login');
    };

    return (
        <div className="expense-list-container">
            <h2>Expense List</h2>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="year">Year: </label>
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                    <option value="">All</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <label htmlFor="month" style={{ marginLeft: '0px' }}>Month: </label>
                <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                    <option value="">All</option>
                    {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            <div id="budgetButton" style={{ marginBottom: '20px' }}>
                <label htmlFor="budget">Budget: </label>
                <input 
                    type="number" 
                    id="budget" 
                    value={budget} 
                    onChange={handleBudgetChange} 
                    placeholder="$"
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
                        <li key={expense.id} style={{ display: 'flex', alignItems: 'center' }}>
                            {expense.name}: ${expense.amount} on {new Date(expense.date).toLocaleDateString()}
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                <span 
                                    className="edit-icon" 
                                    onClick={() => handleEdit(expense.id)} 
                                    title="Edit"
                                    style={{ cursor: 'pointer', marginRight: '5px' }} // Add some space on the right
                                >
                                    +
                                </span>
                                <span 
                                    className="delete-icon" 
                                    onClick={() => handleDelete(expense.id)} 
                                    title="Delete"
                                    style={{ cursor: 'pointer' }} // Keep cursor as pointer for delete
                                >
                                    &times;
                                </span>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No expenses found.</li>
                )}
            </ul>

            <div className="total-spent">
                <h3>Total Spent: ${totalSpent.toFixed(2)}</h3>
            </div>

            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default ExpenseList;
