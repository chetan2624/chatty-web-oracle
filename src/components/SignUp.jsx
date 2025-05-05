
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
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
    
    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast({
        title: "Error",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    const userData = {
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    
    const result = signup(userData);
    
    if (result.success) {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully!",
        variant: "default",
      });
      navigate('/chat');
    } else {
      setError(result.message);
      toast({
        title: "Error",
        description: result.message,
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Sign Up</h2>
        </div>
        
        {error && <div className="bg-red-50 text-red-500 p-4 text-center font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          
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
              placeholder="Create a password"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#4e54c8] hover:bg-[#3a3f9d]" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        
        <div className="border-t p-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-[#4e54c8] font-medium">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
