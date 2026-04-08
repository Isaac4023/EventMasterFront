import axios from 'axios';
import { storage } from '../helpers/storage';

/**
 * Servicio central de API utilizando Axios.
 * Implementa interceptores para gestión de tokens JWT y errores globales.
 */
const api = axios.create({
  baseURL: 'https://event-master-eight.vercel.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Peticiones: Adjunta el token JWT si existe
api.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Respuestas: Manejo global de errores y sesión expirada
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Si el servidor responde con 401 (Unauthorized), posiblemente el token expiró
      if (error.response.status === 401) {
        // Podríamos redirigir al login o limpiar almacenamiento
        console.warn('Sesión expirada o no autorizada.');
      }
      
      // Retornamos el mensaje de error del backend si existe
      return Promise.reject({
        status: error.response.status,
        msg: error.response.data?.msg || 'Error en el servidor',
        data: error.response.data
      });
    } else if (error.request) {
      // Error de red (No hubo respuesta)
      return Promise.reject({
        msg: 'No se pudo conectar con el servidor. Revisa tu conexión.'
      });
    } else {
      // Otro tipo de error
      return Promise.reject({
        msg: error.message
      });
    }
  }
);

export default api;
