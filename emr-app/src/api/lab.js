import React, { useState, useEffect } from 'react';

export default function Lab() {
  const [tests, setTests] = useState([]);
  const [form, setForm] = useState({
    patientName: '',
    testType: '',
    status: 'pending',
    result: '',
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await fetch('/api/lab');
      if (!res.ok) throw new Error('Failed to fetch lab tests');
      const data = await res.json();
      setTests(data);
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTest = { ...form };
    try {
      const res = await fetch('/api/lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTest),
      });
      if (!res.ok) throw new Error('Failed to order test');
      setForm({ patientName: '', testType: '', status: 'pending', result: '' });
      fetchTests();
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  const updateStatus = async (test, newStatus) => {
    try {
      const updatedTest = { ...test, status: newStatus };
      const res = await fetch(`/api/lab/${test._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTest),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchTests();
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  const saveResult = async (test, result) => {
    try {
      const updatedTest = { ...test, result, status: 'completed' };
      const res = await fetch(`/api/lab/${test._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTest),
      });
      if (!res.ok) throw new Error('Failed to save result');
      fetchTests();
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Lab Module</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="testType"
          placeholder="Test Type (e.g., Malaria, CBC)"
          value={form.testType}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">Order Test</button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Lab Tests</h2>
      <div className="space-y-3">
        {tests.map(test => (
          <div key={test._id} className="bg-white p-4 rounded shadow">
            <p><strong>Patient:</strong> {test.patientName}</p>
            <p><strong>Test:</strong> {test.testType}</p>
            <p><strong>Status:</strong> {test.status}</p>
            {test.status === 'pending' && (
              <div className="space-y-2 mt-2">
                <button onClick={() => updateStatus(test, 'in-progress')} className="btn btn-sm btn-warning">Start Test</button>
              </div>
            )}
            {test.status === 'in-progress' && (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter Result"
                  defaultValue={test.result}
                  onBlur={(e) => saveResult(test, e.target.value)}
                  className="input input-sm input-bordered w-full"
                />
              </div>
            )}
            {test.status === 'completed' && (
              <p><strong>Result:</strong> {test.result}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
