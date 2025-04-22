export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  tips: string[];
}

// Free weather API URL
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';
const WEATHER_API_KEY = ''; // This would be your API key

// Extract city name from user message
export const extractCityFromMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Array of patterns to extract city names
  const patterns = [
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
  ];

  // Try each pattern
  for (const pattern of patterns) {
    if (lowerMessage.includes(pattern)) {
      const parts = message.split(pattern);
      if (parts.length > 1) {
        return parts[1].trim().replace(/[?.!,;:]/g, '');
      }
    }
  }
  
  // Fallback: Direct city mention extraction
  const directCityPattern = /\b(?:in|at|for|of)\s+([a-zA-Z\s]+)(?:\s|$|[?.!,;:])/i;
  const directMatch = lowerMessage.match(directCityPattern);
  if (directMatch && directMatch[1]) {
    return directMatch[1].trim();
  }
  
  // Last word fallback
  const words = lowerMessage.split(/\s+/);
  if (words.length > 0) {
    const lastWord = words[words.length - 1].replace(/[?.!,;:]/g, '');
    const commonWords = ['weather', 'temperature', 'check', 'know', 'tell', 'what', 'how', 'is', 'the', 'me', 'about', 'current', 'conditions', 'forecast', 'report'];
    if (!commonWords.includes(lastWord) && lastWord.length > 2) {
      return lastWord;
    }
  }
  
  return '';
};

// Function to get weather tips based on condition
const getWeatherTips = (condition: string, temperature: number): string[] => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('rain') || lowerCondition.includes('shower')) {
    return [
      "Don't forget your umbrella!",
      "Wear waterproof shoes if you're going outside.",
      "A raincoat might be better than an umbrella if it's windy."
    ];
  }
  
  if (lowerCondition.includes('snow')) {
    return [
      "Wear warm, layered clothing.",
      "Make sure to wear insulated boots.",
      "Drive carefully if you need to go out."
    ];
  }
  
  if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
    if (temperature > 25) {
      return [
        "Don't forget your sunscreen!",
        "Stay hydrated and drink plenty of water.",
        "Wear a hat if you'll be outside for long periods."
      ];
    } else {
      return [
        "It's a beautiful day to be outside!",
        "Great day for outdoor activities.",
        "Enjoy the sunshine!"
      ];
    }
  }
  
  if (lowerCondition.includes('cloud')) {
    return [
      "It might get brighter or darker throughout the day.",
      "No need for sunglasses today!",
      "A light jacket might be useful if it gets cool."
    ];
  }
  
  if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
    return [
      "Drive carefully - use fog lights if needed.",
      "Allow extra time for any commute.",
      "Wear visible clothing if walking outside."
    ];
  }
  
  if (temperature < 0) {
    return [
      "Dress very warmly with multiple layers.",
      "Cover exposed skin to prevent frostbite.",
      "Be cautious of ice on roads and pavements."
    ];
  }
  
  if (temperature > 30) {
    return [
      "Stay hydrated and drink plenty of water.",
      "Try to stay in shade during peak sun hours.",
      "Consider indoor activities during the hottest part of the day."
    ];
  }
  
  // Generic tips
  return [
    "Dress appropriately for the weather conditions.",
    "Check the forecast again if you're planning activities later.",
    "Stay comfortable and prepared!"
  ];
};

// Mock weather data for demonstration since we can't include actual API keys
const mockWeatherData = (city: string): WeatherData => {
  // Generate semi-random weather data based on city name
  // This is just for demonstration purposes
  const cityHash = [...city.toLowerCase()].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const conditions = [
    "Sunny", "Partly cloudy", "Cloudy", 
    "Light rain", "Moderate rain", "Heavy rain",
    "Thunderstorm", "Snow", "Mist"
  ];
  
  const icons = [
    "☀️", "⛅", "☁️", 
    "🌦️", "🌧️", "⛈️",
    "🌩️", "❄️", "🌫️"
  ];
  
  const conditionIndex = cityHash % conditions.length;
  const temperature = 15 + (cityHash % 25); // Temperature between 15-40 degrees
  const humidity = 30 + (cityHash % 60); // Humidity between 30-90%
  const windSpeed = 5 + (cityHash % 20); // Wind speed between 5-25 km/h
  
  return {
    location: city,
    temperature,
    condition: conditions[conditionIndex],
    humidity,
    windSpeed,
    icon: icons[conditionIndex],
    tips: getWeatherTips(conditions[conditionIndex], temperature)
  };
};

// Get weather data for a city
export const getWeatherForCity = async (city: string): Promise<WeatherData> => {
  if (!city) {
    throw new Error("City name is required");
  }
  
  try {
    // For demo purposes, we'll use mock data
    // In a real app, you would make an API call like this:
    /*
    if (!WEATHER_API_KEY) {
      throw new Error("Weather API key is not configured");
    }
    
    const response = await fetch(
      `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      icon: getIconForCondition(data.current.condition.code),
      tips: getWeatherTips(data.current.condition.text, data.current.temp_c)
    };
    */
    
    // Using mock data for demo
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockWeatherData(city));
      }, 1000);
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
