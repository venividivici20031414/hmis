import patientDB from '../db/patients';

// Create patient
export const addPatient = async (patient) => {
  patient._id = new Date().toISOString();
  await patientDB.put(patient);
};

// Get all patients
export const getAllPatients = async () => {
  const result = await patientDB.allDocs({ include_docs: true });
  return result.rows.map(row => row.doc);
};

// Update patient
export const updatePatient = async (patient) => {
  await patientDB.put(patient);
};

// Delete patient
export const deletePatient = async (patient) => {
  await patientDB.remove(patient);
};
