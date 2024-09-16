// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Register from './Register';
import './Login.css'; // Import CSS for specific styling

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5003/api/users/login', {
                username,
                password,
            });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/expenses');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="container">
            {isRegistering ? (
                <Register onSwitchToLogin={() => setIsRegistering(false)} />
            ) : (
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                    <p>
                        Don't have an account?{' '}
                        <button type="button" onClick={() => setIsRegistering(true)} style={{ background: 'none', border: 'none', color: '#007aff', cursor: 'pointer' }}>
                            Register here
                        </button>
                    </p>
                </form>
            )}
        </div>
    );
};

export default Login;
