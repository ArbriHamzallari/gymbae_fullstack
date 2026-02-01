import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getToken, setToken, clearToken, apiFetch } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = getToken();
  const isLoggedIn = !!token && !!user;

  const fetchUser = useCallback(async () => {
    const t = getToken();
    if (!t) {
      setLoading(false);
      return;
    }
    try {
      const res = await apiFetch('/api/account/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else if (res.status === 401) {
        // Expired or invalid JWT - clear token and redirect to login
        clearToken();
        setUser(null);
        // Redirect will be handled by ProtectedRoute
      } else {
        clearToken();
        setUser(null);
      }
    } catch (err) {
      // Network error or other exception
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback(async (email, password) => {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Login failed');
    }
    const data = await res.json();
    setToken(data.token);
    try {
      const meRes = await apiFetch('/api/account/me');
      if (meRes.ok) {
        setUser(await meRes.json());
      } else if (meRes.status === 401) {
        // Token invalid immediately after login - clear and throw
        clearToken();
        throw new Error('Authentication failed. Please try again.');
      } else {
        setUser({ id: data.userId, email: data.email, name: '' });
      }
    } catch (err) {
      // Network error or other issue
      clearToken();
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
