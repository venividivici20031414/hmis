import React, { useEffect, useState } from 'react';
import PouchDB from 'pouchdb-browser';
import { FaEdit, FaTrash } from 'react-icons/fa';

const db = new PouchDB('patients');

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', _id: null });
  const [isEditing, setIsEditing] = useState(false);

  // Load patients
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const result = await db.allDocs({ include_docs: true });
    setPatients(result.rows.map(row => row.doc));
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const existing = await db.get(formData._id);
      await db.put({ ...existing, ...formData });
      setIsEditing(false);
    } else {
      await db.put({
        _id: new Date().toISOString(),
        ...formData,
      });
    }

    setFormData({ name: '', age: '', gender: '', _id: null });
    fetchPatients();
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setIsEditing(true);
  };

  const handleDelete = async (patient) => {
    const doc = await db.get(patient._id);
    await db.remove(doc);
    fetchPatients();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Registration</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border rounded p-2 w-full"
            required
          />
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            type="number"
            className="border rounded p-2 w-full"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Update Patient' : 'Register Patient'}
        </button>
      </form>

      {/* Patient List */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Registered Patients</h2>
        {patients.length === 0 ? (
          <p className="text-gray-600">No patients registered.</p>
        ) : (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Age</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.age}</td>
                  <td className="p-2">{p.gender}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;
