import React, { useEffect, useState } from 'react';
import patientsDB from '../db/patients';
import { FaPlus, FaSearch } from 'react-icons/fa';
import Patient from './Patients';
import { v4 as uuidv4 } from 'uuid';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const result = await patientsDB.allDocs({ include_docs: true });
      setPatients(result.rows.map(row => row.doc));
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  const addPatient = async () => {
    if (!newPatient.name || !newPatient.age || !newPatient.condition) return;
    const patient = {
      _id: uuidv4(),
      ...newPatient,
    };
    try {
      await patientsDB.put(patient);
      setNewPatient({ name: '', age: '', condition: '' });
      fetchPatients();
    } catch (err) {
      console.error('Error adding patient:', err);
    }
  };

  const deletePatient = async (id, rev) => {
    try {
      await patientsDB.remove(id, rev);
      fetchPatients();
    } catch (err) {
      console.error('Error deleting patient:', err);
    }
  };

  const updatePatient = async (updatedPatient) => {
    try {
      await patientsDB.put(updatedPatient);
      fetchPatients();
    } catch (err) {
      console.error('Error updating patient:', err);
    }
  };

 const filteredPatients = patients.filter(p =>
  (p.name || '').toLowerCase().includes(search.toLowerCase())
);


  const indexOfLast = currentPage * patientsPerPage;
  const indexOfFirst = indexOfLast - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patients Management</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or condition..."
            className="border p-2 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-gray-500 mt-3" />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Patient</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Age"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Condition"
            value={newPatient.condition}
            onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={addPatient}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <table className="w-full border table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Age</th>
            <th className="border p-2 text-left">Condition</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((p) => (
            <Patient
              key={p._id}
              patient={p}
              onDelete={deletePatient}
              onUpdate={updatePatient}
            />
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientsPage;
