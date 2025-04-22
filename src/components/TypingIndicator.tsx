
import React from 'react';
import { Card } from "@/components/ui/card";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex mb-4">
      <div className="flex items-end gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm">
          AI
        </div>
        
        <Card className="px-4 py-3 bg-muted">
          <div className="typing-animation flex space-x-1">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span className="w-2 h-2 bg-primary rounded-full"></span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TypingIndicator;
