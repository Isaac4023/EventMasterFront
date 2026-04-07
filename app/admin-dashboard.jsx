import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';
import { useEvents } from '../src/hooks/useEvents';

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const { events, loading } = useEvents();

  const filteredEvents = events.filter(event => 
    (event.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DASHBOARD</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar eventos..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Events List */}
        <View style={styles.eventsContainer}>
          {filteredEvents.map(event => {

            // ✅ CALCULAR AQUÍ (FUERA DEL JSX)
            const percentage = event.totalCapacity
              ? Math.round(
                  ((event.zones || []).reduce((s, z) => s + (z.occupied || 0), 0) /
                    event.totalCapacity) * 100
                )
              : 0;

            return (
              <TouchableOpacity 
                key={event._id}
                style={styles.eventCard}
                onPress={() => router.push(`/admin-availability?id=${event._id}`)}
                activeOpacity={0.8}
              >
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
                
                <View style={styles.cardContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBarBg}>
                      {/* ✅ USAR percentage AQUÍ */}
                      <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{percentage}% Capacity</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {filteredEvents.length === 0 && (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{color: '#94a3b8'}}>
                {loading ? 'Cargando eventos...' : 'No se encontraron eventos.'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNav activeRoute="tickets" role="admin" />
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
    paddingBottom: 100,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#1a232e',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
  },
  eventsContainer: {
    gap: 20,
  },
  eventCard: {
    backgroundColor: '#1a232e',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  placeholderText: {
    color: '#94a3b8',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardContent: {
    padding: 20,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 20,
  },
  progressContainer: {
    gap: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ff7a00',
    borderRadius: 4,
  },
  progressText: {
    color: '#ff7a00',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});