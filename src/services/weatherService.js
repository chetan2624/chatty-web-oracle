
import { useState, useEffect } from 'react';

// Extracts city name from user message
export const extractCityFromMessage = (message) => {
  // Simple regex to extract city names after "weather in", "temperature in", etc.
  const patterns = [/weather in ([a-zA-Z\s]+)/i, /temperature in ([a-zA-Z\s]+)/i];
  
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
  
  return 'New York'; // Default city if no city found
};

// Gets mock weather data for a city
export const getWeatherForCity = async (city) => {
  // This would normally be an API call to a weather service
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate semi-random weather data
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Thunderstorm', 'Snowy'];
      const icons = ['☀️', '⛅', '☁️', '🌧️', '⛈️', '❄️'];
      
      const randomIndex = Math.floor(Math.random() * conditions.length);
      const temp = Math.floor(Math.random() * 30) + 5; // Random temp between 5-35°C
      
      const weatherData = {
        location: city,
        temperature: temp,
        condition: conditions[randomIndex],
        humidity: Math.floor(Math.random() * 50) + 30, // Random humidity 30-80%
        windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind speed 5-25 km/h
        icon: icons[randomIndex],
        tips: [
          "Don't forget to stay hydrated!",
          "Check the forecast before planning outdoor activities.",
          "Dress appropriately for the temperature."
        ]
      };
      
      resolve(weatherData);
    }, 1000); // Simulate API delay
  });
};
