
import React from 'react';
import ChatMessage from './ChatMessage';

const MessageList = ({ messages, isLoading }) => {
  return (
    <>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="bot-message-container">
          <div className="bot-message">
            <div className="typing-animation">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageList;
