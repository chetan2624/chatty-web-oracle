
import { WeatherData, AccuWeatherLocation, AccuWeatherCondition } from './weather/types';
import { getWeatherIcon, getWeatherTips, extractCityFromMessage } from './weather/utils';

export { extractCityFromMessage } from './weather/utils';
export type { WeatherData } from './weather/types';

const ACCUWEATHER_API_KEY = 'YOUR_API_KEY'; // Replace with your AccuWeather API key
const BASE_URL = 'http://dataservice.accuweather.com';

export const getWeatherForCity = async (city: string): Promise<WeatherData> => {
  if (!city) {
    throw new Error("City name is required");
  }

  try {
    // Step 1: Get location key
    const locationUrl = `${BASE_URL}/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${encodeURIComponent(city)}`;
    const locationResponse = await fetch(locationUrl);
    if (!locationResponse.ok) throw new Error('Location search failed');
    
    const locations: AccuWeatherLocation[] = await locationResponse.json();
    if (!locations.length) throw new Error('City not found');
    
    const location = locations[0];
    
    // Step 2: Get current conditions
    const conditionsUrl = `${BASE_URL}/currentconditions/v1/${location.Key}?apikey=${ACCUWEATHER_API_KEY}&details=true`;
    const conditionsResponse = await fetch(conditionsUrl);
    if (!conditionsResponse.ok) throw new Error('Weather data fetch failed');
    
    const conditions: AccuWeatherCondition[] = await conditionsResponse.json();
    if (!conditions.length) throw new Error('No weather data available');
    
    const currentCondition = conditions[0];
    
    // Transform data to our WeatherData format
    return {
      location: `${location.LocalizedName}, ${location.Country.LocalizedName}`,
      temperature: Math.round(currentCondition.Temperature.Metric.Value),
      condition: currentCondition.WeatherText,
      humidity: currentCondition.RelativeHumidity,
      windSpeed: Math.round(currentCondition.Wind.Speed.Metric.Value),
      icon: getWeatherIcon(currentCondition.WeatherIcon),
      tips: getWeatherTips(currentCondition.WeatherText, currentCondition.Temperature.Metric.Value)
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    
    // Fallback to mock data
    const lowerCaseCity = city.toLowerCase();
    const cityHash = [...lowerCaseCity].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
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
  }
};
