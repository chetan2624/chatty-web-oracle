
import React from 'react';
import { Bot } from 'lucide-react';

const ChatHeader = ({ username }) => {
  return (
    <div className="chat-header">
      <div className="chat-avatar">
        <Bot />
      </div>
      <h2>AI Assistant</h2>
      <div className="online-indicator"></div>
      <div className="user-info">
        <span className="user-name">{username}</span>
      </div>
    </div>
  );
};

export default ChatHeader;
