const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Job = require('../models/Job');
const { authenticateToken } = require('../middleware/auth');

// Upload/Update CV
router.post('/upload', authenticateToken, async (req, res) => {
  try {
    const { cvText, skills, experience, education } = req.body;
    
    if (!cvText || cvText.trim().length < 100) {
      return res.status(400).json({ 
        error: 'CV text must be at least 100 characters long' 
      });
    }

    const user = await User.findOne({ firebaseId: req.user.uid });
    
    // Extract skills from CV text if not provided
    const extractedSkills = skills || extractSkillsFromText(cvText);
    
    user.cv = {
      text: cvText,
      skills: extractedSkills,
      experience: experience || [],
      education: education || [],
      uploadedAt: new Date()
    };

    await user.save();

    res.json({ 
      message: 'CV uploaded successfully',
      skillsExtracted: extractedSkills.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get CV
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    
    if (!user || !user.cv.text) {
      return res.status(404).json({ error: 'CV not found' });
    }

    res.json(user.cv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job matches based on CV
router.get('/matches', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    
    if (!user || !user.cv.text) {
      return res.status(404).json({ error: 'CV not found' });
    }

    // Simple matching algorithm based on skills and keywords
    const userSkills = user.cv.skills.map(skill => 
      typeof skill === 'string' ? skill.toLowerCase() : skill.name.toLowerCase()
    );
    
    const jobs = await Job.find({ isActive: true });
    
    const matchedJobs = jobs.map(job => {
      let score = 0;
      const jobText = (job.title + ' ' + job.description + ' ' + job.requirements.join(' ')).toLowerCase();
      
      // Check skill matches
      userSkills.forEach(skill => {
        if (jobText.includes(skill) || job.tags.some(tag => tag.toLowerCase().includes(skill))) {
          score += 2;
        }
      });
      
      // Check location preference
      if (user.preferences.preferredLocations.includes(job.location)) {
        score += 1;
      }
      
      // Check work type preference
      if (user.preferences.workType === 'any' || user.preferences.workType === job.type) {
        score += 1;
      }
      
      // Check remote preference
      if (user.preferences.remoteOk && job.remote) {
        score += 1;
      }

      return {
        ...job.toObject(),
        matchScore: score,
        matchPercentage: Math.min(100, Math.round((score / userSkills.length) * 100))
      };
    })
    .filter(job => job.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);

    res.json(matchedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simple skill extraction function
function extractSkillsFromText(text) {
  const commonSkills = [
    'javascript', 'typescript', 'react', 'vue', 'angular', 'node.js', 'nodejs',
    'python', 'java', 'c++', 'c#', 'php', 'ruby', 'swift', 'kotlin',
    'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind',
    'mongodb', 'mysql', 'postgresql', 'redis', 'elasticsearch',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins',
    'git', 'github', 'gitlab', 'jira', 'slack',
    'express', 'django', 'flask', 'spring', 'laravel',
    'graphql', 'rest', 'api', 'microservices',
    'agile', 'scrum', 'devops', 'ci/cd', 'tdd', 'bdd'
  ];

  const lowerText = text.toLowerCase();
  const foundSkills = [];

  commonSkills.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push({
        name: skill,
        level: 3 // Default intermediate level
      });
    }
  });

  return foundSkills;
}

module.exports = router;