import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is in localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      setError(null);
      const res = await api.post('/auth/signup', { name, email, password, role });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
