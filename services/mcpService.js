const documents = require('../data/documents');

// Model Context Protocol implementation
class MCPService {
  
  // Main method to generate authorized context
  generateAuthorizedContext(user, query) {
    // Step 1: Parse the query to understand what data is being requested
    const requestedDocId = this.parseQuery(query);
    if (!requestedDocId) {
      return { error: "Could not understand the request" };
    }
    
    // Step 2: Retrieve the raw data (context provider)
    const rawData = this.fetchData(requestedDocId);
    if (!rawData) {
      return { error: "Requested data not found" };
    }
    
    // Step 3: Apply context contract based on user's role (authorization)
    const authorizedContext = this.applyContextContract(user, rawData);
    
    // Step 4: Return only the authorized context
    return authorizedContext;
  }
  
  // Parse the user query to extract what document they're requesting
  parseQuery(query) {
    // Simple implementation - in real systems, this would be more sophisticated
    // e.g., using NLP to understand the query intent
    if (query.toLowerCase().includes("marketing") && 
        query.toLowerCase().includes("performance")) {
      return "doc1";
    }
    return null;
  }
  
  // Fetch the raw data from the data store
  fetchData(docId) {
    return documents[docId];
  }
  
  // Apply context contract based on user's role
  applyContextContract(user, data) {
    // Create a base response with metadata
    const context = {
      documentId: data.id,
      title: data.title,
      accessedBy: user.name,
      timestamp: new Date().toISOString()
    };
    
    // All users can see the basic summary
    context.content = {
      summary: data.content.summary
    };
    
    // Add role-based access restrictions
    if (user.role === "manager" || user.role === "executive") {
      // Managers and executives can see detailed information
      context.content.details = {
        channels: data.content.details.channels,
        campaigns: data.content.details.campaigns
      };
    }
    
    if (user.role === "executive") {
      // Only executives can see budget, ROI, and sensitive information
      context.content.details.budget = data.content.details.budget;
      context.content.details.roi = data.content.details.roi;
      context.content.sensitive = data.content.sensitive;
    }
    
    return context;
  }
  
  // Simulate an AI response based on authorized context only
  generateAIResponse(authorizedContext) {
    // This simulates what an LLM would do with the authorized context
    let response = `Here's information about ${authorizedContext.title}:\n\n`;
    
    // Add summary information
    response += `${authorizedContext.content.summary}\n\n`;
    
    // Add details if available
    if (authorizedContext.content.details) {
      if (authorizedContext.content.details.channels) {
        response += "Channel Performance:\n";
        for (const [channel, performance] of Object.entries(authorizedContext.content.details.channels)) {
          response += `- ${channel}: ${performance}\n`;
        }
        response += "\n";
      }
      
      if (authorizedContext.content.details.campaigns) {
        response += "Campaign Results:\n";
        for (const [campaign, result] of Object.entries(authorizedContext.content.details.campaigns)) {
          response += `- ${campaign}: ${result}\n`;
        }
        response += "\n";
      }
      
      if (authorizedContext.content.details.budget) {
        response += `Budget Information:\n`;
        response += `- Planned: ${authorizedContext.content.details.budget.planned}\n`;
        response += `- Actual: ${authorizedContext.content.details.budget.actual}\n`;
        response += `- Variance: ${authorizedContext.content.details.budget.variance}\n\n`;
      }
      
      if (authorizedContext.content.details.roi) {
        response += `ROI: ${authorizedContext.content.details.roi}\n\n`;
      }
    }
    
    // Add sensitive information if available
    if (authorizedContext.content.sensitive) {
      response += "Additional Insights:\n";
      if (authorizedContext.content.sensitive.customerAcquisitionCost) {
        response += `- Customer Acquisition Cost: ${authorizedContext.content.sensitive.customerAcquisitionCost}\n`;
      }
      if (authorizedContext.content.sensitive.profitMargins) {
        response += `- Profit Margins: ${authorizedContext.content.sensitive.profitMargins}\n`;
      }
      if (authorizedContext.content.sensitive.upcomingStrategy) {
        response += `- Strategic Direction: ${authorizedContext.content.sensitive.upcomingStrategy}\n`;
      }
    }
    
    return response;
  }
}

module.exports = new MCPService();