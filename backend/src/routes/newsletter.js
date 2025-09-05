const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const validator = require('validator');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email, preferences } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const subscription = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase() },
      { 
        preferences: preferences || {},
        isActive: true
      },
      { upsert: true, new: true }
    );

    res.json({ 
      message: 'Successfully subscribed to newsletter',
      subscription: {
        email: subscription.email,
        preferences: subscription.preferences
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email, token } = req.body;

    const query = token ? { unsubscribeToken: token } : { email: email.toLowerCase() };
    
    const subscription = await Newsletter.findOneAndUpdate(
      query,
      { isActive: false },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update newsletter preferences
router.put('/preferences', async (req, res) => {
  try {
    const { email, preferences } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const subscription = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase(), isActive: true },
      { preferences },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ error: 'Active subscription not found' });
    }

    res.json({
      message: 'Newsletter preferences updated',
      preferences: subscription.preferences
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get newsletter statistics (admin only)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Newsletter.aggregate([
      {
        $group: {
          _id: null,
          totalSubscribers: { $sum: { $cond: ['$isActive', 1, 0] } },
          jobAlertsCount: { $sum: { $cond: ['$preferences.jobAlerts', 1, 0] } },
          blogUpdatesCount: { $sum: { $cond: ['$preferences.blogUpdates', 1, 0] } },
          expatGuidesCount: { $sum: { $cond: ['$preferences.expatGuides', 1, 0] } }
        }
      }
    ]);

    res.json(stats[0] || {
      totalSubscribers: 0,
      jobAlertsCount: 0,
      blogUpdatesCount: 0,
      expatGuidesCount: 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;