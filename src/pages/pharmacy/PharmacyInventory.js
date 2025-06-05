import React, { useState, useEffect } from 'react';
import PouchDB from 'pouchdb-browser';

const db = new PouchDB('pharmacy_inventory');

export default function PharmacyInventory() {
  const [drugs, setDrugs] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '', expiry: '' });

  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    const result = await db.allDocs({ include_docs: true });
    setDrugs(result.rows.map(row => row.doc));
  };

  const addDrug = async () => {
    if (!form.name || !form.quantity || !form.expiry) return alert('Fill all fields');
    const newDrug = {
      _id: new Date().toISOString(),
      ...form,
      quantity: parseInt(form.quantity),
      expiry: new Date(form.expiry).toISOString(),
    };
    await db.put(newDrug);
    setForm({ name: '', quantity: '', expiry: '' });
    fetchDrugs();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pharmacy Inventory</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          name="name"
          placeholder="Drug Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="expiry"
          type="date"
          value={form.expiry}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          onClick={addDrug}
          className="col-span-1 md:col-span-3 bg-blue-500 text-white py-2 rounded"
        >
          Add Drug
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug._id} className="border-t">
              <td className="p-2 border">{drug.name}</td>
              <td className="p-2 border">{drug.quantity}</td>
              <td className="p-2 border">
                {new Date(drug.expiry).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
