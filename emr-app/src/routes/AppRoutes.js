import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import Appointments from '../pages/Appointments';
// Import other pages as needed

function AppRoutes({ user }) {
  const role = user?.role?.toLowerCase();

  return (
    <Routes>
      {/* Common Route */}
      <Route path="/" element={<Dashboard />} />

      {/* Role-based access */}
      {(role === 'admin' || role === 'doctor' || role === 'nurse' || role === 'receptionist') && (
        <Route path="/patients" element={<Patients />} />
      )}

      {(role === 'admin' || role === 'doctor' || role === 'receptionist') && (
        <Route path="/appointments" element={<Appointments />} />
      )}

      {/* Add more route conditions for other modules here */}

      {/* Redirect all unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
