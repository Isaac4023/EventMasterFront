import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Alert } from 'react-native';
import { colors } from '../src/theme/colors';
import { TicketCard } from '../src/components/TicketCard';
import { BottomNav } from '../src/components/BottomNav';

// TODO: Populate with data from API hook
const MOCK_RESERVATIONS = [
  {
    id: '1',
    title: 'Rock Fest',
    date: 'March 28, 2026',
    status: 'active',
  },
  {
    id: '2',
    title: 'Tech Expo',
    date: 'Completed',
    status: 'completed',
  },
];

export default function TicketsScreen() {
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);

  const handleCancel = (id) => {
    Alert.alert(
      'Cancelar Reserva',
      '¿Estás seguro de que deseas cancelar tu asistencia a este evento?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sí, cancelar', 
          style: 'destructive',
          onPress: () => {
            console.log('Cancelar evento', id);
            // TODO: Call API to cancel reservation
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MY RESERVATIONS</Text>
      </View>

      {/* Lista de Reservaciones */}
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No tienes reservaciones activas ni finalizadas.</Text>}
        renderItem={({ item }) => (
          <TicketCard 
            title={item.title}
            date={item.date}
            status={item.status}
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
