import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; // Assuming Login component exists
import Sidebar from './components/Sidebar';
import routeConfig from './routes/routeConfig'; // Assuming routeConfig contains your route definitions
import DashboardPage from './pages/DashboardPage'; // Dashboard page component
import AppointmentsPage from './pages/AppointmentsPage'; // Appointments page component
import PatientsPage from './pages/PatientsPage'; // Patient registration page

export default function App() {
  const [user, setUser] = useState({ username: 'test', role: 'admin' }); // Initial user state

  // Handle login (set user info upon successful login)
  const handleLogin = (userInfo) => {
    console.log("App → Logged-in user object:", userInfo);
    if (!userInfo?.role) {
      console.warn("No user role provided!");
    }
    setUser(userInfo);
  };

  // Handle logout (clear user state)
  const handleLogout = () => {
    setUser(null);
  };

  // If user is not logged in, show Login page
  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <div className="flex">
        {/* Sidebar component with user role and logout functionality */}
        <Sidebar userRole={user?.role} onLogout={handleLogout} />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Routes>
            {/* Filter and render routes based on user roles */}
            {routeConfig
              .filter(route => route.roles.includes(user.role)) // Filter based on user role
              .map(route => (
                <Route key={route.path} path={route.path} element={<route.component />} />
              ))}
            {/* Default route redirection to Dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
