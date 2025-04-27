
import React from 'react';

const WeatherResult = ({ weatherData }) => {
  if (!weatherData) return null;
  
  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="weather-icon">{weatherData.icon}</div>
        <div className="weather-location">{weatherData.location}</div>
      </div>
      
      <div className="weather-temp">{weatherData.temperature}°C</div>
      <div className="weather-condition">{weatherData.condition}</div>
      
      <div className="weather-details">
        <div className="weather-detail">
          <div>Humidity</div>
          <div>{weatherData.humidity}%</div>
        </div>
        <div className="weather-detail">
          <div>Wind</div>
          <div>{weatherData.windSpeed} km/h</div>
        </div>
      </div>
      
      <div className="weather-tips">
        <div className="weather-tip">
          <span className="tip-icon">💡</span>
          {weatherData.tips[0]}
        </div>
      </div>
    </div>
  );
};

export default WeatherResult;
