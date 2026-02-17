import { useState } from 'react';
import sam from '../api/samClient';

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (email, password) => {
    try {
      const response = await sam.post('/users/sign_in', {
        user: { email, password }
      }, {
        headers: { Accept: 'application/json' }
      });

      const authToken = response.headers.authorization;
      localStorage.setItem('token', authToken);
      setToken(authToken);

      return { success: true, token: authToken };
    } catch (err) {
      console.error("Login failed", err);
      return {
        success: false,
        error: err.response?.data?.error || "Login failed"
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = !!token;

  return {
    token,
    login,
    logout,
    isAuthenticated
  };
}
