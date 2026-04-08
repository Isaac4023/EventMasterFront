import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { fetchWithCache } from '../utils/fetchWithCache';
import { Alert } from 'react-native';

/**
 * Hook para la gestión integral de eventos.
 * Soporta CRUD completo y cacheo para visualización offline.
 */
export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(false);

  // Obtener lista de eventos (Público / Cacheado)
  const getEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithCache('/event', 'cache_events');
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('No se pudieron cargar los eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener un solo evento por ID
  const getEventById = useCallback(async (id) => {
    if (!id) return null;
    setLoadingEvent(true);
    try {
      const res = await api.get(`/event/${id}`);
      setEvent(res.data);
      return res.data;
    } catch (err) {
      console.error(`Error fetching event ${id}:`, err);
      setError('Error al cargar detalles del evento');
      return null;
    } finally {
      setLoadingEvent(false);
    }
  }, []);

  // Crear un nuevo evento (Admin/Organizer)
  const createEvent = async (eventData) => {
    setLoading(true);
    try {
      const res = await api.post('/event/new', eventData);
      Alert.alert('Éxito', 'Evento publicado correctamente');
      await getEvents(); // Refrescar lista local
      return res.data;
    } catch (err) {
      // Manejo de errores mejorado (Req 2)
      const msg = err?.response?.data?.msg || 'Error al crear el evento';
      Alert.alert('Error', msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar evento existente
  const updateEvent = async (id, updateData) => {
    setLoading(true);
    try {
      const res = await api.patch(`/event/${id}`, updateData);
      Alert.alert('Éxito', 'Evento actualizado');
      await getEvents();
      return res.data;
    } catch (err) {
      const msg = err?.response?.data?.msg || 'Error al actualizar';
      Alert.alert('Error', msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cancelar evento (Borrado lógico)
  const deleteEvent = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/event/${id}`);
      Alert.alert('Éxito', 'Evento cancelado');
      await getEvents();
    } catch (err) {
      const msg = err?.response?.data?.msg || 'Error al cancelar';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return {
    events,
    event,
    loading,
    loadingEvent,
    error,
    refresh: getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
  };
};