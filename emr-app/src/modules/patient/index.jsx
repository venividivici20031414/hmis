import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useReactToPrint } from 'react-to-print';
import { FaEdit, FaTrash, FaPrint } from 'react-icons/fa';
import IDCard from './IDCard';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    phone: '',
    address: '',
    maritalStatus: '',
    occupation: '',
    nationalId: '',
    emergencyContact: '',
    uniqueId: '',
    _id: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPrintPatient, setCurrentPrintPatient] = useState(null);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef, // ✅ REQUIRED in react-to-print v3+
    documentTitle: 'Patient ID Card',
    onBeforeGetContent: () =>
      new Promise((resolve) => setTimeout(resolve, 300)),
    onAfterPrint: () => setCurrentPrintPatient(null),
  });

  useEffect(() => {
    if (currentPrintPatient) {
      handlePrint();
    }
  }, [currentPrintPatient]);

  const API_BASE = '/api/patients';

  const fetchPatients = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await fetch(`${API_BASE}/${formData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        setIsEditing(false);
      } else {
        await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, uniqueId: uuidv4() }),
        });
      }

      setFormData({
        name: '',
        gender: '',
        dob: '',
        phone: '',
        address: '',
        maritalStatus: '',
        occupation: '',
        nationalId: '',
        emergencyContact: '',
        uniqueId: '',
        _id: null,
      });

      fetchPatients();
    } catch (error) {
      alert('Error saving patient');
      console.error(error);
    }
  };

  const handleEdit = (p) => {
    const { __v, ...cleaned } = p;
    setFormData(cleaned);
    setIsEditing(true);
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete patient "${p.name}"?`)) return;
    await fetch(`${API_BASE}/${p._id}`, { method: 'DELETE' });
    fetchPatients();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Patient Registration
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-4 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Full Name"
            required
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Phone"
            required
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Address"
          />
          <input
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Marital Status"
          />
          <input
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Occupation"
          />
          <input
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="National ID"
          />
          <input
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Emergency Contact"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Update Patient' : 'Register Patient'}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded p-4 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Registered Patients</h2>
        {patients.length === 0 ? (
          <p className="text-gray-600">No patients found.</p>
        ) : (
          <table className="w-full table-auto text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">DOB</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Address</th>
                <th className="p-2">Marital Status</th>
                <th className="p-2">Occupation</th>
                <th className="p-2">National ID</th>
                <th className="p-2">Emergency Contact</th>
                <th className="p-2">Unique ID</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.dob}</td>
                  <td className="p-2">{p.gender}</td>
                  <td className="p-2">{p.phone}</td>
                  <td className="p-2">{p.address}</td>
                  <td className="p-2">{p.maritalStatus}</td>
                  <td className="p-2">{p.occupation}</td>
                  <td className="p-2">{p.nationalId}</td>
                  <td className="p-2">{p.emergencyContact}</td>
                  <td className="p-2 font-mono text-blue-700">{p.uniqueId}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => setCurrentPrintPatient(p)}
                      className="text-green-600"
                    >
                      <FaPrint />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Hidden print section */}
      <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
        {currentPrintPatient && (
          <IDCard ref={componentRef} patient={currentPrintPatient} />
        )}
      </div>
    </div>
  );
};

export default PatientsPage;
