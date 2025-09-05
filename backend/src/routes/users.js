const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Job = require('../models/Job');
const { authenticateToken } = require('../middleware/auth');

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    let user = await User.findOne({ firebaseId: req.user.uid });
    
    if (!user) {
      // Create new user from Firebase data
      user = new User({
        firebaseId: req.user.uid,
        email: req.user.email,
        name: req.user.name || req.user.email.split('@')[0],
        avatar: req.user.picture
      });
      await user.save();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { firebaseId: req.user.uid },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save a job
router.post('/jobs/:jobId/save', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    const jobExists = await Job.findById(req.params.jobId);
    
    if (!jobExists) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if job is already saved
    const alreadySaved = user.savedJobs.some(
      job => job.jobId.toString() === req.params.jobId
    );

    if (alreadySaved) {
      return res.status(400).json({ error: 'Job already saved' });
    }

    user.savedJobs.push({ jobId: req.params.jobId });
    await user.save();

    res.json({ message: 'Job saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unsave a job
router.delete('/jobs/:jobId/save', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    user.savedJobs = user.savedJobs.filter(
      job => job.jobId.toString() !== req.params.jobId
    );
    await user.save();

    res.json({ message: 'Job removed from saved list' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get saved jobs
router.get('/jobs/saved', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid })
      .populate('savedJobs.jobId');
    
    const savedJobs = user.savedJobs.map(item => ({
      ...item.jobId.toObject(),
      savedAt: item.savedAt
    }));

    res.json(savedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Apply to a job
router.post('/jobs/:jobId/apply', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already applied
    const alreadyApplied = user.applications.some(
      app => app.jobId.toString() === req.params.jobId
    );

    if (alreadyApplied) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    user.applications.push({ 
      jobId: req.params.jobId,
      notes: req.body.notes 
    });
    await user.save();

    // Increment applications count
    job.applicationsCount += 1;
    await job.save();

    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user applications
router.get('/applications', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid })
      .populate('applications.jobId');
    
    const applications = user.applications.map(app => ({
      ...app.jobId.toObject(),
      applicationStatus: app.status,
      appliedAt: app.appliedAt,
      notes: app.notes
    }));

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update application status (for employers)
router.put('/applications/:applicationId/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findOne({ 
      'applications._id': req.params.applicationId 
    });

    if (!user) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const application = user.applications.id(req.params.applicationId);
    application.status = status;
    await user.save();

    res.json({ message: 'Application status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;