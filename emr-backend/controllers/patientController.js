// === backend/controllers/patientController.js ===
const Patient = require('../models/Patient');

exports.addPatient = async (patientData) => {
  const patient = new Patient(patientData);
  return await patient.save();
};

exports.getAllPatients = async () => {
  return await Patient.find({});
};

exports.updatePatient = async (patientId, updateData) => {
  return await Patient.findByIdAndUpdate(patientId, updateData, { new: true });
};

exports.deletePatient = async (patientId) => {
  return await Patient.findByIdAndDelete(patientId);
};
