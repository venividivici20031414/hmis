// backend/routes/pharmacy.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  drugName: String,
  expiryDate: Date,
  // other fields as needed
});

const Drug = mongoose.model('Drug', drugSchema);

router.get('/expiry-alerts', async (req, res) => {
  try {
    const today = new Date();
    const threshold = new Date();
    threshold.setDate(today.getDate() + 30);

    // Find drugs with expiryDate <= threshold
    const expiringDrugs = await Drug.find({
      expiryDate: { $lte: threshold }
    }).sort({ expiryDate: 1 });

    res.json(expiringDrugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
