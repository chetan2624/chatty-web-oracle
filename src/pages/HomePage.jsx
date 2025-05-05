
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, MessageSquare } from 'lucide-react';

const HomePage = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#4e54c8] to-[#8f94fb]">
          Welcome to AI Chatbot
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your personal assistant for weather updates, latest news, and more.
          Start a conversation and discover what our AI can do for you.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
        {currentUser ? (
          <Link to="/chat">
            <Button size="lg" className="min-w-[200px] text-lg py-6">
              <MessageSquare className="mr-2" />
              Start Chatting
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button size="lg" className="min-w-[200px] text-lg py-6" variant="default">
                <LogIn className="mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" className="min-w-[200px] text-lg py-6" variant="outline">
                <UserPlus className="mr-2" />
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Weather Updates</h3>
          <p className="text-gray-600">Get accurate weather information for any city. Just ask about the temperature or weather conditions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Latest News</h3>
          <p className="text-gray-600">Stay informed with the most recent headlines and updates from around the world.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">General Assistance</h3>
          <p className="text-gray-600">Ask questions, get information, or just chat about anything that's on your mind.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
