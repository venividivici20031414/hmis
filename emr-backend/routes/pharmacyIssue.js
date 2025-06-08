// routes/pharmacyIssue.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Mongoose schema
const issueSchema = new mongoose.Schema({
  drugName: String,
  quantity: Number,
  issuedTo: String,
  issuedBy: String,
  date: Date,
}, { timestamps: true });

const DrugIssue = mongoose.model('DrugIssue', issueSchema);

// GET all drug issue entries
router.get('/', async (req, res) => {
  try {
    const issues = await DrugIssue.find().sort({ date: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new drug issue
router.post('/', async (req, res) => {
  const { drugName, quantity, issuedTo, issuedBy, date } = req.body;
  const issueEntry = new DrugIssue({ drugName, quantity, issuedTo, issuedBy, date });

  try {
    const newEntry = await issueEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
