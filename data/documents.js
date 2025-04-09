const documents = {
    "doc1": {
      id: "doc1",
      title: "Q1 Marketing Performance",
      content: {
        summary: "Marketing performance improved by 15% in Q1 compared to last year.",
        details: {
          channels: {
            social: "22% growth in engagement",
            email: "15% improvement in open rates",
            search: "8% increase in organic traffic"
          },
          campaigns: {
            "spring-promo": "Generated $1.2M in revenue",
            "product-launch": "Acquired 15,000 new customers"
          },
          budget: {
            planned: "$500,000",
            actual: "$485,000",
            variance: "+$15,000"
          },
          roi: "3.2x return on marketing investment"
        },
        sensitive: {
          customerAcquisitionCost: "$42 per customer",
          profitMargins: "38% on marketing-generated sales",
          upcomingStrategy: "Focus on reducing CAC by 12% next quarter"
        }
      }
    }
  };
  
  module.exports = documents;