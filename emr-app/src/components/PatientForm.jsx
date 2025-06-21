// === src/components/PatientForm.jsx ===
import React, { useState, useEffect } from 'react';

const Empty = { name: '', age: '', gender: '' };
export default function PatientForm({ editingPatient, onSave }) {
  const [form, setForm] = useState(Empty);

  useEffect(() => {
    setForm(editingPatient ? editingPatient : Empty);
  }, [editingPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm(Empty);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border p-2 w-full rounded" required />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="border p-2 w-full rounded" required />
      <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 w-full rounded">
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {editingPatient ? 'Update' : 'Save'}
      </button>
    </form>
  );
}
