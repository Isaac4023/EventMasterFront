import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { fetchWithCache } from '../utils/fetchWithCache';
import { Alert } from 'react-native';

/**
 * Hook para la gestión de sedes y recintos.
 * Sincroniza la lista de lugares disponibles con soporte offline.
 */
export const usePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener lista completa de sedes
  const getPlaces = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Uso de cache para disponibilidad inmediata (Req 3)
      const data = await fetchWithCache('/place', 'cache_places');
      if (Array.isArray(data)) {
        setPlaces(data);
      } else {
        setPlaces([]);
      }
    } catch (err) {
      console.error('Error fetching places:', err);
      setError('No se pudieron cargar las sedes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Registrar nueva sede (Solo Admin)
  const createPlace = useCallback(async (placeData) => {
    setLoading(true);
    try {
      const res = await api.post('/place/new', placeData);
      Alert.alert('Éxito', 'Sede registrada correctamente');
      await getPlaces();
      return res.data;
    } catch (err) {
      const msg = err?.response?.data?.msg || 'Error al registrar sede';
      Alert.alert('Error', msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getPlaces]);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return {
    places,
    loading,
    error,
    refresh: getPlaces,
    createPlace
  };
};