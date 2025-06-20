const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },

  dob: {
    type: Date,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?[0-9]{7,15}$/, 'Please enter a valid phone number'],
  },

  address: {
    type: String,
    trim: true,
  },

  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated', 'Other'],
  },

  occupation: {
    type: String,
    trim: true,
  },

  nationalId: {
    type: String,
    trim: true,
  },

  emergencyContact: {
    type: String,
    trim: true,
  },

  uniqueId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  // WHO / ICD-11 readiness
  icd11Codes: [
    {
      code: { type: String },
      description: { type: String },
    },
  ],

  insuranceProvider: {
    type: String,
    trim: true,
  },

  nationality: {
    type: String,
    trim: true,
  },

  isDeceased: {
    type: Boolean,
    default: false,
  },

  dateOfDeath: {
    type: Date,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Patient', PatientSchema);
