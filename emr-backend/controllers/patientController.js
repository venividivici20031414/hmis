const Patient = require('../models/Patients');

// Add a new patient
exports.addPatient = async (patientData) => {
  if (!patientData.uniqueId) {
    throw new Error('Unique ID is required for patient registration');
  }

  // Convert dob to a proper Date object if it's a string
  if (patientData.dob) {
    patientData.dob = new Date(patientData.dob);
  }

  const existing = await Patient.findOne({ uniqueId: patientData.uniqueId });
  if (existing) {
    throw new Error('A patient with this Unique ID already exists');
  }

  const patient = new Patient(patientData);
  return await patient.save();
};

// Fetch all patients
exports.getAllPatients = async () => {
  return await Patient.find().sort({ createdAt: -1 }); // newest first
};

// Update an existing patient
exports.updatePatient = async (patientId, updateData) => {
  if (updateData.dob) {
    updateData.dob = new Date(updateData.dob); // Ensure dob is Date
  }

  const patient = await Patient.findByIdAndUpdate(patientId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!patient) {
    throw new Error('Patient not found');
  }

  return patient;
};

// Delete a patient
exports.deletePatient = async (patientId) => {
  const deleted = await Patient.findByIdAndDelete(patientId);
  if (!deleted) {
    throw new Error('Patient not found or already deleted');
  }
  return deleted;
};
