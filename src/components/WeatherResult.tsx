
import React from 'react';
import { WeatherData } from '@/services/weatherService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, CloudSun, CloudRain, Snowflake, Thermometer, Wind } from 'lucide-react';

interface WeatherResultProps {
  weatherData: WeatherData;
}

const WeatherResult: React.FC<WeatherResultProps> = ({ weatherData }) => {
  // Function to get the appropriate icon component based on condition
  const getWeatherIcon = () => {
    const condition = weatherData.condition.toLowerCase();
    
    if (condition.includes('sun') || condition.includes('clear')) {
      return <Sun className="h-10 w-10 text-amber-500" />;
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
      return <CloudSun className="h-10 w-10 text-gray-500" />;
    } else if (condition.includes('rain') || condition.includes('shower') || condition.includes('drizzle')) {
      return <CloudRain className="h-10 w-10 text-blue-500" />;
    } else if (condition.includes('snow') || condition.includes('sleet')) {
      return <Snowflake className="h-10 w-10 text-sky-300" />;
    } else {
      return <Thermometer className="h-10 w-10 text-red-500" />;
    }
  };

  return (
    <Card className="mt-4 overflow-hidden border-none shadow-lg">
      <CardHeader className="p-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-medium">{weatherData.location}</span>
          <div className="flex items-center gap-2">
            {weatherData.icon}
            {getWeatherIcon()}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="bg-gradient-to-b from-blue-50 to-white p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-4xl font-bold text-slate-800">{weatherData.temperature}°C</p>
              <p className="text-gray-600 font-medium">{weatherData.condition}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600">💧</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Humidity</p>
                  <p className="font-medium">{weatherData.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Wind className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Wind</p>
                  <p className="font-medium">{weatherData.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-700 mb-3">Tips:</h4>
            <div className="space-y-2">
              {weatherData.tips.map((tip, index) => (
                <div key={index} className="flex items-start bg-blue-50 rounded-md p-2">
                  <div className="bg-blue-100 rounded-full p-1 mr-2 text-blue-700">💡</div>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherResult;
