const express = require('express');
const PharmacyIssueModel = require('../models/PharmacyIssue'); // Ensure this path is correct
const router = express.Router();

// POST /api/pharmacy-issues
router.post('/api/pharmacy-issues', async (req, res) => {
  try {
    // Create a new pharmacy issue using the request body
    const issue = new PharmacyIssueModel(req.body);

    // Save the new issue to the database
    await issue.save();

    // Respond with the newly created issue
    res.status(201).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving the issue' });
  }
});

// GET /api/pharmacy-issues
router.get('/api/pharmacy-issues', async (req, res) => {
  try {
    // Fetch all pharmacy issues from the database, sorted by date (descending)
    const issues = await PharmacyIssueModel.find().sort({ date: -1 });

    // Respond with the list of pharmacy issues
    res.json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching the issues' });
  }
});

module.exports = router;
