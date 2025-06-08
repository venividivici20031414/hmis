const mongoose = require('mongoose');

const PharmacyIssueSchema = new mongoose.Schema({
  patientName: String,
  drugName: String,
  quantity: Number,
  issuedBy: String,
  date: Date,
});

module.exports = mongoose.model('PharmacyIssue', PharmacyIssueSchema);
