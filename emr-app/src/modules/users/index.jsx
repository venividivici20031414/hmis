import React, { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', role: '', password: '' });
  const [error, setError] = useState('');

 const roles = [
  'admin',
  'doctor',
  'nurse',
  'lab technician',
  'pharmacist',
  'billing officer',
  'receptionist',
  'radiologist',          // ✅ New
  'nhia officer'          // ✅ New
];


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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

      await fetchUsers();
      setForm({ username: '', role: '', password: '' });
      setError('');
    } catch (err) {
      alert(err.message);
    }
  };

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
    
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
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
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add User
        </button>
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
          {users.length === 0 && (
            <tr>
              <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
