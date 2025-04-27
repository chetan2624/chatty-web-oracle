
import { useState, useEffect } from 'react';

// Extracts city name from user message with improved detection
export const extractCityFromMessage = (message) => {
  // Simple regex to extract city names after "weather in", "temperature in", etc.
  const patterns = [
    /weather in ([a-zA-Z\s]+)/i,
    /temperature in ([a-zA-Z\s]+)/i,
    /weather of ([a-zA-Z\s]+)/i, 
    /temperature of ([a-zA-Z\s]+)/i,
    /weather at ([a-zA-Z\s]+)/i,
    /temperature at ([a-zA-Z\s]+)/i,
    /weather for ([a-zA-Z\s]+)/i,
    /temperature for ([a-zA-Z\s]+)/i,
    /how is the weather in ([a-zA-Z\s]+)/i,
    /how is the temperature in ([a-zA-Z\s]+)/i,
    /check weather of ([a-zA-Z\s]+)/i,
    /check temperature of ([a-zA-Z\s]+)/i,
    /check the weather in ([a-zA-Z\s]+)/i,
    /check the weather of ([a-zA-Z\s]+)/i,
    /what is the weather in ([a-zA-Z\s]+)/i,
    /what is the weather of ([a-zA-Z\s]+)/i,
    /current weather in ([a-zA-Z\s]+)/i,
    /current temperature in ([a-zA-Z\s]+)/i
  ];
  
  // Try each pattern to find a match
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // Fallback: try to find any city name after "in" or "of"
  const inMatch = message.match(/(?:in|of) ([a-zA-Z\s]+)(?:[,.\s]|$)/i);
  if (inMatch && inMatch[1]) {
    return inMatch[1].trim();
  }
  
  // Extract the last word if it might be a city name
  const words = message.split(' ');
  if (words.length > 0) {
    const possibleCity = words[words.length - 1].trim().replace(/[.,!?]$/, '');
    // Only use it if it's not one of these common words
    const commonWords = ['weather', 'temperature', 'hot', 'cold', 'warm', 'cool', 'today', 'tomorrow', 'now', 'forecast', 'report', 'check', 'know', 'tell', 'me', 'the', 'show'];
    if (!commonWords.includes(possibleCity.toLowerCase()) && possibleCity.length > 2) {
      return possibleCity;
    }
  }
  
  return null; // Return null if no city is found
};

// City-specific temperature data for more accurate forecasts
const cityTemperatures = {
  // Indian cities
  'mumbai': { min: 24, max: 34, humid: true, coastal: true },
  'delhi': { min: 18, max: 40, humid: false, dusty: true },
  'bangalore': { min: 20, max: 30, humid: false, pleasant: true },
  'kolkata': { min: 23, max: 36, humid: true, coastal: true },
  'chennai': { min: 24, max: 35, humid: true, coastal: true },
  'hyderabad': { min: 22, max: 38, humid: false, inland: true },
  'pune': { min: 20, max: 35, humid: false, pleasant: true },
  'ahmedabad': { min: 22, max: 40, humid: false, hot: true },
  'jaipur': { min: 20, max: 40, humid: false, dry: true },
  'lucknow': { min: 19, max: 38, humid: false, inland: true },
  'indore': { min: 21, max: 39, humid: false, inland: true },
  
  // International cities
  'new york': { min: 5, max: 25, humid: true, coastal: true },
  'london': { min: 4, max: 22, humid: true, rainy: true },
  'tokyo': { min: 8, max: 28, humid: true, coastal: true },
  'paris': { min: 5, max: 24, humid: false, temperate: true },
  'dubai': { min: 25, max: 45, humid: false, desert: true },
  'singapore': { min: 25, max: 32, humid: true, tropical: true }
};

// Gets weather data for a city with more accurate data
export const getWeatherForCity = async (city) => {
  if (!city) {
    throw new Error('City name is required');
  }
  
  // Normalize city name for lookup
  const normalizedCity = city.toLowerCase().trim();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate weather data using a combination of deterministic approach and city-specific data
      const cityHash = normalizedCity.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
      const cityData = cityTemperatures[normalizedCity] || {
        min: 15, 
        max: 30, 
        humid: (cityHash % 2 === 0)
      };
      
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Moderate Rain', 'Thunderstorm', 'Snowy', 'Foggy', 'Windy', 'Clear'];
      const icons = ['☀️', '⛅', '☁️', '🌦️', '🌧️', '⛈️', '❄️', '🌫️', '💨', '🌞'];
      
      // More deterministic condition selection
      const date = new Date();
      const dayOfMonth = date.getDate();
      const monthFactor = date.getMonth() + 1;
      
      // Create a more deterministic but varied index
      const seasonalIndex = (cityHash + (dayOfMonth * monthFactor)) % conditions.length;
      const condition = conditions[seasonalIndex];
      const icon = icons[seasonalIndex];
      
      // More realistic temperature calculation based on city-specific data
      const tempRange = cityData.max - cityData.min;
      const tempBase = cityData.min + (((cityHash + dayOfMonth) % 100) / 100) * tempRange;
      const temp = Math.floor(tempBase);
      
      // Humidity based on city characteristics
      const humidity = cityData.humid ? 60 + (cityHash % 30) : 30 + (cityHash % 30);
      
      // Wind speed with some variation
      const windSpeed = 5 + (cityHash % 15);
      
      // Generate weather tips based on condition and temperature
      let tips = [];
      
      if (condition === 'Sunny' || condition === 'Clear') {
        if (temp > 30) {
          tips = [
            "Stay hydrated and drink plenty of water",
            "Use sunscreen to protect your skin",
            "Try to stay in shade during peak hours"
          ];
        } else {
          tips = [
            "Enjoy the beautiful weather outside!",
            "Great day for outdoor activities",
            "Don't forget your sunglasses"
          ];
        }
      } else if (condition === 'Partly Cloudy') {
        tips = [
          "Great day for outdoor activities",
          "UV rays can still be strong, consider sunscreen",
          "Perfect weather for a walk"
        ];
      } else if (condition === 'Cloudy') {
        tips = [
          "May be a good day for indoor activities",
          "The temperature might fluctuate, dress in layers",
          "There's low chance of precipitation"
        ];
      } else if (condition.includes('Rain')) {
        tips = [
          "Don't forget your umbrella!",
          "Wear waterproof shoes if you're going outside",
          "Drive carefully as roads might be slippery"
        ];
      } else if (condition === 'Thunderstorm') {
        tips = [
          "Stay indoors if possible",
          "Avoid open areas and tall isolated objects",
          "Keep electronic devices unplugged"
        ];
      } else if (condition === 'Snowy') {
        tips = [
          "Dress warmly with multiple layers",
          "Drive carefully on icy roads",
          "Keep indoor heating at a comfortable level"
        ];
      } else if (condition === 'Foggy') {
        tips = [
          "Drive slowly and use fog lights",
          "Allow extra time for travel",
          "Be cautious of reduced visibility"
        ];
      } else if (condition === 'Windy') {
        tips = [
          "Secure loose objects outdoors",
          "Be careful with umbrellas on windy streets",
          "Watch out for tree branches and debris"
        ];
      }
      
      // Create final weather data object
      const weatherData = {
        location: city,
        temperature: temp,
        condition: condition,
        humidity: humidity,
        windSpeed: windSpeed,
        icon: icon,
        tips: tips
      };
      
      resolve(weatherData);
    }, 1000); // Simulate API delay
  });
};
