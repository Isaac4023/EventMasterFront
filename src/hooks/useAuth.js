import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';
import { useAuthContext } from '../context/AuthContext';

/**
 * Hook para facilitar operaciones de autenticación.
 * Consume el AuthContext global para mantener sincronía.
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, signOut, user, isAuthenticated, refreshUser } = useAuthContext();

  // LOGIN: Llama a la API y actualiza el Contexto
  const login = useCallback(async (email, password, router) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, role, _id, name, email: userEmail } = res.data;

      const userData = {
        _id,
        name: name || userEmail.split('@')[0],
        email: userEmail,
        role,
      };

      // Actualizar el estado global
      await signIn(userData, token);

      // Redirección basada en privilegios
      if (role === 'admin') router.replace('/admin-dashboard');
      else if (role === 'staff') router.replace('/staff-scanner');
      else router.replace('/home');

    } catch (error) {
      const msg = error?.response?.data?.msg || 'Error al iniciar sesión';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  }, [signIn]);

  // REGISTER: Registro por roles
  const register = useCallback(async (name, email, password, role, router) => {
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password, role });
      Alert.alert('Éxito', 'Cuenta creada correctamente. Inicia sesión.');
      router.replace('/');
    } catch (error) {
      const msg = error?.response?.data?.msg || 'Error en el registro';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // LOGOUT: Limpia el contexto y redirige
  const logout = useCallback(async (router) => {
    setLoading(true);
    try {
      await signOut();
      router.replace('/');
    } catch (e) {
      console.error('Logout failure:', e);
    } finally {
      setLoading(false);
    }
  }, [signOut]);

  return { 
    login, 
    register, 
    logout, 
    checkSession: refreshUser, 
    loading,
    user,
    isAuthenticated
  };
};