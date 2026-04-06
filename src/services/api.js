import axios from 'axios';
import StorageService from '../helpers/StorageService';

const api = axios.create({
  baseURL: 'https://event-master-eight.vercel.app/api',
});

// INTERCEPTOR
api.interceptors.request.use(
  async (config) => {
    const token = await StorageService.getToken();

    if (token) {
      config.headers['x-auth-token'] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;