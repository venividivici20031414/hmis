// === src/App.js ===
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import routeConfig from './routes/routeConfig';

export default function App() {
  const [user, setUser] = useState({ username: 'test', role: 'admin' }); // Simulated logged-in user

  const handleLogin = (userInfo) => {
  const normalizedUser = {
    ...userInfo,
    role: userInfo.role.toLowerCase(),
  };
  localStorage.setItem('user', JSON.stringify(normalizedUser));
  localStorage.setItem('token', 'sample-token');
  setUser(normalizedUser);
  navigate('/dashboard');
};
  const handleLogout = () => {
    setUser(null);
  };

  // Show login if no user is logged in
  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <div className="flex">
        {/* Sticky Sidebar */}
        <Sidebar userRole={user?.role} onLogout={handleLogout} />

        {/* Main Content Area with left padding for Sidebar */}
        <div className="flex-1 pl-64 p-6 bg-gray-100 min-h-screen">
          <Routes>
  {routeConfig
    .filter(route => route.roles.includes(user?.role?.toLowerCase()))
    .map(route => (
      <Route key={route.path} path={route.path} element={<route.component />} />
    ))}
  <Route path="*" element={<Navigate to="/dashboard" />} />
</Routes>

        </div>
      </div>
    </Router>
  );
}
