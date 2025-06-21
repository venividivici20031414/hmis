// src/components/Layout.jsx
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-6 bg-gray-100 min-h-screen overflow-auto">
      {children}
    </main>
  </div>
);

export default Layout;
