import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  StatusBar, 
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import { colors } from '../src/theme/colors';
import { TicketCard } from '../src/components/TicketCard';
import { BottomNav } from '../src/components/BottomNav';
import { useReservations } from '../src/hooks/useReservations';

/**
 * Pantalla de visualización de tickets/reservas del usuario.
 * Recupera datos de la API con soporte para visualización offline de datos cacheados.
 */
export default function TicketsScreen() {
  const { myTickets, loading, refresh } = useReservations();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MIS RESERVAS</Text>
      </View>

      <FlatList
        data={myTickets}
        keyExtractor={(item) => item._id || item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={refresh} 
            tintColor={colors.primary} 
          />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Aún no tienes reservaciones activas.
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <TicketCard 
            title={item.event?.title || 'Evento'}
            date={item.event?.startTime ? new Date(item.event.startTime).toLocaleDateString() : 'Pendiente'}
            status={item.status}
            // ID de reserva para cancelación futura si se implementa
            onCancel={() => {}} 
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
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 10,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  }
});
