
import time
import random
import re

def extract_search_query_from_message(message):
    """Extract search query from user message"""
    lower_message = message.lower()
    
    if 'search for ' in lower_message:
        return message.split('search for ')[1].strip()
    
    if 'search ' in lower_message:
        return message.split('search ')[1].strip()
    
    if 'look up ' in lower_message:
        return message.split('look up ')[1].strip()
    
    if 'find ' in lower_message:
        return message.split('find ')[1].strip()
    
    if 'what is ' in lower_message:
        return message.split('what is ')[1].strip()
    
    if 'who is ' in lower_message:
        return message.split('who is ')[1].strip()
    
    if 'how to ' in lower_message:
        return message.split('how to ')[1].strip()
    
    # If no pattern matches, use the whole message as a search query
    return message.strip()

def search_for_information(query):
    """Search for information using a search query"""
    if not query:
        raise Exception("Search query is required")
    
    try:
        # In a real app, you would make an API call to a search API
        # For this demo, we'll simulate search results
        time.sleep(1)  # Simulate API delay
        return generate_mock_search_results(query)
    except Exception as e:
        print(f"Error searching for information: {str(e)}")
        raise e

def generate_mock_search_results(query):
    """Generate mock search results based on the query"""
    lower_query = query.lower()
    
    # Custom results for specific queries
    if 'virat kohli' in lower_query or 'kohli' in lower_query:
        return [
            {
                "title": "Virat Kohli - Official Cricket Profile - ICC",
                "description": "Comprehensive profile of Virat Kohli, including his career statistics, achievements, and highlights from international cricket.",
                "url": "https://www.icc-cricket.com/rankings/mens/player-rankings/test/batting"
            },
            {
                "title": "Virat Kohli - Wikipedia",
                "description": "Detailed biography of Virat Kohli, Indian cricketer and former captain of the Indian national cricket team.",
                "url": "https://en.wikipedia.org/wiki/Virat_Kohli"
            },
            {
                "title": "Virat Kohli's Career Statistics and Records",
                "description": "Complete statistical analysis of Virat Kohli's cricket career, including records, centuries, and achievements.",
                "url": "https://www.espncricinfo.com/player/virat-kohli-253802"
            }
        ]
    
    if 'weather' in lower_query:
        return [
            {
                "title": "Current Weather Conditions - Weather Service",
                "description": "Get the latest weather forecast, hourly updates, and severe weather alerts for your location.",
                "url": "https://weather.com"
            },
            {
                "title": "Weather Radar & Maps - Weather Tracker",
                "description": "Interactive weather maps show radar, temperature, precipitation, satellite views and more.",
                "url": "https://www.accuweather.com"
            },
            {
                "title": "Understanding Weather Patterns - Weather Education",
                "description": "Learn about different weather patterns, climate zones, and meteorological phenomena.",
                "url": "https://www.noaa.gov/weather"
            }
        ]
    
    if 'news' in lower_query:
        return [
            {
                "title": "Latest Breaking News - News Network",
                "description": "Stay informed with the latest news and updates from around the world, covering politics, business, entertainment, and more.",
                "url": "https://news.google.com"
            },
            {
                "title": "Local and National Headlines - Daily News",
                "description": "Comprehensive coverage of local events and national stories that matter to you.",
                "url": "https://www.reuters.com"
            },
            {
                "title": "Opinion: The Changing Landscape of News Media",
                "description": "Analysis of how digital transformation is reshaping how we consume and understand news.",
                "url": "https://www.bbc.com/news"
            }
        ]
    
    if 'recipe' in lower_query or 'food' in lower_query or 'cook' in lower_query:
        return [
            {
                "title": "Easy Recipes for Beginners - Food Network",
                "description": "Simple, delicious recipes perfect for those just starting their cooking journey.",
                "url": "https://www.foodnetwork.com/recipes"
            },
            {
                "title": "Healthy Meal Ideas - Nutrition Guide",
                "description": "Nutritious and tasty recipes to support your wellness goals and dietary preferences.",
                "url": "https://www.allrecipes.com"
            },
            {
                "title": "International Cuisine: Explore Flavors from Around the World",
                "description": "Authentic recipes from different cultures, bringing global cuisine to your kitchen.",
                "url": "https://www.epicurious.com"
            }
        ]
    
    # Generic results with actual URLs for any other query
    return [
        {
            "title": f"{query} - Wikipedia",
            "description": f"Learn everything you need to know about {query} from Wikipedia, the free encyclopedia.",
            "url": f"https://en.wikipedia.org/wiki/Special:Search?search={query.replace(' ', '+')}"
        },
        {
            "title": f"Latest News about {query}",
            "description": f"Stay updated with the latest news and articles about {query} from reliable sources.",
            "url": f"https://news.google.com/search?q={query.replace(' ', '+')}"
        },
        {
            "title": f"{query} - Research and Academic Resources",
            "description": f"Explore academic papers, research articles, and scholarly content about {query}.",
            "url": f"https://scholar.google.com/scholar?q={query.replace(' ', '+')}"
        }
    ]
