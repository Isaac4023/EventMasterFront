import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  TextInput,
  RefreshControl,
  Image 
} from 'react-native';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';
import { useEvents } from '../src/hooks/useEvents';
import { useAuth } from '../src/hooks/useAuth';

/**
 * Dashboard Administrativo.
 * Permite monitorear el estado de ocupación de todos los eventos.
 */
export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { events, loading, refresh } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event => 
    (event.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DASHBOARD</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={refresh} 
            tintColor={colors.primary} 
          />
        }
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar eventos..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.eventsContainer}>
          {filteredEvents.map(event => {
            const occupied = event.totalCapacity - event.totalAvailable;
            const percentage = event.totalCapacity > 0
              ? Math.round((occupied / event.totalCapacity) * 100)
              : 0;

            return (
              <TouchableOpacity 
                key={event._id}
                style={styles.eventCard}
                onPress={() => router.push(`/admin-availability?id=${event._id}`)}
                activeOpacity={0.8}
              >
                {event.imageUrl ? (
                  <Image source={{ uri: event.imageUrl }} style={styles.cardImage} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderText}>SIN IMAGEN</Text>
                  </View>
                )}
                
                <View style={styles.cardContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventSubtitle}>{event.location} • {event.startTime ? new Date(event.startTime).toLocaleDateString() : ''}</Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressLabel}>OCUPACIÓN</Text>
                      <Text style={styles.percentageText}>{percentage}%</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                      <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
                    </View>
                    <Text style={styles.statsText}>
                      {occupied} / {event.totalCapacity} Reservas
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {!loading && filteredEvents.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron eventos activos.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNav activeRoute="tickets" role={user?.role} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 24,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  searchContainer: {
    marginBottom: 25,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 15,
    paddingHorizontal: 20,
    height: 50,
    color: '#fff',
    fontSize: 14,
  },
  eventsContainer: {
    gap: 20,
  },
  eventCard: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardImage: {
    height: 140,
    width: '100%',
  },
  imagePlaceholder: {
    height: 100,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#333',
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 1,
  },
  cardContent: {
    padding: 20,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  eventSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 25,
  },
  progressContainer: {
    marginTop: 5,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressLabel: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  percentageText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  statsText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  }
});