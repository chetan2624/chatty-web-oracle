
import time
import re

def get_ai_response(message):
    """
    Simulate response from an AI model based on the message content.
    Returns a dict with 'type' and 'text'.
    """
    # Simple rule-based responses
    time.sleep(1.5)  # Simulate API delay

    lowercase_message = message.lower()
    
    # Enhanced weather detection patterns
    if (
        # Original patterns
        ('weather' in lowercase_message and 
         (' in ' in lowercase_message or 
          ' at ' in lowercase_message or 
          ' for ' in lowercase_message)) or
        # Temperature patterns
        ('temperature' in lowercase_message and 
         (' in ' in lowercase_message or 
          ' at ' in lowercase_message or 
          ' of ' in lowercase_message)) or
        # Question patterns
        (lowercase_message.startswith('how') and 
         'weather' in lowercase_message) or
        # Direct check patterns
        lowercase_message.startswith('check weather') or
        lowercase_message.startswith('check the weather') or
        # New patterns for weather queries
        lowercase_message.startswith('what') and (
          'current weather' in lowercase_message or
          'weather like' in lowercase_message or
          'temperature like' in lowercase_message
        ) or
        lowercase_message.startswith('tell me') and (
          'about the weather' in lowercase_message or
          'weather forecast' in lowercase_message or
          'temperature' in lowercase_message
        ) or
        # Additional weather-related patterns
        'forecast for' in lowercase_message or
        'forecast in' in lowercase_message or
        'weather forecast' in lowercase_message or
        'weather report' in lowercase_message or
        'weather conditions' in lowercase_message or
        'weather updates' in lowercase_message or
        'current temperature' in lowercase_message or
        # New expanded patterns
        'weather of' in lowercase_message or
        'temperature of' in lowercase_message or
        'climate in' in lowercase_message or
        'climate of' in lowercase_message or
        'temperature at' in lowercase_message or
        'current weather in' in lowercase_message or
        'current weather of' in lowercase_message or
        'weather today in' in lowercase_message or
        'weather today at' in lowercase_message or
        'weather now in' in lowercase_message or
        'weather right now in' in lowercase_message or
        'tell me weather of' in lowercase_message or
        'tell me weather in' in lowercase_message or
        'show me weather' in lowercase_message or
        'show weather for' in lowercase_message or
        'get weather for' in lowercase_message or
        'what is temperature in' in lowercase_message or
        'what is temperature of' in lowercase_message or
        'how hot is it in' in lowercase_message or
        'how cold is it in' in lowercase_message or
        'weather status' in lowercase_message or
        'weather condition in' in lowercase_message or
        'weather condition of' in lowercase_message
    ):
        return {
            "type": "weather",
            "text": "I can check the weather for you.",
        }
    
    # News detection
    elif ('news' in lowercase_message or 
          ('what' in lowercase_message and ('happening' in lowercase_message or 'latest' in lowercase_message))):
        return {
            "type": "news",
            "text": "Here are the latest news headlines.",
        }
    
    # Search detection
    elif ('search' in lowercase_message or 
          'find' in lowercase_message or 
          'look up' in lowercase_message or 
          'what is' in lowercase_message or 
          'who is' in lowercase_message or 
          'how to' in lowercase_message):
        return {
            "type": "search",
            "text": "Let me search that for you.",
        }
    
    # General conversation
    else:
        return {
            "type": "general",
            "text": get_random_response(message),
        }

def get_random_response(message):
    """Generate a random response to simulate AI conversation"""
    responses = [
        f"I understand you're saying: \"{message}\". How can I help you further?",
        "Thanks for your message. Is there anything specific you'd like to know?",
        "I'm here to assist with weather, news, or general questions. What would you like to know?",
        "You can ask me about the weather, latest news, or search for information. How can I help?",
        "I'm your virtual assistant. I can provide weather updates, news, or answer general questions.",
        "I'm processing your request. For better results, try asking about weather, news, or specific information.",
    ]
    
    return responses[random.randint(0, len(responses) - 1)]
