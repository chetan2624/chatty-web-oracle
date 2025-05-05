
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/chat');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('chatUsers') || '[]');
    console.log("Retrieved users:", users);
    console.log("Attempting to login with:", email);
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      console.log("Login successful for user:", user.name);
      // Login successful
      login(user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
        variant: "default",
      });
      navigate('/chat');
    } else {
      console.log("Login failed - user not found or password mismatch");
      setError('Invalid email or password');
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] p-6 text-white text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4e54c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        
        {error && <div className="bg-red-50 text-red-500 p-4 text-center font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#4e54c8] hover:bg-[#3a3f9d]" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <div className="border-t p-6 text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="text-[#4e54c8] font-medium">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
