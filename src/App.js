// === src/App.jsx ===
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import routeConfig from './routes/routeConfig';

export default function App() {
  const [user, setUser] = useState({ username: 'test', role: 'admin' });
  const handleLogin = (userInfo) => {
  console.log("App → Logged-in user object:", userInfo);
  if (!userInfo?.role) {
    console.warn("No user role provided!");
  }
  setUser(userInfo);
};

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <div className="flex">
        <Sidebar userRole={user?.role} onLogout={handleLogout} />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Routes>
            {routeConfig
              .filter(route => route.roles.includes(user.role))
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
