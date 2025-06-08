import React, { useState, useEffect } from 'react';

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

  const fetchStock = async () => {
    try {
      const res = await fetch('/api/pharmacy-stock'); // your backend endpoint
      const data = await res.json();
      setStock(data);
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  };

  const handleChange = e => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await fetch('/api/pharmacy-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      setEntry({ drugName: '', quantity: '', recordedBy: '', date: '' });
      fetchStock();
    } catch (error) {
      console.error('Error recording stock:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pharmacy Stock Taking</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="drugName" value={entry.drugName} onChange={handleChange} placeholder="Drug Name" className="input" />
        <input
          name="quantity"
          type="number"
          value={entry.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="input"
        />
        <input name="recordedBy" value={entry.recordedBy} onChange={handleChange} placeholder="Recorded By" className="input" />
        <input type="date" name="date" value={entry.date} onChange={handleChange} className="input" />
        <button type="submit" className="btn">Record</button>
      </form>
      <ul className="mt-4">
        {stock.map(item => (
          <li key={item._id}>
            {new Date(item.date).toLocaleDateString()} - {item.drugName} - {item.quantity} units by {item.recordedBy}
          </li>
        ))}
      </ul>
    </div>
  );
}
