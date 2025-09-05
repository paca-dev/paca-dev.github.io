const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  avatar: String,
  cv: {
    text: {
      type: String,
      maxlength: 20000 // ~20KB of text
    },
    skills: [{
      name: String,
      level: {
        type: Number,
        min: 1,
        max: 5
      }
    }],
    experience: [{
      title: String,
      company: String,
      duration: String,
      description: String
    }],
    education: [{
      degree: String,
      school: String,
      year: String
    }],
    uploadedAt: Date
  },
  preferences: {
    interestedRoles: [String],
    preferredLocations: [String],
    salaryRange: {
      min: Number,
      max: Number
    },
    workType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'any']
    },
    remoteOk: {
      type: Boolean,
      default: true
    }
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    newJobs: {
      type: Boolean,
      default: true
    },
    matchingJobs: {
      type: Boolean,
      default: true
    },
    blogUpdates: {
      type: Boolean,
      default: false
    }
  },
  savedJobs: [{
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    savedAt: {
      type: Date,
      default: Date.now
    }
  }],
  applications: [{
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['applied', 'viewed', 'interviewed', 'offered', 'rejected'],
      default: 'applied'
    },
    notes: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Indexes
userSchema.index({ firebaseId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ 'cv.skills.name': 1 });

module.exports = mongoose.model('User', userSchema);