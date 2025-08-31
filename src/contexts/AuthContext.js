'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Хуудас ачааллагдах үед authentication статусыг шалгах
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Token-оос user мэдээллийг авах (base64 decode)
      try {
        const decodedToken = JSON.parse(atob(token));
        if (decodedToken.user) {
          setUser(decodedToken.user);
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.log('Token decode failed, trying simple token');
        // Simple token format: id:email:timestamp
        try {
          const decoded = atob(token);
          const [id, email] = decoded.split(':');
          if (id && email) {
            // Mock admin user for testing
            setUser({
              id: parseInt(id) || 1,
              username: 'admin',
              email: email,
              role: 'ADMIN'
            });
            setIsAuthenticated(true);
          }
        } catch (e2) {
          console.log('Simple token decode failed, using mock user');
          // Mock admin user for testing
          setUser({
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
            role: 'ADMIN'
          });
          setIsAuthenticated(true);
        }
      }
      
      // const res = await fetch('/api/auth/me', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });

      // if (res.ok) {
      //   const userData = await res.json();
      //   setUser(userData);
      //   setIsAuthenticated(true);
      // } else {
      //   // Token буруу бол устгах
      //   localStorage.removeItem('token');
      //   setUser(null);
      //   setIsAuthenticated(false);
      // }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } else {
      const data = await res.json();
      return { success: false, error: data.error };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}