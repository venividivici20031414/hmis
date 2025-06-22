// === src/layout/SidebarLayout.jsx ===
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import routes from '../routes/routeConfig';
import { FiLogOut } from 'react-icons/fi';

export default function SidebarLayout({ userRole, onLogout }) {
  const normalizedRole = userRole?.toLowerCase().trim();

  // Filter only routes visible to the current user role
  const visibleRoutes = routes.filter(route =>
    route.roles.some(role => role.toLowerCase().trim() === normalizedRole)
  );

  if (!userRole) {
    return (
      <div className="w-64 bg-gray-800 h-screen text-white p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          HMIS
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {visibleRoutes.length === 0 ? (
            <div className="text-sm text-gray-400">
              No modules available for your role.
            </div>
          ) : (
            visibleRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded hover:bg-gray-700 transition ${
                    isActive ? 'bg-gray-700 font-semibold' : ''
                  }`
                }
              >
                {route.icon && (
                  <span className="mr-2 text-lg">{route.icon}</span>
                )}
                {route.name}
              </NavLink>
            ))
          )}
        </nav>

        <button
          onClick={onLogout}
          className="m-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
