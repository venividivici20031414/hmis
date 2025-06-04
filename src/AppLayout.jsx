import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

const AppLayout = ({ userRole }) => {
  return (
    <div className="flex">
      <Sidebar userRole={userRole} />
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
