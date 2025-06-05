// === src/routes/routeConfig.js ===
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import AppointmentsPage from '../pages/AppointmentsPage'; // <- Use this only
import Consulting from '../pages/Consulting';
import Lab from '../pages/Lab';
import Pharmacy from '../pages/Pharmacy';
import Billing from '../pages/Billing';
import Users from '../pages/Users';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import { FaPills, FaClipboardList, FaBoxOpen, FaExclamationTriangle, FaFileMedical } from 'react-icons/fa';
import PharmacyInventory from '../pages/pharmacy/PharmacyInventory';
import PharmacyStockTaking from '../pages/pharmacy/PharmacyStockTaking';
import PharmacyExpiryAlerts from '../pages/pharmacy/PharmacyExpiryAlerts';
import PharmacyReports from '../pages/pharmacy/PharmacyReports';
import PharmacyIssue from '../pages/pharmacy/PharmacyIssue'; // ✅ Correct



const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, roles: ['admin', 'doctor', 'nurse'] },
  { path: '/patients', name: 'Patient Registration', component: Patients, roles: ['admin', 'nurse'] },
  { path: '/appointments', name: 'Appointments', component: AppointmentsPage, roles: ['admin', 'receptionist', 'doctor'] }, // Fixed here
  { path: '/consulting', name: 'Consulting', component: Consulting, roles: ['admin', 'doctor'] },
  { path: '/lab', name: 'Lab', component: Lab, roles: ['admin', 'lab technician'] },
 {
  path: '/pharmacy/inventory',
  name: 'Pharmacy Inventory',
  component: PharmacyInventory,
  roles: ['admin', 'pharmacist'],
},


{
  path: '/pharmacy/issue',
  name: 'Pharmacy Issue',
  component: PharmacyIssue,
  roles: ['admin', 'pharmacist'],
},
{
  path: '/pharmacy/stock-taking',
  name: 'Pharmacy Stock Taking',
  component: PharmacyStockTaking,
  roles: ['admin', 'pharmacist'],
},
{
  path: '/pharmacy/expiry-alerts',
  name: 'Pharmacy Expiry Alerts',
  component: PharmacyExpiryAlerts,
  roles: ['admin', 'pharmacist'],
},
{
  path: '/pharmacy/reports',
  name: 'Pharmacy Reports',
  component: PharmacyReports,
  roles: ['admin', 'pharmacist'],
},

  { path: '/billing', name: 'Billing/Claims', component: Billing, roles: ['admin', 'billing officer'] },
  { path: '/users', name: 'User Management', component: Users, roles: ['admin'] },
  { path: '/reports', name: 'Reports', component: Reports, roles: ['admin'] },
  { path: '/settings', name: 'Settings', component: Settings, roles: ['admin'] },

  
];

export default routes;
