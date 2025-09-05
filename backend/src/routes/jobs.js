const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { authenticateToken } = require('../middleware/auth');

// Get all jobs with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      location, 
      type, 
      remote, 
      tags,
      featured 
    } = req.query;

    const query = { isActive: true };
    
    // Search in title, company, and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (location) query.location = { $regex: location, $options: 'i' };
    if (type) query.type = type;
    if (remote !== undefined) query.remote = remote === 'true';
    if (tags) query.tags = { $in: tags.split(',') };
    if (featured !== undefined) query.featured = featured === 'true';

    const jobs = await Job.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-contactEmail'); // Don't expose contact email in list

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new job (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      createdBy: req.user.uid
    };

    const job = new Job(jobData);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update job (requires authentication and ownership)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if user owns this job
    if (job.createdBy !== req.user.uid) {
      return res.status(403).json({ error: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job (requires authentication and ownership)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if user owns this job
    if (job.createdBy !== req.user.uid) {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          avgSalary: { $avg: '$salary.max' },
          remoteJobs: { $sum: { $cond: ['$remote', 1, 0] } }
        }
      }
    ]);

    const locationStats = await Job.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const typeStats = await Job.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    res.json({
      overview: stats[0] || { totalJobs: 0, avgSalary: 0, remoteJobs: 0 },
      locationStats,
      typeStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;