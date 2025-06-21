// === src/pages/Consulting.js ===
import React, { useState } from 'react';
import PouchDB from 'pouchdb';

const db = new PouchDB('consultations');

export default function Consulting() {
  const [formData, setFormData] = useState({
    patientId: '',
    vitals: { temperature: '', bp: '', pulse: '', spo2: '' },
    complaint: '',
    history: '',
    exam: '',
    diagnosis: '',
    treatment: '',
    followUp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.vitals) {
      setFormData(prev => ({
        ...prev,
        vitals: { ...prev.vitals, [name]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const consultation = {
      _id: new Date().toISOString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    await db.put(consultation);
    alert('Consultation saved successfully');
    setFormData({
      patientId: '',
      vitals: { temperature: '', bp: '', pulse: '', spo2: '' },
      complaint: '',
      history: '',
      exam: '',
      diagnosis: '',
      treatment: '',
      followUp: '',
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Consultation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          placeholder="Patient ID"
          required
          className="w-full p-2 border rounded"
        />

        <fieldset className="border p-4 rounded">
          <legend className="text-lg font-medium">Vital Signs</legend>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {['temperature', 'bp', 'pulse', 'spo2'].map(field => (
              <input
                key={field}
                name={field}
                value={formData.vitals[field]}
                onChange={handleChange}
                placeholder={field.toUpperCase()}
                className="p-2 border rounded"
              />
            ))}
          </div>
        </fieldset>

        {[
          { name: 'complaint', label: 'Chief Complaint' },
          { name: 'history', label: 'History of Present Illness' },
          { name: 'exam', label: 'Examination Findings' },
          { name: 'diagnosis', label: 'Diagnosis (ICD-10 preferred)' },
          { name: 'treatment', label: 'Treatment Plan' },
          { name: 'followUp', label: 'Follow-up Instructions' },
        ].map(({ name, label }) => (
          <textarea
            key={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={label}
            className="w-full p-2 border rounded"
          />
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Consultation
        </button>
      </form>
    </div>
  );
}
