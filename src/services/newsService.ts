
export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

// Free news API URL
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = ''; // This would be your API key

// Get latest news headlines
export const getLatestNews = async (category: string = 'general'): Promise<NewsArticle[]> => {
  try {
    // In a real application, you would make an API call like this:
    /*
    if (!NEWS_API_KEY) {
      throw new Error("News API key is not configured");
    }
    
    const response = await fetch(
      `${NEWS_API_URL}?country=us&category=${category}&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.articles.slice(0, 5).map((article: any) => ({
      title: article.title,
      description: article.description || 'No description available',
      url: article.url,
      source: article.source.name,
      publishedAt: new Date(article.publishedAt).toLocaleString()
    }));
    */
    
    // Using mock data for demo
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockNewsData(category));
      }, 1000);
    });
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};

// Mock news data for demonstration
const mockNewsData = (category: string): NewsArticle[] => {
  const now = new Date();
  const categories: Record<string, NewsArticle[]> = {
    'general': [
      {
        title: "Global Summit Addresses Climate Change Concerns",
        description: "World leaders gathered to discuss urgent action on climate change, pledging significant carbon reductions by 2030.",
        url: "#",
        source: "World News",
        publishedAt: new Date(now.getTime() - 3600000).toLocaleString()
      },
      {
        title: "New Medical Breakthrough in Cancer Treatment",
        description: "Researchers announce promising results from clinical trials of a new targeted therapy for certain types of cancer.",
        url: "#",
        source: "Health Today",
        publishedAt: new Date(now.getTime() - 7200000).toLocaleString()
      },
      {
        title: "Tech Giants Announce Collaboration on AI Ethics",
        description: "Major technology companies form coalition to establish standards for responsible artificial intelligence development.",
        url: "#",
        source: "Tech Insights",
        publishedAt: new Date(now.getTime() - 10800000).toLocaleString()
      }
    ],
    'technology': [
      {
        title: "Revolutionary Quantum Computer Reaches New Milestone",
        description: "Scientists achieve quantum supremacy with a processor capable of calculations impossible for traditional supercomputers.",
        url: "#",
        source: "Tech Review",
        publishedAt: new Date(now.getTime() - 2700000).toLocaleString()
      },
      {
        title: "New Smartphone Features Advanced AI Capabilities",
        description: "The latest flagship device introduces on-device AI processing that enhances privacy while delivering smart features.",
        url: "#",
        source: "Gadget World",
        publishedAt: new Date(now.getTime() - 5400000).toLocaleString()
      },
      {
        title: "Electric Vehicle Startup Unveils Groundbreaking Battery Technology",
        description: "A promising new battery technology claims to double range and reduce charging time for electric vehicles.",
        url: "#",
        source: "Auto Innovation",
        publishedAt: new Date(now.getTime() - 8100000).toLocaleString()
      }
    ],
    'business': [
      {
        title: "Global Markets Respond to Central Bank Announcements",
        description: "Stock markets fluctuate as major central banks signal changes to interest rate policies.",
        url: "#",
        source: "Financial Times",
        publishedAt: new Date(now.getTime() - 3300000).toLocaleString()
      },
      {
        title: "Sustainable Energy Investments Reach Record High",
        description: "Investment in renewable energy projects surpasses fossil fuels for the first time as companies prioritize sustainability.",
        url: "#",
        source: "Business Report",
        publishedAt: new Date(now.getTime() - 6600000).toLocaleString()
      },
      {
        title: "Major Retail Chain Announces Expansion Plan",
        description: "Popular retailer unveils strategy to open 500 new locations over the next five years, creating thousands of jobs.",
        url: "#",
        source: "Market Watch",
        publishedAt: new Date(now.getTime() - 9900000).toLocaleString()
      }
    ]
  };
  
  // Return the category-specific news, or general news if the category doesn't exist
  return categories[category] || categories['general'];
};
