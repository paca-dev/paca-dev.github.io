const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  preferences: {
    jobAlerts: {
      type: Boolean,
      default: true
    },
    blogUpdates: {
      type: Boolean,
      default: true
    },
    expatGuides: {
      type: Boolean,
      default: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  source: {
    type: String,
    default: 'website'
  },
  unsubscribeToken: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Generate unsubscribe token before saving
newsletterSchema.pre('save', function(next) {
  if (!this.unsubscribeToken) {
    this.unsubscribeToken = require('crypto').randomBytes(32).toString('hex');
  }
  next();
});

module.exports = mongoose.model('Newsletter', newsletterSchema);