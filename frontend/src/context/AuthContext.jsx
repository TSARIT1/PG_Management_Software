import React, { createContext, useState, useEffect } from 'react';
import { loginAdmin, registerAdmin } from '../services/adminService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if admin is logged in (from localStorage)
  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (err) {
        console.error('Failed to parse stored admin:', err);
        localStorage.removeItem('admin');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginAdmin(email, password);
      
      if (response.status === 'success') {
        const { token, data } = response;
        setAdmin(data);
        localStorage.setItem('admin', JSON.stringify(data));
        localStorage.setItem('token', token);
        return data;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (adminData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerAdmin(adminData);
      
      if (response.status === 'success') {
        // backend might return token on register or just data
        // If it doesn't return token, maybe we should auto-login or redirect to login
        // But for now let's assume it returns data and we might not get a token yet
        // Wait, implementation plan said "Auto-login after register (optional)". 
        // Let's check AdminController.register. It returns "data": registeredAdmin. No token.
        // So we will just return response.data. The user will be redirected to Login.
        // Or we can just setAdmin(response.data) but they won't have a token so subsequent requests will fail.
        // So better to NOT setAdmin here, just return, and let UI redirect to login.
        return response.data;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    setError(null);
  };

  // Check if user is authenticated - requires BOTH admin data AND valid token
  const isAuthenticated = !!admin && !!localStorage.getItem('token');

  const value = {
    admin,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
