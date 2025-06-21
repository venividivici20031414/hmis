const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Mongoose schema for pharmacy expiry alerts
const expirySchema = new mongoose.Schema({
  drugName: { type: String, required: true },
  batchNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  recordedBy: { type: String, required: true },
}, { timestamps: true });

const PharmacyExpiry = mongoose.model('PharmacyExpiry', expirySchema);

// GET all expiry alerts, sorted by expiryDate ascending (soonest first)
router.get('/', async (req, res) => {
  try {
    const alerts = await PharmacyExpiry.find().sort({ expiryDate: 1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new expiry alert
router.post('/', async (req, res) => {
  const { drugName, batchNumber, quantity, expiryDate, recordedBy } = req.body;
  const newAlert = new PharmacyExpiry({ drugName, batchNumber, quantity, expiryDate, recordedBy });

  try {
    const savedAlert = await newAlert.save();
    res.status(201).json(savedAlert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
