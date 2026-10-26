import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const t = await AsyncStorage.getItem('umrah_token');
        const u = await AsyncStorage.getItem('umrah_user');
        if (t && u) {
          setToken(t);
          setUser(JSON.parse(u));
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  async function authRequest(path, body) {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Request failed. Is the backend running?');
    }
    await AsyncStorage.setItem('umrah_token', data.token);
    await AsyncStorage.setItem('umrah_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  const register = (name, email, password, city) => authRequest('/auth/register', { name, email, password, city });
  const login = (email, password) => authRequest('/auth/login', { email, password });

  async function logout() {
    await AsyncStorage.removeItem('umrah_token');
    await AsyncStorage.removeItem('umrah_user');
    setToken(null);
    setUser(null);
  }

  function continueAsGuest() {
    setUser({ name: 'Guest', email: '', guest: true });
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout, continueAsGuest, apiUrl: API_URL }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
