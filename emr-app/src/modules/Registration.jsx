// === src/pages/Registration.jsx ===
import React, { useState } from 'react';
import { addPatient, updatePatient } from '../db/patients';
import PatientForm from '../components/PatientForm';
import PatientList from '../components/PatientList';

export default function Registration() {
  const [editing, setEditing] = useState(null);

  const handleSave = async (patient) => {
    if (patient._id) await updatePatient(patient); else await addPatient(patient);
    setEditing(null);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Patient Registration</h1>
      <PatientForm editingPatient={editing} onSave={handleSave} />
      <PatientList onEdit={setEditing} />
    </div>
  );
}
