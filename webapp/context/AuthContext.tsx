// context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';
import { UserAuthData, AuthContextType } from '../types'; // Import types

// Get API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Initialize context with a default value that matches the interface
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserAuthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user data from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser: UserAuthData = JSON.parse(storedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        // Clear invalid storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // --- Core Authentication Functions ---

  const login = async (email: string, password: string) => {
    try {
      const response: AxiosResponse<UserAuthData> = await axios.post(`${API_URL}/auth/login`, { email, password });
      const data = response.data;

      // Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Set the Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setUser(data);
      return { success: true };
    } catch (error) {
      const message = axios.isAxiosError(error) 
        ? error.response?.data?.message || 'Login failed' 
        : 'An unexpected error occurred';
      return { success: false, message };
    }
  };

  const signup = async (userData: { name: string; email: string; password: string; role?: 'user' | 'partner' | 'admin' }) => {
    try {
      const response: AxiosResponse<UserAuthData> = await axios.post(`${API_URL}/auth/signup`, userData);
      const data = response.data;
      
      // Automatically log the user in after successful sign up
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setUser(data);
      return { success: true };
    } catch (error) {
      const message = axios.isAxiosError(error) 
        ? error.response?.data?.message || 'Sign up failed' 
        : 'An unexpected error occurred';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};