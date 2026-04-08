import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { storage } from '../helpers/storage';

/**
 * Hook para la gestión de eventos.
 * Implementa sincronización offline mediante AsyncStorage.
 */
export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Obtiene la lista global de eventos.
   * Intenta refrescar desde la API y guarda en caché.
   */
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/event');
      setEvents(res.data);
      // Guardamos en caché para modo offline
      await storage.saveCache('cached_events', res.data);
    } catch (err) {
      // Si falla, intentamos cargar desde caché
      const cachedData = await storage.getCache('cached_events');
      if (cachedData) {
        setEvents(cachedData);
        console.warn('Cargando eventos desde caché (Offline)');
      }
      setError(err.msg || 'Error al obtener eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene un evento específico por su ID.
   */
  const getEventById = useCallback(async (id) => {
    setLoadingEvent(true);
    try {
      const res = await api.get(`/event/${id}`);
      setEvent(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, msg: err.msg };
    } finally {
      setLoadingEvent(false);
    }
  }, []);

  /**
   * Crea un nuevo evento (Admin/Organizer).
   */
  const createEvent = async (eventData) => {
    setLoading(true);
    try {
      const res = await api.post('/event/new', eventData);
      await fetchEvents(); // Refrescamos lista
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, msg: err.msg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene disponibilidad de zonas de un evento.
   */
  const getZoneAvailability = async (id) => {
    try {
      const res = await api.get(`/event/${id}/availability`);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, msg: err.msg };
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    event,
    loading,
    loadingEvent,
    error,
    refresh: fetchEvents,
    getEventById,
    createEvent,
    getZoneAvailability
  };
};
