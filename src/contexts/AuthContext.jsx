
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial load
    const user = localStorage.getItem('chatUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    // Store user in localStorage
    localStorage.setItem('chatUser', JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  // Signup function
  const signup = (userData) => {
    // For demonstration, we'll store in localStorage
    // In a real app, this would involve API calls to a backend
    const users = JSON.parse(localStorage.getItem('chatUsers') || '[]');
    
    // Check if user already exists
    const userExists = users.some(user => user.email === userData.email);
    if (userExists) {
      return { success: false, message: 'User with this email already exists' };
    }
    
    users.push(userData);
    localStorage.setItem('chatUsers', JSON.stringify(users));
    
    // Log user in after signup
    login(userData);
    return { success: true };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('chatUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for using Auth
export const useAuth = () => {
  return useContext(AuthContext);
};
