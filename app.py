
from flask import Flask, render_template, request, jsonify
import time
import re
import random
from services.weather_service import extract_city_from_message, get_weather_for_city
from services.news_service import get_latest_news
from services.search_service import extract_search_query_from_message, search_for_information
from services.ai_service import get_ai_response

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Process chat messages and return appropriate responses"""
    data = request.json
    message = data.get('message', '')
    
    if not message.strip():
        return jsonify({"error": "Message is required"}), 400
    
    try:
        # Get AI response to determine intent
        ai_response = get_ai_response(message)
        response_type = ai_response["type"]
        
        # Initialize response
        response = {
            "id": str(int(time.time() * 1000)),
            "message": ai_response["text"],
            "type": "bot",
            "contentType": "text",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
        }
        
        # Process based on intent type
        if response_type == "weather":
            city = extract_city_from_message(message)
            if city:
                weather_data = get_weather_for_city(city)
                response["message"] = f"Here's the current weather in {weather_data['location']}:"
                response["contentType"] = "weather"
                response["weatherData"] = weather_data
            else:
                response["message"] = "I'd be happy to check the weather for you. Could you specify which city?"
                
        elif response_type == "news":
            news_data = get_latest_news()
            response["message"] = "Here are the latest headlines:"
            response["contentType"] = "news"
            response["newsData"] = news_data
            
        elif response_type == "search":
            query = extract_search_query_from_message(message)
            search_data = search_for_information(query)
            response["message"] = f"Here's what I found for \"{query}\":"
            response["contentType"] = "search"
            response["searchData"] = search_data
            
        return jsonify(response)
        
    except Exception as e:
        print(f"Error processing message: {str(e)}")
        return jsonify({
            "id": str(int(time.time() * 1000)),
            "message": "I'm having trouble processing your request. Please try again later.",
            "type": "bot",
            "contentType": "text",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
