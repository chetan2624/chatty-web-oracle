
import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ inputMessage, setInputMessage, handleSendMessage, isLoading }) => {
  return (
    <div className="input-area">
      <input
        type="text"
        className="message-input"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        placeholder="Type a message..."
      />
      <button
        className="send-btn"
        onClick={handleSendMessage}
        disabled={!inputMessage.trim() || isLoading}
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
