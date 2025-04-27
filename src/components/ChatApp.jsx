
import React, { useState, useEffect, useRef } from 'react';
import '../styles/chat.css';
import ChatHeader from './chat/ChatHeader';
import SearchBar from './chat/SearchBar';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import { extractCityFromMessage, getWeatherForCity } from '../services/weatherService';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const chatBoxRef = useRef(null);
  
  // Set a default username
  const username = "User";

  // Add welcome message on component mount
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      text: `Hi ${username}! I am your personal chatbot. You can ask me about:
      
      • Weather information for any city
      • Latest news updates
      • Web search queries
      • General conversation
      
      How can I assist you today?`,
      sender: 'bot',
      time: getCurrentTime()
    };
    
    setMessages([welcomeMessage]);
  }, [username]);

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
      const greetings = ['hi', 'hello', 'hey', 'greetings', 'howdy'];
      if (greetings.some(greeting => inputMessage.toLowerCase().includes(greeting))) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: `Hi ${username}! I am your personal chatbot and you can ask me about weather updates, latest news, search for information, or just chat. How can I help you today?`,
            sender: 'bot',
            time: getCurrentTime()
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      if (inputMessage.toLowerCase().includes('weather')) {
        const city = extractCityFromMessage(inputMessage);
        if (city) {
          try {
            const weatherData = await getWeatherForCity(city);
            
            setMessages(prev => [...prev, {
              id: Date.now() + 1,
              text: `Here's the current weather in ${weatherData.location}:`,
              sender: 'bot',
              time: getCurrentTime(),
              type: 'weather',
              weatherData: weatherData
            }]);
            
            setIsLoading(false);
            return;
          } catch (error) {
            console.error("Weather error:", error);
          }
        }
      }

      // Mock API response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: `I received your message: "${inputMessage}". This is a simulated response as the API endpoint is not connected.`,
          sender: 'bot',
          time: getCurrentTime()
        }]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "I'm having trouble processing your request. Please try again later.",
        sender: 'bot',
        time: getCurrentTime()
      }]);
      setIsLoading(false);
    }
  };

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container chat-container mt-8">
      <ChatHeader username={username} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="chat-box" ref={chatBoxRef}>
        <MessageList messages={filteredMessages} isLoading={isLoading} />
      </div>

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatApp;
