// File: src/components/PharmacyStockTaking.jsx

import { useState, useEffect } from 'react';

export default function PharmacyStockTaking() {
  const [entry, setEntry] = useState({
    drugName: '',
    quantity: '',
    recordedBy: '',
    date: '',
  });

  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  // Fetch all stock records from backend API with token
  const fetchStock = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('/api/pharmacy-stock', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch stock records');
      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  // Submit a new stock record to backend API with token
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('/api/pharmacy-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) throw new Error('Failed to save stock record');

      setEntry({ drugName: '', quantity: '', recordedBy: '', date: '' });
      fetchStock();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pharmacy Stock Taking</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <input
          name="drugName"
          value={entry.drugName}
          onChange={handleChange}
          placeholder="Drug Name"
          className="p-2 border rounded"
        />
        <input
          name="quantity"
          type="number"
          value={entry.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="p-2 border rounded"
        />
        <input
          name="recordedBy"
          value={entry.recordedBy}
          onChange={handleChange}
          placeholder="Recorded By"
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={entry.date}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Record
        </button>
      </form>

      <ul className="space-y-2">
        {stock.length === 0 ? (
          <li className="text-gray-500">No stock records found.</li>
        ) : (
          stock.map((item) => (
            <li key={item._id} className="border p-2 rounded shadow-sm">
              {new Date(item.date).toLocaleDateString()} - {item.drugName} -{' '}
              {item.quantity} units by {item.recordedBy}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
