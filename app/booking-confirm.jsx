import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../src/theme/colors';
import api from '../src/services/api';

export default function BookingConfirmScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/event/${id}/availability`);
        setEvent(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  // 🔥 MOCK SI NO HAY DATA
  const mockEvent = {
    title: 'Evento demo',
    startTime: new Date().toISOString(),
    totalCapacity: 100,
    totalAvailable: 50,
  };

  const currentEvent = event || mockEvent;

  const totalOccupied = currentEvent.totalCapacity - currentEvent.totalAvailable;

  const increment = () =>
    setQuantity(prev => Math.min(prev + 1, currentEvent.totalAvailable || 1));

  const decrement = () =>
    setQuantity(prev => Math.max(prev - 1, 1));

  const soldPercent = currentEvent.totalCapacity > 0
    ? (totalOccupied / currentEvent.totalCapacity) * 100
    : 0;

  const handleConfirm = () => {
    alert('Reserva completada con éxito');
    router.push('/tickets');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>EVENT NAME</Text>
      </View>

      <View style={styles.content}>

        <Text style={styles.eventName}>{currentEvent.title}</Text>

        <Text style={styles.eventDate}>
          {currentEvent.startTime
            ? new Date(currentEvent.startTime).toLocaleDateString()
            : ''}
        </Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${soldPercent}%` }]} />
        </View>

        <Text style={styles.ticketsLabel}>
          {totalOccupied}/{currentEvent.totalCapacity} Tickets Sold
        </Text>

        <View style={styles.counterContainer}>
          <TouchableOpacity style={styles.counterSide} onPress={decrement}>
            <Text style={styles.counterSideText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.counterValue}>{quantity}</Text>

          <TouchableOpacity style={styles.counterSide} onPress={increment}>
            <Text style={styles.counterSideText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>CONFIRMAR RESERVA</Text>
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
