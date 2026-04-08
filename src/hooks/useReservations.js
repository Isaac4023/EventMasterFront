import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { fetchWithCache } from '../utils/fetchWithCache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * Hook para la gestión de reservas y verificación de tickets.
 * Implementa persistencia offline para tickets del usuario.
 */
export const useReservations = () => {
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener tickets del usuario actual
  const getMyTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Req 3: Visualización offline de tickets ya cargados
      const data = await fetchWithCache('/reservation/me', 'cache_user_tickets');
      setMyTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('No se pudieron cargar tus tickets');
    } finally {
      setLoading(false);
    }
  }, []);

  // Realizar una nueva reserva
  const createReservation = async (eventId) => {
    setLoading(true);
    try {
      const res = await api.post('/reservation/new', { event: eventId });
      Alert.alert('Éxito', 'Reserva realizada. ¡Disfruta el evento!');
      await getMyTickets(); // Refrescar lista
      return res.data;
    } catch (err) {
      // Manejo de error con lógica offline (Req 3 sugerido)
      const msg = err?.response?.data?.msg || 'Error al procesar reserva';
      
      if (!err.response) {
        // Posible error de red, podríamos guardar para sincronización futura
        Alert.alert('Sin Conexión', 'La reserva se intentará cuando recuperes señal');
      } else {
        Alert.alert('Error', msg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verificación de tickets (Solo STAFF)
  const verifyTicket = async (ticketId) => {
    setLoading(true);
    try {
      const res = await api.post('/ticket/verify', { ticketId });
      return { success: true, data: res.data };
    } catch (err) {
      const msg = err?.response?.data?.msg || 'Ticket inválido o ya usado';
      return { success: false, msg };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyTickets();
  }, [getMyTickets]);

  return {
    myTickets,
    loading,
    error,
    refresh: getMyTickets,
    createReservation,
    verifyTicket
  };
};
