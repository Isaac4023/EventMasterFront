import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../src/services/api';
import { colors } from '../src/theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

export default function BookingConfirmScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get(`/event/${id}/availability`);
        setEvent(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchAvailability();
  }, [id]);

  const generateFakeQR = () => {
    return 'QR-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleConfirm = async () => {
    try {
      const newReservation = {
        id: Date.now().toString(),
        eventId: id,
        title: event.title,
        date: event.startTime,
        quantity,
        qr: generateFakeQR(),
        status: 'active',
      };

      const stored = await AsyncStorage.getItem('reservations');
      const reservations = stored ? JSON.parse(stored) : [];

      reservations.push(newReservation);

      await AsyncStorage.setItem('reservations', JSON.stringify(reservations));

      alert('Reserva confirmada');
      router.push('/tickets');

    } catch (error) {
      console.error(error);
    }
  };

  if (!event) {
    return <Text style={{ color: colors.text }}>Cargando...</Text>;
  }

  const totalOccupied = event.totalCapacity - event.totalAvailable;

  const increment = () =>
    setQuantity(prev => Math.min(prev + 1, event.totalAvailable));

  const decrement = () =>
    setQuantity(prev => Math.max(prev - 1, 1));

  const soldPercent = event.totalCapacity > 0
    ? (totalOccupied / event.totalCapacity) * 100
    : 0;

  return (
  <View style={{ flex: 1, backgroundColor: colors.background }}>
    <StatusBar barStyle="light-content" />

    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>

      <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>
        {event.title}
      </Text>

      <Text style={{ color: '#fff', textAlign: 'center', marginTop: 10 }}>
        Disponibles: {event.totalAvailable}
      </Text>

      <Text style={{ color: '#fff', textAlign: 'center' }}>
        Vendidos: {totalOccupied}
      </Text>

      <Text style={{ color: '#fff', textAlign: 'center', marginBottom: 20 }}>
        {Math.round(soldPercent)}% ocupación
      </Text>

      {/* CONTADOR */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={decrement}>
          <Text style={{ color: '#fff', fontSize: 20 }}>-</Text>
        </TouchableOpacity>

        <Text style={{ color: '#fff', marginHorizontal: 20 }}>
          {quantity}
        </Text>

        <TouchableOpacity onPress={increment}>
          <Text style={{ color: '#fff', fontSize: 20 }}>+</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÓN */}
      <TouchableOpacity onPress={handleConfirm} style={{ marginTop: 40 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          CONFIRMAR RESERVA
        </Text>
      </TouchableOpacity>

    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e151c',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#0d9a70',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  eventName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  eventDate: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 14,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#0a0e14',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fa6203',
    borderRadius: 10,
  },
  ticketsLabel: {
    color: '#fa6203',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 30,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(250, 98, 3, 0.35)',
    borderRadius: 24,
    height: 64,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  counterSide: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  counterSideText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  counterValue: {
    flex: 1,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#135b78',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
