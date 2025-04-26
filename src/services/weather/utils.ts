
import { AccuWeatherCondition } from './types';

export const extractCityFromMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  const patterns = [
    'weather in ',
    'weather at ',
    'weather for ',
    'weather of ',
    'temperature in ',
    'temperature at ',
    'temperature of ',
    'how is the weather in ',
    'what\'s the weather in ',
    'what is the weather in '
  ];

  for (const pattern of patterns) {
    if (lowerMessage.includes(pattern)) {
      const parts = message.split(pattern);
      if (parts.length > 1) {
        return parts[1].trim().replace(/[?.!,;:]/g, '');
      }
    }
  }
  
  const words = lowerMessage.split(/\s+/);
  if (words.length > 0) {
    const lastWord = words[words.length - 1].replace(/[?.!,;:]/g, '');
    const commonWords = ['weather', 'temperature', 'check', 'know', 'tell', 'what', 'how', 'is', 'the'];
    if (!commonWords.includes(lastWord) && lastWord.length > 2) {
      return lastWord;
    }
  }
  
  return '';
};

export const getWeatherIcon = (iconNumber: number): string => {
  const iconMap: { [key: number]: string } = {
    1: '☀️',  // Sunny
    2: '☀️',  // Mostly Sunny
    3: '⛅',  // Partly Sunny
    4: '⛅',  // Intermittent Clouds
    5: '☁️',  // Hazy Sunshine
    6: '☁️',  // Mostly Cloudy
    7: '☁️',  // Cloudy
    8: '☁️',  // Dreary
    11: '🌫️', // Fog
    12: '🌧️', // Showers
    13: '🌦️', // Mostly Cloudy w/ Showers
    14: '🌦️', // Partly Sunny w/ Showers
    15: '⛈️', // T-Storms
    16: '⛈️', // Mostly Cloudy w/ T-Storms
    17: '⛈️', // Partly Sunny w/ T-Storms
    18: '🌧️', // Rain
    19: '🌨️', // Flurries
    20: '🌨️', // Mostly Cloudy w/ Flurries
    21: '🌨️', // Partly Sunny w/ Flurries
    22: '❄️', // Snow
    23: '❄️', // Mostly Cloudy w/ Snow
    24: '❄️', // Ice
    25: '🌧️', // Sleet
    26: '🌧️', // Freezing Rain
    29: '🌧️', // Rain and Snow
    30: '🌡️', // Hot
    31: '🌡️', // Cold
    32: '💨', // Windy
  };
  
  return iconMap[iconNumber] || '🌡️';
};

export const getWeatherTips = (condition: string, temperature: number): string[] => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('rain') || lowerCondition.includes('shower')) {
    return [
      "Don't forget your umbrella!",
      "Wear waterproof shoes if you're going outside.",
      "A raincoat might be better than an umbrella if it's windy."
    ];
  }
  
  if (lowerCondition.includes('snow') || lowerCondition.includes('flurries')) {
    return [
      "Wear warm, layered clothing.",
      "Make sure to wear insulated boots.",
      "Drive carefully if you need to go out."
    ];
  }
  
  if (lowerCondition.includes('sun') || lowerCondition.includes('hot')) {
    if (temperature > 25) {
      return [
        "Don't forget your sunscreen!",
        "Stay hydrated and drink plenty of water.",
        "Wear a hat if you'll be outside for long periods."
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
  
  if (lowerCondition.includes('storm')) {
    return [
      "Stay indoors if possible.",
      "Keep away from windows during severe weather.",
      "Have emergency supplies ready just in case."
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
  
  return [
    "Dress appropriately for the weather conditions.",
    "Check the forecast again if you're planning activities later.",
    "Stay comfortable and prepared!"
  ];
};
