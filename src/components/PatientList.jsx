// === src/components/PatientList.jsx ===
import React, { useEffect, useState } from 'react';
import { getAllPatients, deletePatient } from '../db/patients';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function PatientList({ onEdit }) {
  const [patients, setPatients] = useState([]);

  const load = async () => {
    setPatients(await getAllPatients());
  };
  useEffect(() => { load(); }, []);

  const remove = async (p) => {
    if (window.confirm(`Delete ${p.name}?`)) {
      await deletePatient(p); load();
    }
  };

  return (
    <table className="w-full mt-4 bg-white rounded shadow text-sm">
      <thead className="bg-gray-200">
        <tr><th className="p-2 text-left">Name</th><th className="p-2">Age</th><th className="p-2">Gender</th><th className="p-2">Actions</th></tr>
      </thead>
      <tbody>
        {patients.map(p => (
          <tr key={p._id} className="border-t">
            <td className="p-2">{p.name}</td><td className="p-2 text-center">{p.age}</td><td className="p-2 text-center">{p.gender}</td>
            <td className="p-2 flex gap-2 justify-center">
              <button onClick={() => onEdit(p)} className="text-blue-600"><FiEdit /></button>
              <button onClick={() => remove(p)} className="text-red-600"><FiTrash2 /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}