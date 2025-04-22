
import React from 'react';
import { Card } from "@/components/ui/card";
import WeatherResult from './WeatherResult';
import NewsResult from './NewsResult';
import SearchResults from './SearchResults';
import { WeatherData } from '@/services/weatherService';
import { NewsArticle } from '@/services/newsService';
import { SearchResult } from '@/services/searchService';

export type MessageType = 'user' | 'bot';
export type MessageContentType = 'text' | 'weather' | 'news' | 'search';

export interface ChatMessageProps {
  id: string;
  message: string;
  type: MessageType;
  contentType: MessageContentType;
  timestamp: Date;
  weatherData?: WeatherData;
  newsData?: NewsArticle[];
  searchData?: SearchResult[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  type,
  contentType,
  timestamp,
  weatherData,
  newsData,
  searchData
}) => {
  const isUser = type === 'user';
  const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div className="flex items-end gap-2">
          {!isUser && (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm">
              AI
            </div>
          )}
          
          <Card className={`px-4 py-2 ${
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted'
          } shadow-sm`}>
            <div className="message-content">{message}</div>
            
            {contentType === 'weather' && weatherData && (
              <WeatherResult weatherData={weatherData} />
            )}
            
            {contentType === 'news' && newsData && (
              <NewsResult newsData={newsData} />
            )}
            
            {contentType === 'search' && searchData && (
              <SearchResults searchData={searchData} />
            )}
            
            <div className={`text-xs mt-1 ${isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {formattedTime}
            </div>
          </Card>
          
          {isUser && (
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm">
              You
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
