import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error message
    const [success, setSuccess] = useState(''); // State for success message

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        setSuccess(''); // Reset success message

        try {
            const response = await axios.post('http://localhost:5003/api/users/register', {
                username,
                password,
            });

            if (response.data.success) {
                setSuccess('Registration successful! You can now log in.');
                setUsername('');
                setPassword('');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            // Handle specific errors
            if (err.response && err.response.status === 409) { // User already exists
                setError('An account with this username already exists.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
            </form>
            <button onClick={onSwitchToLogin}>Already have an account? Log in</button>
        </div>
    );
};

export default Register;
