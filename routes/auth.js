const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const router = express.Router();

router.post('/login', (req, res) => {
  const { userId } = req.body;
  
  // Simple login for demonstration
  if (!users[userId]) {
    return res.status(401).json({ message: 'Invalid user ID' });
  }
  
  // Generate token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  res.json({
    token,
    user: {
      id: users[userId].id,
      name: users[userId].name,
      role: users[userId].role
    }
  });
});

module.exports = router;