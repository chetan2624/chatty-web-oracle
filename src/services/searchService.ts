
export interface SearchResult {
  title: string;
  description: string;
  url: string;
}

// Extract search query from user message
export const extractSearchQueryFromMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('search for ')) {
    return message.split('search for ')[1].trim();
  }
  
  if (lowerMessage.includes('search ')) {
    return message.split('search ')[1].trim();
  }
  
  if (lowerMessage.includes('look up ')) {
    return message.split('look up ')[1].trim();
  }
  
  if (lowerMessage.includes('find ')) {
    return message.split('find ')[1].trim();
  }
  
  if (lowerMessage.includes('what is ')) {
    return message.split('what is ')[1].trim();
  }
  
  if (lowerMessage.includes('who is ')) {
    return message.split('who is ')[1].trim();
  }
  
  if (lowerMessage.includes('how to ')) {
    return message.split('how to ')[1].trim();
  }
  
  // If no pattern matches, use the whole message as a search query
  return message.trim();
};

// Search for information using a search query
export const searchForInformation = async (query: string): Promise<SearchResult[]> => {
  if (!query) {
    throw new Error("Search query is required");
  }
  
  try {
    // In a real app, you would make an API call to a search API
    // For this demo, we'll simulate search results
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(generateMockSearchResults(query));
      }, 1000);
    });
  } catch (error) {
    console.error("Error searching for information:", error);
    throw error;
  }
};

// Generate mock search results based on the query
const generateMockSearchResults = (query: string): SearchResult[] => {
  const lowerQuery = query.toLowerCase();
  
  // Custom results for common queries
  if (lowerQuery.includes('weather')) {
    return [
      {
        title: "Current Weather Conditions - Weather Service",
        description: "Get the latest weather forecast, hourly updates, and severe weather alerts for your location.",
        url: "#"
      },
      {
        title: "Weather Radar & Maps - Weather Tracker",
        description: "Interactive weather maps show radar, temperature, precipitation, satellite views and more.",
        url: "#"
      },
      {
        title: "Understanding Weather Patterns - Weather Education",
        description: "Learn about different weather patterns, climate zones, and meteorological phenomena.",
        url: "#"
      }
    ];
  }
  
  if (lowerQuery.includes('news')) {
    return [
      {
        title: "Latest Breaking News - News Network",
        description: "Stay informed with the latest news and updates from around the world, covering politics, business, entertainment, and more.",
        url: "#"
      },
      {
        title: "Local and National Headlines - Daily News",
        description: "Comprehensive coverage of local events and national stories that matter to you.",
        url: "#"
      },
      {
        title: "Opinion: The Changing Landscape of News Media",
        description: "Analysis of how digital transformation is reshaping how we consume and understand news.",
        url: "#"
      }
    ];
  }
  
  if (lowerQuery.includes('recipe') || lowerQuery.includes('food') || lowerQuery.includes('cook')) {
    return [
      {
        title: "Easy Recipes for Beginners - Food Network",
        description: "Simple, delicious recipes perfect for those just starting their cooking journey.",
        url: "#"
      },
      {
        title: "Healthy Meal Ideas - Nutrition Guide",
        description: "Nutritious and tasty recipes to support your wellness goals and dietary preferences.",
        url: "#"
      },
      {
        title: "International Cuisine: Explore Flavors from Around the World",
        description: "Authentic recipes from different cultures, bringing global cuisine to your kitchen.",
        url: "#"
      }
    ];
  }
  
  // Generic results for other queries
  return [
    {
      title: `${query} - Comprehensive Guide`,
      description: `Learn everything you need to know about ${query} with our detailed resources and expert insights.`,
      url: "#"
    },
    {
      title: `Understanding ${query} - Educational Platform`,
      description: `Explore the fundamentals and advanced concepts related to ${query} through interactive learning modules.`,
      url: "#"
    },
    {
      title: `Latest Developments in ${query} - Research Center`,
      description: `Stay updated on recent advancements, studies, and innovations in the field of ${query}.`,
      url: "#"
    }
  ];
};
