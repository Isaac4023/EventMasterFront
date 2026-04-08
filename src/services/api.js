import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

/**
 * Instancia de Axios configurada para EventMaster.
 * Incluye interceptores para inyección de Token y manejo de errores.
 */
const api = axios.create({
  baseURL: 'https://event-master-eight.vercel.app/api',
  timeout: 15000, // Aumentado ligeramente para conexiones lentas
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de Petición: Inyectar JWT en cada request (Req 1)
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('authToken');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor de Respuesta: Manejo centralizado de errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si la API retorna 401, el token es inválido o expiró
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('authToken');
    }
    
    // Normalización de errores para los hooks
    const customError = {
      message: error.response?.data?.msg || error.message || 'Error de conexión',
      status: error.response?.status,
      data: error.response?.data
    };

    return Promise.reject(customError);
  }
);

export default api;