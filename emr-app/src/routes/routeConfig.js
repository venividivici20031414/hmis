import {
  FiHome,
  FiUser,
  FiCalendar,
  FiActivity,
  FiClipboard,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiAlertCircle,
  FiPackage,
  FiDroplet,
  FiImage, 
  FiCloud// ✅ Add this line
} from 'react-icons/fi';


import Dashboard from '../modules/dashboard/index.jsx';
import PatientsPage from '../modules/patient/index.jsx';
import AppointmentsPage from '../modules/appointments/index.jsx';
import Consulting from '../modules/consulting/index.jsx';
import Lab from '../modules/laboratory/index.jsx';
import Billing from '../modules/billing/index.jsx';
import Users from '../modules/users/index.jsx';
import Reports from '../modules/reports/index.jsx';
import Settings from '../modules/settings/index.jsx';
import Radiology from '../modules/radiology/index.jsx';
import NHIAIntegration from '../modules/nhia-integration/index.jsx';

// Pharmacy Submodules (assumes each has its own component)
import PharmacyInventory from '../modules/pharmacy/index.jsx';
import PharmacyIssue from '../modules/pharmacy/PharmacyIssue.jsx';
import PharmacyStockTaking from '../modules/pharmacy/PharmacyStock.jsx';
import PharmacyExpiryAlerts from '../modules/pharmacy/PharmacyExpiryAlerts.jsx';
import PharmacyReports from '../modules/pharmacy/PharmacyReports.jsx';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    roles: ['admin', 'doctor', 'nurse'],
    icon: <FiHome />,
  },
  {
    path: '/patients',
    name: 'Patient Registration',
    component: PatientsPage,
    roles: ['admin', 'nurse', 'receptionist'],
    icon: <FiUser />,
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: AppointmentsPage,
    roles: ['admin', 'receptionist', 'doctor'],
    icon: <FiCalendar />,
  },
  {
  path: '/consulting',
  name: 'Consulting',
  component: Consulting,
  roles: ['admin', 'doctor'],
  icon: <FiActivity />, // replaces unavailable FiStethoscope
},
{
  path: '/lab',
  name: 'Lab',
  component: Lab,
  roles: ['admin', 'lab technician'],
  icon: <FiDroplet />, // replaces unavailable FiFlask
},

  {
    path: '/pharmacy/inventory',
    name: 'Pharmacy Inventory',
    component: PharmacyInventory,
    roles: ['admin', 'pharmacist'],
    icon: <FiPackage />,
  },
  {
    path: '/pharmacy/issue',
    name: 'Pharmacy Issue',
    component: PharmacyIssue,
    roles: ['admin', 'pharmacist'],
    icon: <FiPackage />,
  },
  {
    path: '/pharmacy/stock-taking',
    name: 'Pharmacy Stock Taking',
    component: PharmacyStockTaking,
    roles: ['admin', 'pharmacist'],
    icon: <FiPackage />,
  },
  {
    path: '/pharmacy/expiry-alerts',
    name: 'Pharmacy Expiry Alerts',
    component: PharmacyExpiryAlerts,
    roles: ['admin', 'pharmacist'],
    icon: <FiAlertCircle />,
  },
  {
    path: '/pharmacy/reports',
    name: 'Pharmacy Reports',
    component: PharmacyReports,
    roles: ['admin', 'pharmacist'],
    icon: <FiClipboard />,
  },
  {
    path: '/billing',
    name: 'Billing & Claims',
    component: Billing,
    roles: ['admin', 'billing officer'],
    icon: <FiClipboard />,
  },
  {
    path: '/users',
    name: 'User Management',
    component: Users,
    roles: ['admin'],
    icon: <FiUsers />,
  },



 {
  path: '/radiology',
  name: 'Radiology',
  component: Radiology,
  roles: ['admin', 'radiologist'],
  icon: <FiImage />
},
{
  path: '/nhia-integration',
  name: 'NHIA Integration',
  component: NHIAIntegration,
  roles: ['admin', 'nhia officer'],
  icon: <FiCloud />
},
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    roles: ['admin'],
    icon: <FiBarChart2 />,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    roles: ['admin'],
    icon: <FiSettings />,
  },
];

export default routes;
