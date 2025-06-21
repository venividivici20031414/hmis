import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const { token, user } = response.data;

      // Save token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Login successful:', user);

      onLogin(user); // Notify parent component

      navigate('/dashboard'); // Redirect to dashboard after login

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setPassword(''); // Clear password for security
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
