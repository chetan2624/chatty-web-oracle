
import React from 'react';
import WeatherResult from '../WeatherResult';
import NewsResult from '../NewsResult';

const ChatMessage = ({ message }) => {
  return (
    <div className={`${message.sender}-message-container`}>
      <div className={`${message.sender}-message`}>
        {message.text}
        
        {message.type === 'weather' && message.weatherData && (
          <WeatherResult weatherData={message.weatherData} />
        )}
        
        {message.type === 'news' && message.newsData && (
          <NewsResult newsData={message.newsData} />
        )}
        
        <div className="message-time">{message.time}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
