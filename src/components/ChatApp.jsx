
import React, { useState, useRef, useEffect } from 'react';
import { Send, Robot } from 'lucide-react';
import '../styles/chat.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const chatBoxRef = useRef(null);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      time: getCurrentTime()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputMessage })
      });

      const data = await response.json();
      setMessages(prev => [...prev, {
        id: data.id,
        text: data.message,
        sender: 'bot',
        time: getCurrentTime(),
        type: data.contentType,
        data: data.contentType === 'weather' ? data.weatherData :
              data.contentType === 'news' ? data.newsData :
              data.contentType === 'search' ? data.searchData : null
      }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container chat-container">
      <div className="chat-header">
        <div className="chat-avatar">
          <Robot />
        </div>
        <h2>AI Assistant</h2>
        <div className="online-indicator"></div>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        <div className="bot-message-container">
          <div className="bot-message">
            Hello! How can I help you today?
            <div className="message-time">Just now</div>
          </div>
        </div>
        
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`${message.sender}-message-container`}
          >
            <div className={`${message.sender}-message`}>
              {message.text}
              <div className="message-time">{message.time}</div>
            </div>
          </div>
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
      </div>

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
    </div>
  );
};

export default ChatApp;
