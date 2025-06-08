// backend/routes/pharmacy.js
const express = require('express');
const router = express.Router();
const Drug = require('../models/Drug');

// GET /api/pharmacy/expiry-alerts
router.get('/expiry-alerts', async (req, res) => {
  try {
    const today = new Date();
    const threshold = new Date();
    threshold.setDate(today.getDate() + 30);

    const expiringDrugs = await Drug.find({
      expiryDate: { $lte: threshold }
    });

    res.json(expiringDrugs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
