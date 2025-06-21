import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
