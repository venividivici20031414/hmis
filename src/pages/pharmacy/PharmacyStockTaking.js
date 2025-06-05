import React, { useState, useEffect } from 'react';
import PouchDB from 'pouchdb';

const db = new PouchDB('pharmacy_stock');

export default function PharmacyStockTaking() {
  const [entry, setEntry] = useState({ drugName: '', quantity: '', recordedBy: '', date: '' });
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    const result = await db.allDocs({ include_docs: true });
    setStock(result.rows.map(row => row.doc));
  };

  const handleChange = e => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const record = { ...entry, _id: new Date().toISOString() };
    await db.put(record);
    setEntry({ drugName: '', quantity: '', recordedBy: '', date: '' });
    fetchStock();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pharmacy Stock Taking</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="drugName" value={entry.drugName} onChange={handleChange} placeholder="Drug Name" className="input" />
        <input name="quantity" value={entry.quantity} onChange={handleChange} placeholder="Quantity" className="input" />
        <input name="recordedBy" value={entry.recordedBy} onChange={handleChange} placeholder="Recorded By" className="input" />
        <input type="date" name="date" value={entry.date} onChange={handleChange} className="input" />
        <button type="submit" className="btn">Record</button>
      </form>
      <ul className="mt-4">
        {stock.map(item => (
          <li key={item._id}>{item.date} - {item.drugName} - {item.quantity} units</li>
        ))}
      </ul>
    </div>
  );
}
