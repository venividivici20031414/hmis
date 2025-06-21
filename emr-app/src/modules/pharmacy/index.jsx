import React, { useEffect, useState } from 'react';
import { FaPills, FaPlusCircle, FaSearch } from 'react-icons/fa';

const API_BASE = '/api/pharmacy'; // Update if your backend uses a different base path

export default function Pharmacy() {
  const [medicines, setMedicines] = useState([]);
  const [newMed, setNewMed] = useState({ name: '', quantity: '', unit: '', expiry: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch medicines');
      const data = await res.json();
      setMedicines(data);
    } catch (err) {
      console.error(err);
      alert('Error loading medicines');
    }
  };

  const addMedicine = async () => {
    try {
      const med = {
        ...newMed,
        quantity: parseInt(newMed.quantity),
      };

      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(med),
      });

      if (!res.ok) throw new Error('Failed to add medicine');
      setNewMed({ name: '', quantity: '', unit: '', expiry: '' });
      fetchMedicines();
    } catch (err) {
      console.error(err);
      alert('Error adding medicine');
    }
  };

  const filtered = medicines.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FaPills /> Pharmacy Management
      </h1>

      {/* Add Medicine */}
      <div className="bg-white p-4 rounded shadow-md space-y-3">
        <h2 className="text-lg font-semibold">Add Medicine</h2>
        <div className="grid md:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Name"
            className="input"
            value={newMed.name}
            onChange={e => setNewMed({ ...newMed, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="input"
            value={newMed.quantity}
            onChange={e => setNewMed({ ...newMed, quantity: e.target.value })}
          />
          <input
            type="text"
            placeholder="Unit (e.g., tablets, ml)"
            className="input"
            value={newMed.unit}
            onChange={e => setNewMed({ ...newMed, unit: e.target.value })}
          />
          <input
            type="date"
            className="input"
            value={newMed.expiry}
            onChange={e => setNewMed({ ...newMed, expiry: e.target.value })}
          />
        </div>
        <button
          onClick={addMedicine}
          className="btn bg-blue-600 text-white flex items-center gap-2"
        >
          <FaPlusCircle /> Add
        </button>
      </div>

      {/* Search and List */}
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <FaSearch />
          <input
            type="text"
            placeholder="Search medicine..."
            className="input flex-1"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <table className="min-w-full table-auto text-left text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Expiry</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((med) => (
              <tr key={med._id} className="border-t">
                <td className="p-2">{med.name}</td>
                <td className="p-2">{med.quantity}</td>
                <td className="p-2">{med.unit}</td>
                <td className="p-2">{med.expiry}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="p-2 text-center text-gray-500">No medicines found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
