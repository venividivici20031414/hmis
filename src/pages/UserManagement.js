import React, { useState, useEffect } from 'react';
import userDB from '../db/users';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'nurse' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const result = await userDB.allDocs({ include_docs: true });
    const filtered = result.rows.map(row => row.doc);
    setUsers(filtered);
  };

  const handleAddUser = async () => {
    try {
      await userDB.put({
        _id: newUser.username,
        ...newUser,
      });
      setNewUser({ username: '', password: '', role: 'nurse' });
      fetchUsers();
    } catch (err) {
      alert('User already exists or error occurred');
    }
  };

  const handleDelete = async (id) => {
    const doc = await userDB.get(id);
    await userDB.remove(doc);
    fetchUsers();
  };

  return (
    <div>
      <h2>User Management</h2>

      <h3>Add New User</h3>
      <input
        placeholder="Username"
        value={newUser.username}
        onChange={e => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={newUser.password}
        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="nurse">Nurse</option>
        <option value="doctor">Doctor</option>
        <option value="receptionist">Receptionist</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>

      <h3>All Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} ({user.role}){' '}
            {user.username !== 'admin' && (
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
