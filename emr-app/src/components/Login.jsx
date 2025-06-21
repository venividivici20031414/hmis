import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import userDB from '../db/users';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const doc = await userDB.get(username);
      if (doc.password === password) {
  onLogin({ username: doc.username, role: doc.role });
  navigate('/dashboard');
} else {
        setErr('Incorrect password');
      }
    } catch {
      setErr('User not found');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-80 p-6 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          EMR Login
        </h2>

        {err && (
          <p className="mb-4 text-sm text-red-600 text-center">{err}</p>
        )}

        <div className="relative mb-4">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
