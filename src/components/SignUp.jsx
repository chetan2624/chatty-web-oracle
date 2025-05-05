
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { User, Mail, Lock, KeyRound, UserPlus } from 'lucide-react';

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
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#4e54c8] to-[#8f94fb] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/30">
            <UserPlus className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-white/80">Join our AI chatbot community</p>
        </div>
        
        {error && (
          <div className="mx-8 mb-4 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 text-white text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/90 text-lg">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/30"
              />
            </div>
          </div>
          
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
                placeholder="Create a password"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/30"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white/90 text-lg">Confirm Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/30"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-white hover:bg-white/90 text-[#4e54c8] font-bold text-lg py-6 mt-2" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        
        <div className="border-t border-white/10 p-8 text-center text-white/80">
          Already have an account? <Link to="/login" className="text-white font-medium hover:text-white/90 underline underline-offset-4">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
