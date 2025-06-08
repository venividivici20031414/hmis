// === backend/routes/patients.js ===
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', async (req, res) => {
  try {
    const patient = await patientController.addPatient(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const patients = await patientController.getAllPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPatient = await patientController.updatePatient(req.params.id, req.body);
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await patientController.deletePatient(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
