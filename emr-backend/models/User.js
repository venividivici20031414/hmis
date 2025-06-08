const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Doctor', 'Nurse', 'Lab technician', 'Pharmacist', 'Billing officer', 'Receptionist'], default: 'Doctor' },
});

// Trim spaces around role before saving
UserSchema.pre('save', function(next) {
  if (this.role) {
    this.role = this.role.trim();
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
