import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StatusBar, Alert } from 'react-native';
import { colors } from '../src/theme/colors';
import { TicketCard } from '../src/components/TicketCard';
import { BottomNav } from '../src/components/BottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

export default function TicketsScreen() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const stored = await AsyncStorage.getItem('reservations');
        if (stored) {
          setReservations(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    };

    loadReservations();
  }, []);

  const handleCancel = async (id) => {
    Alert.alert(
      'Cancelar Reserva',
      '¿Estás seguro de que deseas cancelar tu asistencia a este evento?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sí, cancelar', 
          style: 'destructive',
          onPress: async () => {
            try {
              const updated = reservations.filter(r => r.id !== id);
              setReservations(updated);
              await AsyncStorage.setItem('reservations', JSON.stringify(updated));
            } catch (error) {
              console.error(error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />

      <View>
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>
          MY RESERVATIONS
        </Text>
      </View>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>
            No tienes reservaciones activas ni finalizadas.
          </Text>
        }
        renderItem={({ item }) => (
  <TicketCard 
    title={item.title}
    date={new Date(item.date).toLocaleDateString()}
    status={'active'}
    qr={item.qr}
    onCancel={() => handleCancel(item.id)}
  />
)}
      />

      <BottomNav activeRoute="tickets" />
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
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espacio para el BottomNav
    paddingTop: 10,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  }
});
