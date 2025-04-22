
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CloudSun, Newspaper, Search, Info } from 'lucide-react';

interface ChatFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const ChatFeature: React.FC<ChatFeatureProps> = ({ icon, title, description, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="flex items-center p-4">
        <div className="mr-4 bg-primary/10 p-2 rounded-full text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface ChatFeaturesProps {
  onFeatureClick: (message: string) => void;
}

const ChatFeatures: React.FC<ChatFeaturesProps> = ({ onFeatureClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <ChatFeature
        icon={<CloudSun className="h-5 w-5" />}
        title="Weather"
        description="Check the weather in your city"
        onClick={() => onFeatureClick("What's the weather in New York?")}
      />
      <ChatFeature
        icon={<Newspaper className="h-5 w-5" />}
        title="News"
        description="Get the latest news headlines"
        onClick={() => onFeatureClick("Show me the latest news")}
      />
      <ChatFeature
        icon={<Search className="h-5 w-5" />}
        title="Search"
        description="Search for information"
        onClick={() => onFeatureClick("Search for artificial intelligence")}
      />
      <ChatFeature
        icon={<Info className="h-5 w-5" />}
        title="Help"
        description="Learn what I can do"
        onClick={() => onFeatureClick("What can you do?")}
      />
    </div>
  );
};

export default ChatFeatures;
