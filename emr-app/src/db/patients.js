// === src/db/patients.js ===
import PouchDB from 'pouchdb-browser';

const db = new PouchDB('patients');

export const addPatient = async (patient) => {
  patient._id = new Date().toISOString();
  await db.put(patient);
};

export const getAllPatients = async () => {
  const res = await db.allDocs({ include_docs: true });
  return res.rows.map(r => r.doc);
};

export const updatePatient = async (patient) => await db.put(patient);
export const deletePatient = async (patient) => await db.remove(patient);
export default db;
