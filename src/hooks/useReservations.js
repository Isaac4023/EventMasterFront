import { useState } from 'react';
import api from '../services/api';

/**
 * Hook para la gestión de reservas y tickets.
 * NOTA: Los endpoints de este módulo están marcados como PENDIENTES 
 * en el backend según el reporte de integración.
 */
export const useReservations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Crea una nueva reserva para un evento.
   * Endpoint esperado: POST /reservation
   */
  const createReservation = async (eventId, quantity = 1, zoneName = 'General') => {
    setLoading(true);
    setError(null);
    try {
      // Intentamos la petición al endpoint (fail-fast si no existe)
      const res = await api.post('/reservation', { eventId, quantity, zoneName });
      return { success: true, data: res.data };
    } catch (err) {
      setError(err.msg || 'Error al procesar la reserva. Endpoint no disponible.');
      return { success: false, msg: err.msg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene los tickets del usuario logueado.
   * Endpoint esperado: GET /reservation/me
   */
  const getMyReservations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/reservation/me');
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, msg: err.msg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verifica un ticket por QR (Solo Staff).
   * Endpoint esperado: POST /ticket/verify
   */
  const verifyTicket = async (ticketId) => {
    setLoading(true);
    try {
      const res = await api.post('/ticket/verify', { ticketId });
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, msg: err.msg };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createReservation,
    getMyReservations,
    verifyTicket
  };
};
