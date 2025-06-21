import React, { useEffect, useState } from 'react';

export default function PharmacyExpiryAlerts() {
  const [expiringDrugs, setExpiringDrugs] = useState([]);

  useEffect(() => {
    checkExpiries();
  }, []);

  const checkExpiries = async () => {
    try {
      const token = localStorage.getItem('token');  // or wherever you store JWT token
      const res = await fetch('/api/pharmacy-expiry', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch medicines');
      const data = await res.json();

      const today = new Date();
      const threshold = new Date();
      threshold.setDate(today.getDate() + 30); // Check for medicines expiring in 30 days

      const alerts = data.filter(med => {
        const expiry = new Date(med.expiryDate);
        return expiry <= threshold;
      });

      setExpiringDrugs(alerts);
    } catch (err) {
      console.error(err);
      alert('Error checking expiry alerts');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Expiry Alerts</h2>
      {expiringDrugs.length === 0 ? (
        <p>No drugs nearing expiry.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-1">
          {expiringDrugs.map(drug => (
            <li key={drug._id}>
              <strong>{drug.drugName}</strong> expiring on{' '}
              <span className="text-red-600 font-semibold">
                {new Date(drug.expiryDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
