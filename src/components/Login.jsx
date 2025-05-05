
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, LogIn } from 'lucide-react';

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
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#4e54c8] to-[#8f94fb] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/30">
            <LogIn className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-white/80">Log in to continue your conversation</p>
        </div>
        
        {error && (
          <div className="mx-8 mb-4 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 text-white text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90 text-lg">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/30"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90 text-lg">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/30"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-white hover:bg-white/90 text-[#4e54c8] font-bold text-lg py-6" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <div className="border-t border-white/10 p-8 text-center text-white/80">
          Don't have an account? <Link to="/signup" className="text-white font-medium hover:text-white/90 underline underline-offset-4">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
