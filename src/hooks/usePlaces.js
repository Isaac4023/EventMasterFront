import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Hook para la gestión de Sedes (Venues / Places).
 * Conecta con los endpoints GET /places y POST /places.
 */
export const usePlaces = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Obtiene el listado de todas las sedes disponibles.
   */
  const getPlaces = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/places');
      return { success: true, data: res.data };
    } catch (err) {
      setError(err.msg || 'Error al obtener las sedes');
      return { success: false, msg: err.msg };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crea una nueva sede (Solo Admin).
   * @param {Object} placeData { name, address, capacity, type, etc }
   */
  const createPlace = useCallback(async (placeData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/places', placeData);
      return { success: true, data: res.data };
    } catch (err) {
      setError(err.msg || 'Error al crear la sede');
      return { success: false, msg: err.msg };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getPlaces,
    createPlace
  };
};
