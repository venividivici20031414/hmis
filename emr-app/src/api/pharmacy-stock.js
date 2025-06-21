// backend/routes/pharmacyStock.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Mongoose schema
const stockSchema = new mongoose.Schema({
  drugName: String,
  quantity: Number,
  recordedBy: String,
  date: Date,
}, { timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);

// GET all stock entries
router.get('/', async (req, res) => {
  try {
    const stock = await Stock.find().sort({ date: -1 });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new stock entry
router.post('/', async (req, res) => {
  const { drugName, quantity, recordedBy, date } = req.body;
  const stockEntry = new Stock({ drugName, quantity, recordedBy, date });
  try {
    const newEntry = await stockEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
