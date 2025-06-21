// === src/routes/routeConfig.js ===
import Dashboard from '../modules/dashboard/index.jsx';
import PatientsPage from '../modules/patient/index.jsx';
import AppointmentsPage from '../modules/appointments/index.jsx';
import Consulting from '../modules/consulting/index.jsx'; // Assuming you’ll create this
import Lab from '../modules/laboratory/index.jsx';
import Billing from '../modules/billing/index.jsx';
import Users from '../modules/users/index.jsx';
import Reports from '../modules/reports/index.jsx';
import Settings from '../modules/settings/index.jsx';

// Pharmacy Submodules
import PharmacyInventory from '../modules/pharmacy/index.jsx'; // assume index handles all
import PharmacyIssue from '../modules/pharmacy/PharmacyIssue.jsx';
import PharmacyStockTaking from '../modules/pharmacy/PharmacyStock.jsx';
import PharmacyExpiryAlerts from '../modules/pharmacy/PharmacyStock.jsx'; // Same file can handle both or split later
import PharmacyReports from '../modules/pharmacy/index.jsx'; // if index handles reports too


const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, roles: ['admin', 'doctor', 'nurse'] },
  { path: '/patients', name: 'Patient Registration', component: PatientsPage, roles: ['admin', 'nurse'] },
  { path: '/appointments', name: 'Appointments', component: AppointmentsPage, roles: ['admin', 'receptionist', 'doctor'] },
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
