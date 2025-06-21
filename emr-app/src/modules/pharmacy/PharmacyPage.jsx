import React, { useState } from 'react';
import Inventory from './Pharmacy/Inventory';
import ReceiveDrugs from './Pharmacy/ReceiveDrugs';
import IssueDrugs from './Pharmacy/IssueDrugs';
import ExpiryAlerts from './Pharmacy/ExpiryAlerts';
import Reports from './Pharmacy/Reports';

const PharmacyPage = () => {
  const [tab, setTab] = useState('inventory');

  const renderTab = () => {
    switch (tab) {
      case 'inventory': return <Inventory />;
      case 'receive': return <ReceiveDrugs />;
      case 'issue': return <IssueDrugs />;
      case 'expiry': return <ExpiryAlerts />;
      case 'reports': return <Reports />;
      default: return <Inventory />;
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        {['inventory', 'receive', 'issue', 'expiry', 'reports'].map(t => (
          <button
            key={t}
            className={`px-4 py-2 rounded ${tab === t ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow">{renderTab()}</div>
    </div>
  );
};

export default PharmacyPage;
