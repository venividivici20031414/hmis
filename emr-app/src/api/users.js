// src/api/users.js

const getToken = () => localStorage.getItem('token');

export const getUsers = async () => {
  const response = await fetch('http://localhost:5000/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch users');
  }

  return await response.json();
};

export const createUser = async (userData) => {
  const response = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }

  return await response.json();
};
