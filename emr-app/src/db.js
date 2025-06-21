// src/api/db.js

// Base URL of your backend API
const API_BASE = '/api';

// You can export various API functions to call backend endpoints

export const getUsers = async () => {
  const response = await fetch(`${API_BASE}/users`, {
    headers: {
      // Add auth token here if you use one, e.g.:
      // Authorization: `Bearer ${localStorage.getItem('token')}`
    },
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

// Add more API calls as needed (e.g. login, updateUser, deleteUser, etc.)
