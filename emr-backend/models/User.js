const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'Doctor', 'Nurse', 'Lab Technician', 'Pharmacist', 'Billing Officer', 'Receptionist', 'Radiologist', 'NHIA Officer'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
