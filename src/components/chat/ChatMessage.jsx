
import React from 'react';
import WeatherResult from '../WeatherResult';

const ChatMessage = ({ message }) => {
  return (
    <div className={`${message.sender}-message-container`}>
      <div className={`${message.sender}-message`}>
        {message.text}
        {message.type === 'weather' && message.weatherData && (
          <WeatherResult weatherData={message.weatherData} />
        )}
        <div className="message-time">{message.time}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
