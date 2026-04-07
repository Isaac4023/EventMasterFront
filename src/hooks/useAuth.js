import { useState } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN
  const login = async (email, password, router) => {
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });

      const { token, role, _id, name, email: userEmail } = res.data;

      // 🔐 Guardar JWT
      await SecureStore.setItemAsync('authToken', token);

      // 💾 Guardar datos
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem(
        'cache_profile',
        JSON.stringify({ _id, name, email: userEmail, role })
      );

      // 🚀 Redirección
      if (role === 'admin') router.replace('/admin-home');
      else if (role === 'staff') router.replace('/staff-home');
      else router.replace('/home');

    } catch (error) {
      Alert.alert('Error', error?.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // 🧾 REGISTER
  const register = async (name, email, password, router) => {
    setLoading(true);

    try {
      await api.post('/auth/register', { name, email, password });

      Alert.alert('Success', 'Account created successfully');

      router.replace('/');

    } catch (error) {
      Alert.alert('Error', error?.response?.data?.msg || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = async (router) => {
    await SecureStore.deleteItemAsync('authToken');
    await AsyncStorage.multiRemove([
      'userRole',
      'cache_profile',
      'cache_events',
    ]);

    router.replace('/');
  };

  return { login, register, logout, loading };
};