
import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from './ui/button';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
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

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-xl">AI Assistant</h2>
        </div>
        <div className="flex-1 p-4">
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
            onClick={() => setMessages([])}
          >
            + New Chat
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-primary">AI Chat Assistant</h1>
                <p className="text-muted-foreground">Ask me anything about weather, news, or search for information.</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <div className="flex-1 flex items-center gap-2 bg-background rounded-lg border px-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-base"
              />
              <Button
                variant="ghost"
                size="icon"
                disabled={!inputMessage.trim() || isLoading}
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
