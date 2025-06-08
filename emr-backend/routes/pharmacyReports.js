// backend/routes/pharmacyReports.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  drugName: String,
  quantity: Number,
  patientName: String,
  date: Date,
});

const stockSchema = new mongoose.Schema({
  drugName: String,
  quantity: Number,
  date: Date,
});

const Issue = mongoose.model('Issue', issueSchema);
const Stock = mongoose.model('Stock', stockSchema);

// GET all issued drug reports
router.get('/issues', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ date: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all stock records
router.get('/stock', async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ date: -1 });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
