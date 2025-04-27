
import React, { useState, useEffect, useRef } from 'react';
import '../styles/chat.css';
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import { extractCityFromMessage, getWeatherForCity } from '../services/weatherService';
import { getLatestNews } from '../services/newsService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  
  // Use auth context to get the current user
  const { currentUser } = useAuth() || { currentUser: { name: "User" } };
  
  // Get username from current user or use default
  const username = currentUser?.name || "User";

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
      // Check for greetings
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

      // Handle weather requests
      if (inputMessage.toLowerCase().includes('weather') || 
          inputMessage.toLowerCase().includes('temperature')) {
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
            toast({
              title: "Weather Error",
              description: "Could not fetch weather data. Please try again.",
              variant: "destructive"
            });
          }
        }
      }

      // Handle news requests
      if (inputMessage.toLowerCase().includes('news') || 
          (inputMessage.toLowerCase().includes('latest') && 
           inputMessage.toLowerCase().includes('headlines'))) {
        try {
          const newsData = await getLatestNews();
          
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: `Here are the latest headlines:`,
            sender: 'bot',
            time: getCurrentTime(),
            type: 'news',
            newsData: newsData
          }]);
          
          setIsLoading(false);
          return;
        } catch (error) {
          console.error("News error:", error);
          toast({
            title: "News Error",
            description: "Could not fetch latest news. Please try again.",
            variant: "destructive"
          });
        }
      }

      // Handle general queries
      setTimeout(() => {
        const botResponses = [
          `I'll try to answer that for you, ${username}.`,
          `That's an interesting question, ${username}. Let me help you with that.`,
          `I'm processing your request, ${username}.`,
          `Thanks for asking, ${username}. Here's what I found.`,
          `Good question, ${username}! Let me look that up for you.`
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: `${randomResponse} This is a simulated response to: "${inputMessage}"`,
          sender: 'bot',
          time: getCurrentTime()
        }]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `I'm sorry ${username}, I'm having trouble processing your request. Please try again later.`,
        sender: 'bot',
        time: getCurrentTime()
      }]);
      setIsLoading(false);
    }
  };

  // No more filtered messages since we removed search functionality
  const displayMessages = messages;

  return (
    <div className="container chat-container mt-8">
      <ChatHeader username={username} />
      
      <div className="chat-box" ref={chatBoxRef}>
        <MessageList messages={displayMessages} isLoading={isLoading} />
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
