import React, { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', role: '', password: '' });
  const [error, setError] = useState('');

  const roles = ['admin', 'doctor', 'nurse', 'lab technician', 'pharmacist', 'billing officer', 'receptionist'];

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to fetch users');
      }

      const data = await res.json();
      setUsers(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle user creation via backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.role || !form.password) {
      alert('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create user');
      }

      // Optionally: refetch user list after creation
      await fetchUsers();

      setForm({ username: '', role: '', password: '' });
      setError('');
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle user deletion via backend API
  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete user');
      }

      setUsers(users.filter(user => user._id !== userId));
      setError('');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="input"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="btn col-span-1 md:col-span-3">Add User</button>
      </form>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t">
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4 capitalize">{user.role}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
