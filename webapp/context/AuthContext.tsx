// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { UserAuthData, AuthContextType } from '../types';
import { useRouter } from "next/navigation";


const API_URL = process.env.NEXT_PUBLIC_API_URL;
const channel = typeof window !== "undefined" ? new BroadcastChannel('auth') : null;

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

  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        const parsedUser: UserAuthData = JSON.parse(storedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      setUser(data);
      channel?.postMessage({ type: 'LOGIN', user: data });

      // ✅ Thêm điều hướng theo role
      if (data.role === 'user') router.push('/user');
      else if (data.role === 'partner') router.push('/doanhnghiep');
      else if (data.role === 'admin') router.push('/admin');
      else router.push('/');

      return { success: true };
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Login failed'
        : 'An unexpected error occurred';
      return { success: false, message };
    }
  }, [router]);

  const signup = useCallback(async (userData: { name: string; email: string; password: string; role?: 'user' | 'partner' | 'admin' }) => {
    try {
      const response: AxiosResponse<UserAuthData> = await axios.post(`${API_URL}/auth/signup`, userData);
      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      setUser(data);
      channel?.postMessage({ type: 'LOGIN', user: data });

      // ✅ Thêm điều hướng
      if (data.role === 'user') router.push('/user');
      else if (data.role === 'partner') router.push('/doanhnghiep');
      else if (data.role === 'admin') router.push('/admin');
      else router.push('/');

      return { success: true };
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Sign up failed'
        : 'An unexpected error occurred';
      return { success: false, message };
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    channel?.postMessage({ type: 'LOGOUT' });
  }, []);

  useEffect(() => {
    if (!channel) return;
    channel.onmessage = (event) => {
      if (event.data.type === 'LOGOUT') setUser(null);
      if (event.data.type === 'LOGIN') setUser(event.data.user);
    };
    return () => channel.close();
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
