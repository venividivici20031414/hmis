import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserPlus,
  FaCalendarAlt,
  FaStethoscope,
  FaFlask,
  FaPills,
  FaMoneyBillWave,
  FaUsers,
  FaChartBar,
  FaCog,
  FaClipboardList,
  FaBoxOpen,
  FaExclamationTriangle,
  FaFileMedical
} from 'react-icons/fa';

export default function Sidebar({ userRole, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="w-64 bg-white shadow-md h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 text-xl font-bold text-blue-700">EMR System</div>
      <nav className="px-2">
        <ul>
          {(userRole === 'admin' || userRole === 'doctor' || userRole === 'nurse') && (
            <li className={`py-2 px-4 rounded ${isActive('/dashboard') ? 'bg-blue-100' : ''}`}>
              <Link to="/dashboard" className="flex items-center gap-2">
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
          )}
          {(userRole === 'admin' || userRole === 'nurse') && (
            <li className={`py-2 px-4 rounded ${isActive('/patients') ? 'bg-blue-100' : ''}`}>
              <Link to="/patients" className="flex items-center gap-2">
                <FaUserPlus /> Patient Registration
              </Link>
            </li>
          )}
          {(userRole === 'admin' || userRole === 'receptionist') && (
            <li className={`py-2 px-4 rounded ${isActive('/appointments') ? 'bg-blue-100' : ''}`}>
              <Link to="/appointments" className="flex items-center gap-2">
                <FaCalendarAlt /> Appointments
              </Link>
            </li>
          )}
          {(userRole === 'admin' || userRole === 'doctor') && (
            <li className={`py-2 px-4 rounded ${isActive('/consulting') ? 'bg-blue-100' : ''}`}>
              <Link to="/consulting" className="flex items-center gap-2">
                <FaStethoscope /> Consulting
              </Link>
            </li>
          )}
          {(userRole === 'admin' || userRole === 'lab technician') && (
            <li className={`py-2 px-4 rounded ${isActive('/lab') ? 'bg-blue-100' : ''}`}>
              <Link to="/lab" className="flex items-center gap-2">
                <FaFlask /> Lab
              </Link>
            </li>
          )}
          {(userRole === 'admin' || userRole === 'pharmacist') && (
            <li className={`py-2 px-4 rounded ${isActive('/pharmacy') ? 'bg-blue-100' : ''}`}>
              <Link to="/pharmacy" className="flex items-center gap-2">
                <FaPills /> Pharmacy
              </Link>
            </li>
          )}
          {(userRole === 'admin' || userRole === 'billing officer') && (
            <li className={`py-2 px-4 rounded ${isActive('/billing') ? 'bg-blue-100' : ''}`}>
              <Link to="/billing" className="flex items-center gap-2">
                <FaMoneyBillWave /> Billing/Claims
              </Link>
            </li>
          )}
          {userRole === 'admin' && (
            <>
              <li className={`py-2 px-4 rounded ${isActive('/users') ? 'bg-blue-100' : ''}`}>
                <Link to="/users" className="flex items-center gap-2">
                  <FaUsers /> User Management
                </Link>
              </li>
              <li className={`py-2 px-4 rounded ${isActive('/reports') ? 'bg-blue-100' : ''}`}>
                <Link to="/reports" className="flex items-center gap-2">
                  <FaChartBar /> Reports
                </Link>
              </li>
              <li className={`py-2 px-4 rounded ${isActive('/settings') ? 'bg-blue-100' : ''}`}>
                <Link to="/settings" className="flex items-center gap-2">
                  <FaCog /> Settings
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* 📦 Advanced Pharmacy Submodules */}
        {(userRole === 'admin' || userRole === 'pharmacist') && (
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase px-4 mb-2">Pharmacy</h3>
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200 rounded">
                <Link to="/pharmacy/inventory" className="flex items-center gap-2">
                  <FaPills /> Inventory
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 rounded">
                <Link to="/pharmacy/issue" className="flex items-center gap-2">
                  <FaClipboardList /> Drug Issuing
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 rounded">
                <Link to="/pharmacy/stock-taking" className="flex items-center gap-2">
                  <FaBoxOpen /> Stock Taking
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 rounded">
                <Link to="/pharmacy/expiry-alerts" className="flex items-center gap-2">
                  <FaExclamationTriangle /> Expiry Alerts
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 rounded">
                <Link to="/pharmacy/reports" className="flex items-center gap-2">
                  <FaFileMedical /> Pharmacy Reports
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
