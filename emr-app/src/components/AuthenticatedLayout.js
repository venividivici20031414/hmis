// src/components/AuthenticatedLayout.js
import React from 'react';
import Sidebar from './Sidebar';

const AuthenticatedLayout = ({ user, setUser, children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar user={user} setUser={setUser} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;
