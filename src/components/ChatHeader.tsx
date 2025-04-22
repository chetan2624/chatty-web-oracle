
import React from 'react';
import { MessageSquare, Settings } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      <div className="flex items-center">
        <div className="bg-primary rounded-full p-2 mr-3">
          <MessageSquare className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold">AI Assistant</h1>
          <p className="text-sm text-gray-500">Ask me about weather, news, or anything else!</p>
        </div>
      </div>
      
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Settings className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
};

export default ChatHeader;
