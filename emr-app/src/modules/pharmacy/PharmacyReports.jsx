import { useEffect, useState } from 'react';
import PouchDB from 'pouchdb';

const issueDB = new PouchDB('pharmacy_issues');
const stockDB = new PouchDB('pharmacy_stock');

export default function PharmacyReports() {
  const [issueReports, setIssueReports] = useState([]);
  const [stockReports, setStockReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const issues = await issueDB.allDocs({ include_docs: true });
    const stock = await stockDB.allDocs({ include_docs: true });

    setIssueReports(issues.rows.map(row => row.doc));
    setStockReports(stock.rows.map(row => row.doc));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pharmacy Reports</h2>

      <section>
        <h3 className="font-semibold mb-2">Issued Drugs</h3>
        <ul className="list-disc list-inside space-y-1">
          {issueReports.length === 0 ? (
            <li className="text-gray-500">No issued drugs recorded.</li>
          ) : (
            issueReports.map(entry => (
              <li key={entry._id}>
                {entry.date} - {entry.drugName} - {entry.quantity} units to {entry.patientName}
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="font-semibold mb-2">Stock Records</h3>
        <ul className="list-disc list-inside space-y-1">
          {stockReports.length === 0 ? (
            <li className="text-gray-500">No stock records available.</li>
          ) : (
            stockReports.map(entry => (
              <li key={entry._id}>
                {entry.date} - {entry.drugName} - {entry.quantity} units
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
