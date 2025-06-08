const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define expiry schema
const expirySchema = new mongoose.Schema({
  drugName: String,
  batchNumber: String,
  expiryDate: Date,
  quantity: Number,
  addedBy: String,
}, { timestamps: true });

const ExpiryAlert = mongoose.model('ExpiryAlert', expirySchema);

// GET all drugs that are expired or expiring soon (e.g., next 30 days)
router.get('/', async (req, res) => {
  try {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30); // next 30 days

    const expiringDrugs = await ExpiryAlert.find({
      expiryDate: { $lte: nextMonth }
    }).sort({ expiryDate: 1 });

    res.json(expiringDrugs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new expiry record
router.post('/', async (req, res) => {
  const { drugName, batchNumber, expiryDate, quantity, addedBy } = req.body;

  const record = new ExpiryAlert({
    drugName,
    batchNumber,
    expiryDate,
    quantity,
    addedBy,
  });

  try {
    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
