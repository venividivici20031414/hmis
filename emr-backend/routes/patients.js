// === backend/routes/patients.js ===
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Create a new patient
router.post('/', async (req, res) => {
  try {
    const patient = await patientController.addPatient(req.body);
    return res.status(201).json(patient);
  } catch (err) {
    console.error('Error creating patient:', err.message);
    return res.status(500).json({ error: 'Failed to create patient.' });
  }
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await patientController.getAllPatients();
    return res.status(200).json(patients);
  } catch (err) {
    console.error('Error fetching patients:', err.message);
    return res.status(500).json({ error: 'Failed to fetch patients.' });
  }
});

// Update a patient by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPatient = await patientController.updatePatient(req.params.id, req.body);
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }
    return res.status(200).json(updatedPatient);
  } catch (err) {
    console.error('Error updating patient:', err.message);
    return res.status(500).json({ error: 'Failed to update patient.' });
  }
});

// Delete a patient by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await patientController.deletePatient(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Patient not found.' });
    }
    return res.status(204).send(); // No Content
  } catch (err) {
    console.error('Error deleting patient:', err.message);
    return res.status(500).json({ error: 'Failed to delete patient.' });
  }
});

module.exports = router;
