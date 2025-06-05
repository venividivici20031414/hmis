import React, { useState } from 'react';

const AppointmentsPage = () => {
   console.log("AppointmentsPage loaded"); // Check console
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    date: '',
    time: '',
    doctor: ''
  });

  // Handle input changes for creating an appointment
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new appointment
  const handleAddAppointment = () => {
    setAppointments((prev) => [...prev, newAppointment]);
    setNewAppointment({ patientName: '', date: '', time: '', doctor: '' });
  };

  // Handle deleting an appointment
  const handleDeleteAppointment = (index) => {
    setAppointments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>

      {/* New Appointment Form */}
      <div className="bg-white p-4 shadow-md rounded-md mb-6">
        <h2 className="text-xl mb-4">New Appointment</h2>
        <input
          type="text"
          name="patientName"
          value={newAppointment.patientName}
          onChange={handleInputChange}
          placeholder="Patient Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          name="date"
          value={newAppointment.date}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="time"
          name="time"
          value={newAppointment.time}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="doctor"
          value={newAppointment.doctor}
          onChange={handleInputChange}
          placeholder="Doctor's Name"
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleAddAppointment}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Appointment
        </button>
      </div>

      {/* Appointments List */}
      <h2 className="text-xl mb-4">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <table className="w-full table-auto bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="border p-2">Patient Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td className="border p-2">{appointment.patientName}</td>
                <td className="border p-2">{appointment.date}</td>
                <td className="border p-2">{appointment.time}</td>
                <td className="border p-2">{appointment.doctor}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteAppointment(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsPage;
