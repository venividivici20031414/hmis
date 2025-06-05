import React, { useState, useEffect } from 'react';
import PouchDB from 'pouchdb';

const db = new PouchDB('pharmacy_issues');

export default function PharmacyIssue() {
  const [issueData, setIssueData] = useState({ patientName: '', drugName: '', quantity: '', issuedBy: '', date: '' });
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const result = await db.allDocs({ include_docs: true });
    setIssues(result.rows.map(row => row.doc));
  };

  const handleChange = e => {
    setIssueData({ ...issueData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newIssue = { ...issueData, _id: new Date().toISOString() };
    await db.put(newIssue);
    setIssueData({ patientName: '', drugName: '', quantity: '', issuedBy: '', date: '' });
    fetchIssues();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Drug Issuing to Clients</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="patientName" value={issueData.patientName} onChange={handleChange} placeholder="Patient Name" className="input" />
        <input name="drugName" value={issueData.drugName} onChange={handleChange} placeholder="Drug Name" className="input" />
        <input name="quantity" value={issueData.quantity} onChange={handleChange} placeholder="Quantity" className="input" />
        <input name="issuedBy" value={issueData.issuedBy} onChange={handleChange} placeholder="Issued By" className="input" />
        <input type="date" name="date" value={issueData.date} onChange={handleChange} className="input" />
        <button type="submit" className="btn">Issue</button>
      </form>
      <ul className="mt-4">
        {issues.map(issue => (
          <li key={issue._id}>{issue.date} - {issue.drugName} issued to {issue.patientName}</li>
        ))}
      </ul>
    </div>
  );
}
