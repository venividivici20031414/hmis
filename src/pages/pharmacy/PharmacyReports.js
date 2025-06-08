import React, { useEffect, useState } from 'react';

export default function PharmacyReports() {
  const [issueReports, setIssueReports] = useState([]);
  const [stockReports, setStockReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const issuesRes = await fetch('/api/pharmacy-reports/issues');
      const issuesData = await issuesRes.json();

      const stockRes = await fetch('/api/pharmacy-reports/stock');
      const stockData = await stockRes.json();

      setIssueReports(issuesData);
      setStockReports(stockData);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pharmacy Reports</h2>

      <section>
        <h3 className="font-semibold">Issued Drugs</h3>
        <ul>
          {issueReports.map(entry => (
            <li key={entry._id}>
              {new Date(entry.date).toLocaleDateString()} - {entry.drugName} - {entry.quantity} units to {entry.patientName}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="font-semibold">Stock Records</h3>
        <ul>
          {stockReports.map(entry => (
            <li key={entry._id}>
              {new Date(entry.date).toLocaleDateString()} - {entry.drugName} - {entry.quantity} units
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
