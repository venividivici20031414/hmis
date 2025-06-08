import React, { useEffect, useState } from 'react';

export default function PharmacyExpiryAlerts() {
  const [expiringDrugs, setExpiringDrugs] = useState([]);

  useEffect(() => {
    fetchExpiryAlerts();
  }, []);

  const fetchExpiryAlerts = async () => {
    try {
      // Call your backend API endpoint that fetches data from MongoDB
      const response = await fetch('/api/pharmacy/expiry-alerts');
      if (!response.ok) throw new Error('Failed to fetch expiry alerts');
      const data = await response.json();
      setExpiringDrugs(data);
    } catch (error) {
      console.error('Error fetching expiry alerts:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Expiry Alerts</h2>
      {expiringDrugs.length === 0 ? (
        <p>No drugs nearing expiry.</p>
      ) : (
        <ul>
          {expiringDrugs.map(drug => (
            <li key={drug._id}>
              {drug.drugName} expiring on {new Date(drug.expiryDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
