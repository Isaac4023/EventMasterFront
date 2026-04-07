import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const fetchWithCache = async (endpoint, key) => {
  const net = await NetInfo.fetch();

  if (net.isConnected) {
    try {
      const res = await api.get(endpoint);

      await AsyncStorage.setItem(key, JSON.stringify(res.data));

      return res.data;

    } catch (error) {
      // fallback si falla la API
      const cached = await AsyncStorage.getItem(key);
      return cached ? JSON.parse(cached) : [];
    }
  } else {
    // 🔥 SIN INTERNET
    const cached = await AsyncStorage.getItem(key);
    return cached ? JSON.parse(cached) : [];
  }
};