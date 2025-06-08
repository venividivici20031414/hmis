// === backend/models/Patient.js ===
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  address: String,
  phone: String,
  // add more patient fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
