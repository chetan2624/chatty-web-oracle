
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Page not found</p>
      <p className="text-gray-500 mt-2 mb-6">The page you are looking for doesn't exist or has been moved.</p>
      <Link 
        to="/"
        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
