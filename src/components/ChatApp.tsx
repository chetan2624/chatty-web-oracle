
import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import ChatFeatures from './ChatFeatures';

import { getAIResponse } from '@/services/aiService';
import { extractCityFromMessage, getWeatherForCity, WeatherData } from '@/services/weatherService';
import { getLatestNews, NewsArticle } from '@/services/newsService';
import { extractSearchQueryFromMessage, searchForInformation, SearchResult } from '@/services/searchService';
import { useToast } from '@/components/ui/use-toast';

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom of message list
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (message: string) => {
    // Don't process empty messages
    if (!message.trim()) return;
    
    // Hide features when user starts chatting
    setShowFeatures(false);
    
    // Add user message to chat
    const userMessage: ChatMessageProps = {
      id: Date.now().toString(),
      message,
      type: 'user',
      contentType: 'text',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get base AI response to determine action
      const aiResponse = await getAIResponse(message);
      
      // Initialize bot message
      let botMessage: ChatMessageProps = {
        id: (Date.now() + 1).toString(),
        message: aiResponse.text,
        type: 'bot',
        contentType: 'text',
        timestamp: new Date()
      };
      
      // Process specialized responses based on type
      if (aiResponse.type === 'weather') {
        try {
          const city = extractCityFromMessage(message);
          console.log("Extracted city:", city); // Debugging
          
          if (city) {
            const weatherData = await getWeatherForCity(city);
            botMessage = {
              ...botMessage,
              message: `Here's the current weather in ${weatherData.location}:`,
              contentType: 'weather',
              weatherData
            };
          } else {
            botMessage.message = "I'd be happy to check the weather for you. Could you specify which city?";
          }
        } catch (error) {
          console.error('Weather error:', error);
          botMessage.message = "I couldn't get the weather information at the moment. Please try again later.";
        }
      } 
      else if (aiResponse.type === 'news') {
        try {
          const newsData = await getLatestNews();
          botMessage = {
            ...botMessage,
            message: "Here are the latest headlines:",
            contentType: 'news',
            newsData
          };
        } catch (error) {
          console.error('News error:', error);
          botMessage.message = "I couldn't fetch the latest news at the moment. Please try again later.";
        }
      } 
      else if (aiResponse.type === 'search') {
        try {
          const query = extractSearchQueryFromMessage(message);
          const searchData = await searchForInformation(query);
          botMessage = {
            ...botMessage,
            message: `Here's what I found for "${query}":`,
            contentType: 'search',
            searchData
          };
        } catch (error) {
          console.error('Search error:', error);
          botMessage.message = "I couldn't complete your search at the moment. Please try again later.";
        }
      }
      
      // Add bot response to messages
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Show error toast
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
      
      // Add error message to chat
      setMessages(prev => [
        ...prev, 
        {
          id: (Date.now() + 1).toString(),
          message: "I'm having trouble processing your request. Please try again later.",
          type: 'bot',
          contentType: 'text',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFeatureClick = (message: string) => {
    handleSendMessage(message);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 chat-container">
        {showFeatures && messages.length === 0 ? (
          <div className="my-8">
            <h2 className="text-center text-xl font-semibold mb-6">How can I help you today?</h2>
            <ChatFeatures onFeatureClick={handleFeatureClick} />
          </div>
        ) : (
          <>
            {messages.map(msg => (
              <ChatMessage key={msg.id} {...msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatApp;
