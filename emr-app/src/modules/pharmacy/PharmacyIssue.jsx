import { useState, useEffect } from 'react';

export default function PharmacyIssue() {
  const [issueData, setIssueData] = useState({
    patientName: '',
    drugName: '',
    quantity: '',
    issuedBy: '',
    date: '',
  });

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await fetch('/api/pharmacy-issues');
      if (!res.ok) throw new Error('Failed to fetch issues');
      const data = await res.json();
      setIssues(data);
    } catch (error) {
      console.error(error);
      alert('Error loading issues');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIssue = {
      ...issueData,
      quantity: parseInt(issueData.quantity),
    };

    try {
      const res = await fetch('/api/pharmacy-issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIssue),
      });

      if (!res.ok) throw new Error('Failed to save issue');
      setIssueData({ patientName: '', drugName: '', quantity: '', issuedBy: '', date: '' });
      fetchIssues();
    } catch (error) {
      console.error(error);
      alert('Error issuing drug');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Drug Issuing to Clients</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input
          name="patientName"
          value={issueData.patientName}
          onChange={handleChange}
          placeholder="Patient Name"
          className="p-2 border rounded"
        />
        <input
          name="drugName"
          value={issueData.drugName}
          onChange={handleChange}
          placeholder="Drug Name"
          className="p-2 border rounded"
        />
        <input
          name="quantity"
          type="number"
          value={issueData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="p-2 border rounded"
        />
        <input
          name="issuedBy"
          value={issueData.issuedBy}
          onChange={handleChange}
          placeholder="Issued By"
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={issueData.date}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-5 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Issue
        </button>
      </form>

      <ul className="space-y-2">
        {issues.length === 0 ? (
          <li className="text-gray-500">No drug issues recorded.</li>
        ) : (
          issues.map((issue) => (
            <li key={issue._id} className="border p-2 rounded shadow-sm">
              {issue.date} – {issue.drugName} ({issue.quantity}) issued to {issue.patientName} by {issue.issuedBy}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
