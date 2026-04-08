import React, { useState, useEffect } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../src/theme/colors';
import api from '../src/services/api';
import { useReservations } from '../src/hooks/useReservations';

/**
 * Pantalla de confirmación de reserva.
 * Verifica disponibilidad en tiempo real antes de permitir la transacción.
 */
export default function BookingConfirmScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { createReservation, loading: bookingLoading } = useReservations();

  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [fetching, setFetching] = useState(true);

  // Cargar disponibilidad actual del evento
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get(`/event/${id}/availability`);
        setEvent(res.data);
      } catch (error) {
        console.error('Error fetching availability:', error);
        Alert.alert('Error', 'No se pudo obtener la disponibilidad del evento');
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchAvailability();
  }, [id]);

  const increment = () => {
    if (event && quantity < event.totalAvailable) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrement = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleConfirm = async () => {
    try {
      // Por ahora la API parece manejar 1 reserva por llamada, 
      // si soporta cantidad la enviaremos, sino repetimos o informamos.
      await createReservation(id);
      router.replace('/tickets');
    } catch (error) {
      // El error ya es manejado por el hook
    }
  };

  if (fetching) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const totalOccupied = (event?.totalCapacity || 0) - (event?.totalAvailable || 0);
  const soldPercent = event?.totalCapacity > 0
    ? (totalOccupied / event.totalCapacity) * 100
    : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>DETALLES DE RESERVA</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.eventName}>{event?.title || 'Evento'}</Text>

        <Text style={styles.eventDate}>
          {event?.startTime ? new Date(event.startTime).toLocaleDateString(undefined, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          }) : ''}
        </Text>

        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${soldPercent}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.ticketsLabel}>
              {totalOccupied} / {event?.totalCapacity} VENDIDOS
            </Text>
            <Text style={styles.availabilityLabel}>
              {event?.totalAvailable} DISPONIBLES
            </Text>
          </View>
        </View>

        <View style={styles.counterContainer}>
          <TouchableOpacity 
            style={styles.counterBtn} 
            onPress={decrement}
            disabled={quantity <= 1}
          >
            <Text style={[styles.counterBtnText, quantity <= 1 && { opacity: 0.3 }]}>-</Text>
          </TouchableOpacity>

          <View style={styles.quantityDisplay}>
            <Text style={styles.counterValue}>{quantity}</Text>
            <Text style={styles.quantityLabel}>ENTRADA(S)</Text>
          </View>

          <TouchableOpacity 
            style={styles.counterBtn} 
            onPress={increment}
            disabled={event && quantity >= event.totalAvailable}
          >
            <Text style={[
              styles.counterBtnText, 
              event && quantity >= event.totalAvailable && { opacity: 0.3 }
            ]}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.confirmButton, bookingLoading && { opacity: 0.7 }]} 
          onPress={handleConfirm}
          disabled={bookingLoading || event?.totalAvailable === 0}
        >
          {bookingLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>
              {event?.totalAvailable === 0 ? 'AGOTADO' : 'CONFIRMAR RESERVA'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  eventName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDate: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 40,
    textTransform: 'capitalize',
  },
  progressSection: {
    marginBottom: 40,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketsLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  availabilityLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 50,
  },
  counterBtn: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
  },
  quantityDisplay: {
    flex: 1,
    alignItems: 'center',
  },
  counterValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantityLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});
