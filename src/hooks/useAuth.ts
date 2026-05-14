import { useState, useEffect } from 'react'

export interface User {
  id: string | number;
  email: string;
  name?: string;
  full_name?: string;
  role?: string;
  is_staff?: boolean;
  current_mode?: 'USER' | 'ADMIN';
  active_masjid_id?: number | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const checkSession = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        localStorage.removeItem('access_token');
        setUser(null);
      }
    } catch (err) {
      console.error("Session check failed", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkSession();
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (!res.ok) {
        const errMsg = Array.isArray(data.detail) 
          ? data.detail.map((d: any) => d.msg).join(', ') 
          : (data.detail || 'Login failed');
        return { error: { message: errMsg } };
      }
      
      localStorage.setItem('access_token', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }
      await checkSession();
      return { data, error: null };
    } catch (err: any) {
      return { error: { message: err.message || 'Network error' } };
    }
  }

  const signUp = async (email: string, password: string, fullName: string, confirmPassword?: string) => {
    try {
      const payload = {
        email,
        password,
        confirm_password: confirmPassword || password,
        name: fullName,
        full_name: fullName
      };

      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) {
        const errMsg = Array.isArray(data.detail) 
          ? data.detail.map((d: any) => d.msg).join(', ') 
          : (data.detail || 'Signup failed');
        return { error: { message: errMsg } };
      }
      
      // Automatically sign in the user so their profile activates instantly
      await signIn(email, password);
      
      return { data, error: null };
    } catch (err: any) {
      return { error: { message: err.message || 'Network error' } };
    }
  }

  const signOut = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(() => {});
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      return { error: null };
    } catch (err: any) {
      return { error: { message: err.message } };
    }
  }

  const updateProfile = async (updates: { full_name?: string; email?: string }) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error("No active session");

      const res = await fetch(`${API_BASE_URL}/user/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: updates.full_name,
          // If backend allows email update here, otherwise omit
        })
      });

      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.detail || "Failed to update profile" } };
      }

      await checkSession();
      return { data, error: null };
    } catch (err: any) {
      return { error: { message: err.message || "Network error" } };
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.detail || 'Failed to send reset email' } };
      }
      
      return { data, error: null };
    } catch (err: any) {
      return { error: { message: err.message } };
    }
  }

  const switchMode = async (mode: 'USER' | 'ADMIN') => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_BASE_URL}/v1/user/switch-mode?mode=${mode}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to switch mode");
      await checkSession();
      return { error: null };
    } catch (err: any) {
      return { error: { message: err.message } };
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
    switchMode,
  }
}