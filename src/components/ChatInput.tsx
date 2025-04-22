
import React, { useState, KeyboardEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, MicOff } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleRecording = () => {
    // In a real app, you would integrate with the Web Speech API here
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // This is a mock implementation - in reality you would use the Web Speech API
      setTimeout(() => {
        setMessage('What is the weather in New York?');
        setIsRecording(false);
      }, 3000);
    }
  };
  
  return (
    <div className="flex items-center space-x-2 bg-background p-4 border-t">
      <Input
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={disabled}
        className="flex-1"
      />
      
      <Button
        variant="outline"
        size="icon"
        onClick={toggleRecording}
        disabled={disabled}
        className={isRecording ? 'text-red-500' : ''}
      >
        {isRecording ? <MicOff /> : <Mic />}
      </Button>
      
      <Button 
        onClick={handleSendMessage} 
        disabled={!message.trim() || disabled}
      >
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
