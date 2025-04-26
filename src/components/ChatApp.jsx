import React, { useState, useRef, useEffect } from 'react';
import { Send, Robot, Search, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/chat.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const chatBoxRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add the initial welcome message with user's name
    const welcomeMessage = {
      id: 'welcome',
      text: `Hi ${currentUser.name}! I am your personal chatbot. You can ask me about:
      
      • Weather information for any city
      • Latest news updates
      • Web search queries
      • General conversation
      
      How can I assist you today?`,
      sender: 'bot',
      time: getCurrentTime()
    };
    
    setMessages([welcomeMessage]);
  }, [currentUser.name]);

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
      // Check for greetings
      const greetings = ['hi', 'hello', 'hey', 'greetings', 'howdy'];
      if (greetings.some(greeting => inputMessage.toLowerCase().includes(greeting))) {
        // Add a personalized greeting response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: `Hi ${currentUser.name}! I am your personal chatbot and you can ask me about weather updates, latest news, search for information, or just chat. How can I help you today?`,
            sender: 'bot',
            time: getCurrentTime()
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Regular API request for other messages
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
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "I'm having trouble processing your request. Please try again later.",
        sender: 'bot',
        time: getCurrentTime()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container chat-container mt-8">
      <div className="chat-header">
        <div className="chat-avatar">
          <Robot />
        </div>
        <h2>AI Assistant</h2>
        <div className="online-indicator"></div>
        <div className="user-info">
          <span className="user-name">{currentUser.name}</span>
        </div>
      </div>

      <div className="search-container">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="chat-box" ref={chatBoxRef}>
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
