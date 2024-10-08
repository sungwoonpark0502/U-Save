import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import CSS for specific styling

const Register = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5003/api/users/register', {
                username,
                password,
            });

            if (response.status === 201) {
                setSuccess('Registration successful! You can now log in.');
                setUsername('');
                setPassword('');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Registration failed. Please try again.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="container"> {/* Apply the common container class */}
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
            <button 
                onClick={onSwitchToLogin} 
                style={{ marginTop: '15px', background: 'none', border: 'none', color: '#007aff', cursor: 'pointer' }}
            >
                Already have an account? Log in
            </button>
        </div>
    );
};

export default Register;
