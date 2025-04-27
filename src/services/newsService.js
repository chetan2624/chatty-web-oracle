
// Gets mock news data for various categories
export const getLatestNews = async (category = 'general') => {
  // This would normally be an API call to a news service
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate semi-random news data with timestamp variation to ensure different results
      const now = new Date();
      const randomTime = Math.floor(Math.random() * 10000); // Random time offset in milliseconds
      
      const categories = {
        'general': [
          {
            title: "Global Summit Addresses Climate Change Concerns",
            description: "World leaders gathered to discuss urgent climate action with new pledges for carbon reduction.",
            url: "#",
            source: "World News",
            publishedAt: new Date(now.getTime() - (3600000 + randomTime)).toLocaleString()
          },
          {
            title: "Breakthrough in Medical Research Announced",
            description: "Researchers report promising results from trials of a new treatment for chronic conditions.",
            url: "#",
            source: "Health Today",
            publishedAt: new Date(now.getTime() - (7200000 + randomTime)).toLocaleString()
          },
          {
            title: "Tech Companies Form New AI Ethics Coalition",
            description: "Leading technology firms announce joint initiative for responsible AI development standards.",
            url: "#",
            source: "Tech Insights",
            publishedAt: new Date(now.getTime() - (10800000 + randomTime)).toLocaleString()
          }
        ],
        'technology': [
          {
            title: "Quantum Computer Breakthrough Achieves New Record",
            description: "Scientists have demonstrated quantum calculations that surpass conventional supercomputers.",
            url: "#",
            source: "Tech Review",
            publishedAt: new Date(now.getTime() - (2700000 + randomTime)).toLocaleString()
          },
          {
            title: "New Smartphone Features Advanced On-Device AI",
            description: "Latest flagship device brings enhanced privacy with sophisticated on-device processing.",
            url: "#",
            source: "Gadget World",
            publishedAt: new Date(now.getTime() - (5400000 + randomTime)).toLocaleString()
          },
          {
            title: "Revolutionary Battery Tech Promises Faster Charging",
            description: "Startup unveils prototype battery technology that could transform electric vehicles.",
            url: "#",
            source: "Auto Innovation",
            publishedAt: new Date(now.getTime() - (8100000 + randomTime)).toLocaleString()
          }
        ],
        'business': [
          {
            title: "Global Markets React to New Economic Policy",
            description: "Stock markets show volatility as central banks announce coordinated policy changes.",
            url: "#",
            source: "Financial Times",
            publishedAt: new Date(now.getTime() - (3300000 + randomTime)).toLocaleString()
          },
          {
            title: "Renewable Energy Investment Hits Record Levels",
            description: "Green energy sector sees unprecedented funding as investors shift from fossil fuels.",
            url: "#",
            source: "Business Report",
            publishedAt: new Date(now.getTime() - (6600000 + randomTime)).toLocaleString()
          },
          {
            title: "Major Retail Chain Announces Global Expansion",
            description: "Popular retailer unveils plans for hundreds of new locations across international markets.",
            url: "#",
            source: "Market Watch",
            publishedAt: new Date(now.getTime() - (9900000 + randomTime)).toLocaleString()
          }
        ]
      };
      
      // Return the category-specific news, or general news if the category doesn't exist
      resolve(categories[category] || categories['general']);
    }, 1000); // Simulate API delay
  });
};
