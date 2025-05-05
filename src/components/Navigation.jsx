
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, UserPlus, LogIn, MessageSquare } from 'lucide-react';

const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] text-white">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-semibold">AI Chatbot</Link>
      </div>
      
      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            <Link
              to="/chat"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <MessageSquare size={18} />
              <span>Chat</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#4e54c8] hover:bg-gray-100 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#4e54c8] hover:bg-gray-100 transition-colors"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
