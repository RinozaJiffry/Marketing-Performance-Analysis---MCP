const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const mcpService = require('../services/mcpService');

const router = express.Router();

router.post('/query', authenticateToken, (req, res) => {
  const { query } = req.body;
  const user = req.user;
  
  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }
  
  // Use MCP service to generate authorized context
  const authorizedContext = mcpService.generateAuthorizedContext(user, query);
  
  if (authorizedContext.error) {
    return res.status(400).json({ message: authorizedContext.error });
  }
  
  // Generate AI response using only the authorized context
  const response = mcpService.generateAIResponse(authorizedContext);
  
  // For demonstration purposes, we include the authorized context
  // so we can see what data was passed to the AI
  res.json({
    query,
    authorizedContext,
    response
  });
});

module.exports = router;