const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship']
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'EUR'
    },
    period: {
      type: String,
      enum: ['hour', 'day', 'month', 'year'],
      default: 'year'
    }
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000
  },
  requirements: [{
    type: String,
    maxlength: 500
  }],
  benefits: [{
    type: String,
    maxlength: 200
  }],
  remote: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  companyLogo: String,
  contactEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  applicationUrl: String,
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdBy: {
    type: String, // Firebase user ID
    required: true
  },
  applicationsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better performance
jobSchema.index({ location: 1, type: 1 });
jobSchema.index({ tags: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ expiresAt: 1 });

// Middleware to auto-deactivate expired jobs
jobSchema.pre('find', function() {
  this.where({ expiresAt: { $gte: new Date() } });
});

module.exports = mongoose.model('Job', jobSchema);