
import time
import datetime

def get_latest_news(category="general"):
    """Get the latest news headlines"""
    try:
        # In a real application, you would make an API call
        # For demonstration purposes, we'll use mock data
        time.sleep(1)  # Simulate API delay
        return mock_news_data(category)
    
    except Exception as e:
        print(f"Error fetching news data: {str(e)}")
        raise e

def mock_news_data(category):
    """Generate mock news data"""
    now = datetime.datetime.now()
    
    categories = {
        'general': [
            {
                "title": "Global Summit Addresses Climate Change Concerns",
                "description": "World leaders gathered to discuss urgent action on climate change, pledging significant carbon reductions by 2030.",
                "url": "#",
                "source": "World News",
                "publishedAt": (now - datetime.timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S")
            },
            {
                "title": "New Medical Breakthrough in Cancer Treatment",
                "description": "Researchers announce promising results from clinical trials of a new targeted therapy for certain types of cancer.",
                "url": "#",
                "source": "Health Today",
                "publishedAt": (now - datetime.timedelta(hours=2)).strftime("%Y-%m-%d %H:%M:%S")
            },
            {
                "title": "Tech Giants Announce Collaboration on AI Ethics",
                "description": "Major technology companies form coalition to establish standards for responsible artificial intelligence development.",
                "url": "#",
                "source": "Tech Insights",
                "publishedAt": (now - datetime.timedelta(hours=3)).strftime("%Y-%m-%d %H:%M:%S")
            }
        ],
        'technology': [
            {
                "title": "Revolutionary Quantum Computer Reaches New Milestone",
                "description": "Scientists achieve quantum supremacy with a processor capable of calculations impossible for traditional supercomputers.",
                "url": "#",
                "source": "Tech Review",
                "publishedAt": (now - datetime.timedelta(minutes=45)).strftime("%Y-%m-%d %H:%M:%S")
            },
            {
                "title": "New Smartphone Features Advanced AI Capabilities",
                "description": "The latest flagship device introduces on-device AI processing that enhances privacy while delivering smart features.",
                "url": "#",
                "source": "Gadget World",
                "publishedAt": (now - datetime.timedelta(hours=1.5)).strftime("%Y-%m-%d %H:%M:%S")
            },
            {
                "title": "Electric Vehicle Startup Unveils Groundbreaking Battery Technology",
                "description": "A promising new battery technology claims to double range and reduce charging time for electric vehicles.",
                "url": "#",
                "source": "Auto Innovation",
                "publishedAt": (now - datetime.timedelta(hours=2.25)).strftime("%Y-%m-%d %H:%M:%S")
            }
        ],
        'business': [
            {
                "title": "Global Markets Respond to Central Bank Announcements",
                "description": "Stock markets fluctuate as major central banks signal changes to interest rate policies.",
                "url": "#",
                "source": "Financial Times",
                "publishedAt": (now - datetime.timedelta(minutes=55)).strftime("%Y-%m-%d %H:%M:%S")
            },
            {
                "title": "Sustainable Energy Investments Reach Record High",
                "description": "Investment in renewable energy projects surpasses fossil fuels for the first time as companies prioritize sustainability.",
                "url": "#",
                "source": "Business Report",
                "publishedAt": (now - datetime.timedelta(hours=1.8)).strftime("%Y-%m-%d %H:%M:%S")
            },
            {
                "title": "Major Retail Chain Announces Expansion Plan",
                "description": "Popular retailer unveils strategy to open 500 new locations over the next five years, creating thousands of jobs.",
                "url": "#",
                "source": "Market Watch",
                "publishedAt": (now - datetime.timedelta(hours=2.75)).strftime("%Y-%m-%d %H:%M:%S")
            }
        ]
    }
    
    # Return the category-specific news, or general news if the category doesn't exist
    return categories.get(category, categories['general'])
