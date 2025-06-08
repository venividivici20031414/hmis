// backend/models/Drug.js
const mongoose = require('mongoose');

const DrugSchema = new mongoose.Schema({
  drugName: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  // Add other fields as needed, e.g., quantity, batchNumber, etc.
});

module.exports = mongoose.model('Drug', DrugSchema);
