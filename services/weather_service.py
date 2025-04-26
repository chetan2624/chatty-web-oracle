
import re
import time
import random

class WeatherData:
    def __init__(self, location, temperature, condition, humidity, wind_speed, icon, tips):
        self.location = location
        self.temperature = temperature
        self.condition = condition
        self.humidity = humidity
        self.wind_speed = wind_speed
        self.icon = icon
        self.tips = tips

def extract_city_from_message(message):
    """Extract the city name from a user message"""
    lower_message = message.lower()
    
    # Array of patterns to extract city names
    patterns = [
        'weather in ',
        'weather at ',
        'weather for ',
        'weather of ',
        'temperature in ',
        'temperature at ',
        'temperature of ',
        'how is the weather in ',
        'check weather of ',
        'check the weather of ',
        'check weather in ',
        'check the weather in ',
        'what is the weather in ',
        'what is the weather of ',
        'what\'s the weather in ',
        'what\'s the weather of ',
        'tell me about the weather in ',
        'tell me about the weather of ',
        'what is the current weather in ',
        'what are the weather conditions in ',
        'weather report for ',
        'weather forecast for ',
        'current temperature in ',
        'temperature right now in '
    ]

    # Try each pattern
    for pattern in patterns:
        if pattern in lower_message:
            parts = message.split(pattern)
            if len(parts) > 1:
                return parts[1].strip().rstrip('?.!,;:')
    
    # Fallback: Direct city mention extraction
    direct_city_pattern = r'\b(?:in|at|for|of)\s+([a-zA-Z\s]+)(?:\s|$|[?.!,;:])'
    direct_match = re.search(direct_city_pattern, lower_message, re.I)
    if direct_match and direct_match.group(1):
        return direct_match.group(1).strip()
    
    # Last word fallback
    words = lower_message.split()
    if words:
        last_word = words[-1].rstrip('?.!,;:')
        common_words = ['weather', 'temperature', 'check', 'know', 'tell', 'what', 'how', 'is', 'the', 'me', 'about', 'current', 'conditions', 'forecast', 'report']
        if last_word not in common_words and len(last_word) > 2:
            return last_word
    
    return ''

def get_weather_tips(condition, temperature):
    """Get weather tips based on condition and temperature"""
    lower_condition = condition.lower()
    
    if 'rain' in lower_condition or 'shower' in lower_condition:
        return [
            "Don't forget your umbrella!",
            "Wear waterproof shoes if you're going outside.",
            "A raincoat might be better than an umbrella if it's windy."
        ]
    
    if 'snow' in lower_condition:
        return [
            "Wear warm, layered clothing.",
            "Make sure to wear insulated boots.",
            "Drive carefully if you need to go out."
        ]
    
    if 'sun' in lower_condition or 'clear' in lower_condition:
        if temperature > 25:
            return [
                "Don't forget your sunscreen!",
                "Stay hydrated and drink plenty of water.",
                "Wear a hat if you'll be outside for long periods."
            ]
        else:
            return [
                "It's a beautiful day to be outside!",
                "Great day for outdoor activities.",
                "Enjoy the sunshine!"
            ]
    
    if 'cloud' in lower_condition:
        return [
            "It might get brighter or darker throughout the day.",
            "No need for sunglasses today!",
            "A light jacket might be useful if it gets cool."
        ]
    
    if 'fog' in lower_condition or 'mist' in lower_condition:
        return [
            "Drive carefully - use fog lights if needed.",
            "Allow extra time for any commute.",
            "Wear visible clothing if walking outside."
        ]
    
    if temperature < 0:
        return [
            "Dress very warmly with multiple layers.",
            "Cover exposed skin to prevent frostbite.",
            "Be cautious of ice on roads and pavements."
        ]
    
    if temperature > 30:
        return [
            "Stay hydrated and drink plenty of water.",
            "Try to stay in shade during peak sun hours.",
            "Consider indoor activities during the hottest part of the day."
        ]
    
    # Generic tips
    return [
        "Dress appropriately for the weather conditions.",
        "Check the forecast again if you're planning activities later.",
        "Stay comfortable and prepared!"
    ]

def mock_weather_data(city):
    """Generate mock weather data for a city"""
    # Generate semi-random weather data based on city name
    city_hash = sum(ord(c) for c in city.lower())
    
    conditions = [
        "Sunny", "Partly cloudy", "Cloudy", 
        "Light rain", "Moderate rain", "Heavy rain",
        "Thunderstorm", "Snow", "Mist"
    ]
    
    icons = [
        "☀️", "⛅", "☁️", 
        "🌦️", "🌧️", "⛈️",
        "🌩️", "❄️", "🌫️"
    ]
    
    condition_index = city_hash % len(conditions)
    temperature = 15 + (city_hash % 25)  # Temperature between 15-40 degrees
    humidity = 30 + (city_hash % 60)     # Humidity between 30-90%
    wind_speed = 5 + (city_hash % 20)    # Wind speed between 5-25 km/h
    
    return {
        "location": city,
        "temperature": temperature,
        "condition": conditions[condition_index],
        "humidity": humidity,
        "windSpeed": wind_speed,
        "icon": icons[condition_index],
        "tips": get_weather_tips(conditions[condition_index], temperature)
    }

def get_weather_for_city(city):
    """Get weather data for a city"""
    if not city:
        raise Exception("City name is required")
    
    try:
        # In a real app, you would make an API call to a weather service
        # For demonstration, we'll use mock data
        time.sleep(1)  # Simulate API delay
        return mock_weather_data(city)
    
    except Exception as e:
        print(f"Error fetching weather data: {str(e)}")
        raise e
