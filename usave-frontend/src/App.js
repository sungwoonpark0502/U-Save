import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import EditExpense from './components/EditExpense';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    const [token, setToken] = useState(''); // Token for authenticated user
    const [currentExpense, setCurrentExpense] = useState(null);
    const [refresh, setRefresh] = useState(false); // State to trigger refresh

    const handleEditExpense = (expense) => {
        setCurrentExpense(expense);
    };

    // Function to toggle refresh state
    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    return (
        <Router>
            <div>
                <h1>USave - Expense Tracker</h1>
                <Routes>
                    <Route
                        path="/login"
                        element={token ? <Navigate to="/expenses" /> : <Login setToken={setToken} />}
                    />
                    <Route
                        path="/register"
                        element={<Register onSwitchToLogin={() => {}} />} // Pass function for login switch
                    />
                    <Route
                        path="/add-expense"
                        element={token ? <AddExpense token={token} onAdd={handleRefresh} /> : <Navigate to="/login" />}
                    />
                    <Route 
                        path="/expenses" 
                        element={token ? <ExpenseList token={token} setToken={setToken} refresh={refresh} /> : <Navigate to="/login" />} 
                    />
                    <Route
                        path="/edit-expense"
                        element={
                            currentExpense ? (
                                <EditExpense
                                    token={token}
                                    expense={currentExpense}
                                    onEdit={() => {
                                        setCurrentExpense(null);
                                        handleRefresh(); // Refresh the list after editing
                                    }}
                                />
                            ) : (
                                <Navigate to="/expenses" />
                            )
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
