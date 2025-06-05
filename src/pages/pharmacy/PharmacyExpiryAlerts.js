import React, { useEffect, useState } from 'react';
import PouchDB from 'pouchdb';

const db = new PouchDB('pharmacy_inventory');

export default function PharmacyExpiryAlerts() {
  const [expiringDrugs, setExpiringDrugs] = useState([]);

  useEffect(() => {
    checkExpiries();
  }, []);

  const checkExpiries = async () => {
    const result = await db.allDocs({ include_docs: true });
    const today = new Date();
    const threshold = new Date();
    threshold.setDate(today.getDate() + 30); // 30 days ahead

    const alerts = result.rows
      .map(row => row.doc)
      .filter(doc => new Date(doc.expiryDate) <= threshold);

    setExpiringDrugs(alerts);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Expiry Alerts</h2>
      {expiringDrugs.length === 0 ? (
        <p>No drugs nearing expiry.</p>
      ) : (
        <ul>
          {expiringDrugs.map(drug => (
            <li key={drug._id}>{drug.drugName} expiring on {drug.expiryDate}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
