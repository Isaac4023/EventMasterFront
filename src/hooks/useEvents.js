import { useEffect, useState } from 'react';
import { fetchWithCache } from '../utils/fetchWithCache';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWithCache('/event', 'cache_events');

      // 🔥 asegurar que siempre sea array
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setEvents([]);
      }

    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return {
    events,
    loading,
    error,
    refresh: getEvents,
  };
};