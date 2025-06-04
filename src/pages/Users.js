import React from 'react';
import { FaUserPlus } from 'react-icons/fa';

const Users = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">User Management</h2>
      <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded">
        <FaUserPlus /> Add User
      </button>
    </div>

    {/* Placeholder list */}
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500">
        List of users (admin, doctors, nurses) will appear here.
      </p>
    </div>
  </div>
);

export default Users;
