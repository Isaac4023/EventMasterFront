import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'https://event-master-eight.vercel.app/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('authToken');

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
});

// Interceptor response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('authToken');
    }
    return Promise.reject(error);
  }
);

export default api;