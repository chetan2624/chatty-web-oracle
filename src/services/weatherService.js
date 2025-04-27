
import { useState, useEffect } from 'react';

// Extracts city name from user message
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
    /check temperature of ([a-zA-Z\s]+)/i
  ];
  
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // Fallback: try to find any city name after "in"
  const inMatch = message.match(/in ([a-zA-Z\s]+)/i);
  if (inMatch && inMatch[1]) {
    return inMatch[1].trim();
  }
  
  // Extract the last word if it might be a city name
  const words = message.split(' ');
  if (words.length > 0) {
    const possibleCity = words[words.length - 1].trim();
    // Only use it if it's not one of these common words
    const commonWords = ['weather', 'temperature', 'hot', 'cold', 'warm', 'cool', 'today', 'tomorrow', 'now'];
    if (!commonWords.includes(possibleCity.toLowerCase()) && possibleCity.length > 2) {
      return possibleCity;
    }
  }
  
  return null; // Return null instead of default city if no city is found
};

// Gets weather data for a city
export const getWeatherForCity = async (city) => {
  if (!city) {
    throw new Error('City name is required');
  }
  
  // This would normally be an API call to a weather service
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate semi-random but consistent weather data for each city
      const cityHash = city.toLowerCase().split('').reduce((hash, char) => {
        return hash + char.charCodeAt(0);
      }, 0);
      
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Thunderstorm', 'Snowy', 'Foggy', 'Windy'];
      const icons = ['☀️', '⛅', '☁️', '🌧️', '⛈️', '❄️', '🌫️', '💨'];
      
      const randomIndex = cityHash % conditions.length;
      const tempBase = ((cityHash % 35) + 5); // Random temp between 5-40°C
      const temp = Math.floor(tempBase);
      const humidity = 30 + (cityHash % 50); // Random humidity 30-80%
      const windSpeed = 5 + (cityHash % 20); // Random wind speed 5-25 km/h
      
      const condition = conditions[randomIndex];
      
      // Generate weather tips based on condition
      let tips = [];
      
      if (condition === 'Sunny') {
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
      } else if (condition === 'Rainy') {
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
      
      const weatherData = {
        location: city,
        temperature: temp,
        condition: conditions[randomIndex],
        humidity: humidity,
        windSpeed: windSpeed,
        icon: icons[randomIndex],
        tips: tips
      };
      
      resolve(weatherData);
    }, 1000); // Simulate API delay
  });
};
