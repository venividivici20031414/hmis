// === src/components/Sidebar.jsx ===
import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../routes/routeConfig';
import { FiLogOut } from 'react-icons/fi';

export default function Sidebar({ userRole, onLogout }) {
  const normalizedRole = userRole?.toLowerCase();
  console.log("Sidebar → userRole:", userRole, "| normalized:", normalizedRole);

  const visibleRoutes = routes.filter(route =>
    route.roles.some(role => role.toLowerCase() === normalizedRole)
  );

  console.log("Sidebar → visibleRoutes:", visibleRoutes);

  if (!userRole) return <div className="w-64 bg-gray-800 h-screen text-white p-6">Loading...</div>;

  return (
    <div className="w-64 bg-gray-800 h-screen text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">EMR System</div>
      <nav className="flex-1 p-4 space-y-1">
        {visibleRoutes.map(r => (
          <NavLink
            key={r.path}
            to={r.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
            }
          >
            {r.name}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={onLogout}
        className="m-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        <FiLogOut /> Logout
      </button>
    </div>
  );
}
