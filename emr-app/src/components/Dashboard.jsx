import React from 'react';

const Dashboard = ({ user }) => (
  <div className="space-y-4">
    <h2 className="text-3xl font-bold">Welcome, {user.username}</h2>
    <p className="text-gray-600">
      You are logged in as <strong>{user.role}</strong>.
    </p>
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500">
        This is a placeholder dashboard. Add stats, recent patients, etc.
      </p>
    </div>
  </div>
);

export default Dashboard;
