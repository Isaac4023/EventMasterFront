import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { storage } from '../helpers/storage';

/**
 * Contexto global de Autenticación.
 * Permite que todas las pantallas compartan el mismo estado de usuario.
 */
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para validar la sesión actual
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const storedUser = await storage.getUserData();
      if (storedUser) {
        setUser(storedUser);
      }
      
      const res = await api.get('/auth/me');
      if (res.data) {
        setUser(res.data);
        await storage.saveUserData(res.data);
      }
    } catch (err) {
      if (err.status === 401) {
        await logout();
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, ...userData } = res.data;
      
      await storage.saveToken(token);
      await storage.saveUserData(userData);
      setUser(userData);
      
      return { success: true };
    } catch (err) {
      setError(err.msg || 'Error al iniciar sesión');
      return { success: false, msg: err.msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'user') => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      return { success: true, data: res.data };
    } catch (err) {
      setError(err.msg || 'Error al completar el registro');
      return { success: false, msg: err.msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await storage.clearAll();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      refreshUser: checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};
