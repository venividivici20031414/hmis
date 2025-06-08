// src/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import { createUser, getUsers } from '../db';
import { v4 as uuidv4 } from 'uuid';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', role: '', password: '' });

  const roles = ['admin', 'doctor', 'nurse', 'lab technician', 'pharmacist', 'billing officer', 'receptionist'];

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await db.allDocs({ include_docs: true, startkey: 'user_', endkey: 'user_\ufff0' });
      setUsers(result.rows.map(row => row.doc));
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.role || !form.password) return alert('All fields are required');
    const newUser = {
      _id: `user_${uuidv4()}`,
      type: 'user',
      ...form
    };
    await db.put(newUser);
    setUsers([...users, newUser]);
    setForm({ username: '', role: '', password: '' });
  };

  const handleDelete = async (id, rev) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await db.remove(id, rev);
      setUsers(users.filter(user => user._id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="input" />
        <select name="role" value={form.role} onChange={handleChange} className="input">
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} className="input" />
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
                <button onClick={() => handleDelete(user._id, user._rev)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
