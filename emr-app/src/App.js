import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './modules/Login';
import Sidebar from './components/Sidebar';
import routeConfig from './routes/routeConfig';

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user from localStorage and token check
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(storedUser);
    } else {
      setUser(null);
      navigate('/login'); // redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogin = (userInfo) => {
    localStorage.setItem('user', JSON.stringify(userInfo));
   // localStorage.setItem('token', 'sample-token'); // or real token
    setUser(userInfo);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // ✅ Show Login page if not logged in
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex">
      {/* ✅ Sidebar with user role */}
      <Sidebar userRole={user?.role?.toLowerCase()} onLogout={handleLogout} />

      <div className="flex-1 pl-64 p-6 bg-gray-100 min-h-screen">
        <Routes>
          {routeConfig
            .filter(route => route.roles.includes(user.role?.toLowerCase()))
            .map(route => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}
