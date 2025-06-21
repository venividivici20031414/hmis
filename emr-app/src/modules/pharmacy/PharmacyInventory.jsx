'use client'; // Optional if using Next.js App Router or similar

import { useState, useEffect } from 'react';

export default function PharmacyInventory() {
  const [drugs, setDrugs] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '', expiry: '' });

  useEffect(() => {
    loadDrugs();
  }, []);

  const loadDrugs = async () => {
    try {
      const response = await fetch('/api/pharmacy-inventory');
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setDrugs(data);
    } catch (error) {
      console.error(error);
      alert('Error loading inventory');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDrug = async () => {
    const { name, quantity, expiry } = form;

    if (!name || !quantity || !expiry) {
      alert('Please fill all fields');
      return;
    }

    const newDrug = {
      name,
      quantity: parseInt(quantity),
      expiry: new Date(expiry).toISOString(),
    };

    try {
      const response = await fetch('/api/pharmacy-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDrug),
      });

      if (!response.ok) throw new Error('Failed to add drug');
      setForm({ name: '', quantity: '', expiry: '' });
      loadDrugs();
    } catch (error) {
      console.error(error);
      alert('Error adding drug');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pharmacy Inventory</h2>

      {/* Drug Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          name="name"
          placeholder="Drug Name"
          value={form.name}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          name="expiry"
          type="date"
          value={form.expiry}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddDrug}
          className="col-span-1 md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Add Drug
        </button>
      </div>

      {/* Drug Table */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {drugs.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No drugs in inventory.
              </td>
            </tr>
          ) : (
            drugs.map((drug) => (
              <tr key={drug._id} className="border-t">
                <td className="p-2 border">{drug.name}</td>
                <td className="p-2 border">{drug.quantity}</td>
                <td className="p-2 border">
                  {new Date(drug.expiry).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
