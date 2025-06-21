import React, { useState, useEffect } from 'react';
import { getUsers, createUser } from '../api/users'; // Import your API functions

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'Nurse' });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend API
  const fetchUsers = async () => {
    try {
      const usersFromAPI = await getUsers();
      setUsers(usersFromAPI);
    } catch (err) {
      console.error('Failed to fetch users', err);
      alert('Error fetching users');
    }
  };

  // Add user via backend API
  const handleAddUser = async () => {
    const username = newUser.username.trim();
    const password = newUser.password.trim();

    // Check for required fields
    if (!username || !password) {
      alert('Username and password cannot be empty');
      return;
    }

    try {
      // Send the new user data with the selected role
      await createUser(newUser);

      // Reset the form fields
      setNewUser({ username: '', password: '', role: 'Nurse' });

      // Fetch the updated user list
      fetchUsers();
    } catch (err) {
      alert('Failed to create user: ' + err.message);
    }
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
        <option value="Nurse">Nurse</option>
        <option value="Doctor">Doctor</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>

      <h3>All Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
