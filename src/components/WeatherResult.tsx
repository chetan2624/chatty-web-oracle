
import React from 'react';
import { WeatherData } from '@/services/weatherService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherResultProps {
  weatherData: WeatherData;
}

const WeatherResult: React.FC<WeatherResultProps> = ({ weatherData }) => {
  return (
    <Card className="mt-4 weather-result p-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4">
        <CardTitle className="flex items-center justify-between">
          <span>Weather in {weatherData.location}</span>
          <span className="text-3xl">{weatherData.icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-gray-600">{weatherData.condition}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Humidity: {weatherData.humidity}%</p>
            <p className="text-gray-600">Wind: {weatherData.windSpeed} km/h</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Tips:</h4>
          <ul className="space-y-1 text-sm">
            {weatherData.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherResult;
