import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserPlus,
  FaCalendarCheck,
  FaStethoscope,
  FaFlask,
  FaFileMedical,
  FaUserCog,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaPills,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

const Sidebar = ({ userRole, onLogout }) => {
  const [showPharmacySubmenu, setShowPharmacySubmenu] = useState(false);

  const hasAccess = (allowedRoles) => allowedRoles.includes(userRole);

  return (
    <div className="w-64 bg-white shadow-md h-screen sticky top-0">
      <div className="p-4 text-xl font-bold border-b">EMR System</div>
      <nav className="flex flex-col p-4 space-y-2">
        {hasAccess(['admin', 'doctor', 'nurse']) && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        )}
        {hasAccess(['admin', 'nurse']) && (
          <NavLink
            to="/patients"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FaUserPlus />
            <span>Registration</span>
          </NavLink>
        )}
        {hasAccess(['admin', 'receptionist']) && (
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FaCalendarCheck />
            <span>Appointments</span>
          </NavLink>
        )}
        {hasAccess(['admin', 'doctor']) && (
          <NavLink
            to="/consulting"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FaStethoscope />
            <span>Consulting</span>
          </NavLink>
        )}
        {hasAccess(['admin', 'lab technician']) && (
          <NavLink
            to="/lab"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FaFlask />
            <span>Lab</span>
          </NavLink>
        )}

        {/* Pharmacy Main & Submenu */}
        {hasAccess(['admin', 'pharmacist']) && (
          <div>
            <button
              onClick={() => setShowPharmacySubmenu(!showPharmacySubmenu)}
              className="flex items-center w-full space-x-2 p-2 rounded hover:bg-gray-100"
            >
              <FaPills />
              <span className="flex-1 text-left">Pharmacy</span>
              {showPharmacySubmenu ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {showPharmacySubmenu && (
              <div className="ml-6 mt-1 space-y-1">
                <NavLink
                  to="/pharmacy/issue"
                  className={({ isActive }) =>
                    `block p-2 rounded hover:bg-gray-100 ${
                      isActive ? 'bg-gray-200 font-semibold' : ''
                    }`
                  }
                >
                  Drug Issuing
                </NavLink>
                <NavLink
                  to="/pharmacy/stock-taking"
                  className={({ isActive }) =>
                    `block p-2 rounded hover:bg-gray-100 ${
                      isActive ? 'bg-gray-200 font-semibold' : ''
                    }`
                  }
                >
                  Stock Taking
                </NavLink>
                <NavLink
                  to="/pharmacy/expiry-alerts"
                  className={({ isActive }) =>
                    `block p-2 rounded hover:bg-gray-100 ${
                      isActive ? 'bg-gray-200 font-semibold' : ''
                    }`
                  }
                >
                  Expiry Alerts
                </NavLink>
                <NavLink
                  to="/pharmacy/reports"
                  className={({ isActive }) =>
                    `block p-2 rounded hover:bg-gray-100 ${
                      isActive ? 'bg-gray-200 font-semibold' : ''
                    }`
                  }
                >
                  Pharmacy Reports
                </NavLink>
              </div>
            )}
          </div>
        )}

        {hasAccess(['admin', 'billing officer']) && (
          <NavLink
            to="/billing"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FaFileMedical />
            <span>Billing</span>
          </NavLink>
        )}
        {hasAccess(['admin']) && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FaUserCog />
            <span>Users</span>
          </NavLink>
        )}
        {hasAccess(['admin']) && (
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FaChartBar />
            <span>Reports</span>
          </NavLink>
        )}
        {hasAccess(['admin']) && (
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
        )}
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 p-2 rounded hover:bg-red-100 text-red-600"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
