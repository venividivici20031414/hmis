const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

/**
 * @route   GET /api/users
 * @desc    Get all users - Admin only
 * @access  Private (Admin)
 */
router.get(
  '/',
  verifyToken,
  authorizeRoles('Admin'),
  async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Exclude passwords from response
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user - Admin only
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/users
 * @desc    Create a new user - Admin only
 * @access  Private (Admin)
 */
router.post(
  '/',
  verifyToken,
  authorizeRoles('Admin'),
  // Validation middleware
  body('username').isString().trim().notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isString().trim().notEmpty().withMessage('Role is required'),
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password, role } = req.body;

      // Log the role to debug
      console.log('Received role:', role);

      // Capitalize the role to ensure it's valid ('nurse' -> 'Nurse', etc.)
      const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

      // Log the capitalized role to check the result
      console.log('Capitalized role:', capitalizedRole);

      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        username,
        password: hashedPassword,
        role: capitalizedRole,  // Save capitalized role
      });

      // Save the new user
      await newUser.save();

      // Respond with success message
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * @route   GET /api/users/me
 * @desc    Get profile of logged-in user
 * @access  Private
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
