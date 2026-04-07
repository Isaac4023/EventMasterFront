import { useEffect, useState } from 'react';
import api from '../services/api';

export const usePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlaces = async () => {
    try {
      const res = await api.get('/places');
      setPlaces(res.data);
    } catch (error) {
      console.error(error);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return { places, loading, refresh: getPlaces };
};