const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  doctor: { type: String, required: true },
  status: { type: String, default: 'Scheduled' },
  // add other fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
