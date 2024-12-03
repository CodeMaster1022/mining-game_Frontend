import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  role: string;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          await fetchUserProfile(); // This will set isAuthenticated to true
        } catch (error) {
          console.error('Error initializing auth:', error);
          logout();
        }
      }
    };
  
    initializeAuth();
  }, []);
  const fetchUserProfile = async () => {
    console.log('================>')
    try {
      const username = localStorage.getItem('username');
      const data = {
        username: username
      }
      console.log(username)
      const response = await axios.post('http://localhost:3000/api/user/profile',data);
      console.log(response.data)
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    }
  };
  const login = async (identifier: string, password: string) => {
    try {
        console.log(identifier, password)
      const response = await axios.post('http://localhost:3000/api/auth/login', { identifier, password });
      const { accessToken, refreshToken, username, macos, role } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);
      localStorage.setItem('macos', macos);
      localStorage.setItem('role', role);
      setRole(role);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      await fetchUserProfile();
    } catch (error) {
      console.error('Login error:', error);
      if (error === 403) {
        throw new Error('Your IP is temporarily blocked. Please try again later.');
      } else {
        throw new Error('Invalid credentials. Please try again.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, role }}>
      {children}
    </AuthContext.Provider>
  );
};

