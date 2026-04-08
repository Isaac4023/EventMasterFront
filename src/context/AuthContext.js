import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  // RESTAURAR SESIÓN: Carga el usuario de AsyncStorage y valida con la API
  const restoreSession = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const token = await SecureStore.getItemAsync('authToken');

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        
        // Intentar refrescar en segundo plano para asegurar que el token sea válido
        try {
          const res = await api.get('/auth/me');
          if (res.data) {
            setUser(res.data);
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
          }
        } catch (e) {
          // Si falla /me (ej. token expirado), hacemos logout automático
          if (e.response?.status === 401) {
            await signOut();
          }
        }
      }
    } catch (e) {
      console.error('Session restore failure:', e);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (userData, token) => {
    setUser(userData);
    await SecureStore.setItemAsync('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('userRole', userData.role);
  };

  const signOut = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync('authToken');
    const keys = await AsyncStorage.getAllKeys();
    // Borramos todo excepto quizás configuraciones persistentes (pero aquí borramos todo para seguridad)
    await AsyncStorage.multiRemove(keys);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      signIn,
      signOut,
      refreshUser: restoreSession
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
