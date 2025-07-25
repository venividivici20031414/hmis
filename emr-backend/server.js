const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const patientRoutes = require('./routes/patients'); // Import patient routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // Seed admin user once DB is connected
    seedAdmin();
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/auth', require('./routes/auth'));         // Login & Signup
app.use('/api/users', require('./routes/users'));       // User Management
app.use('/api/pharmacy-stock', require('./routes/pharmacyStock')); // Pharmacy stock
app.use('/api/pharmacy-issues', require('./routes/pharmacyIssue')); // Corrected path for pharmacy issues
app.use('/api/pharmacy-expiry', require('./routes/pharmacyExpiry')); // Pharmacy Expiry Alert
app.use('/api/patients', patientRoutes); // Connect patient routes to /api/patients

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Seed admin user (only runs once)
async function seedAdmin() {
  try {
    const existing = await User.findOne({ username: 'admin' });
    if (existing) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'Admin',
    });

    await adminUser.save();
    console.log("Admin user created: username = admin, password = admin123");
  } catch (err) {
    console.error("Error seeding admin user:", err);
  }
}
