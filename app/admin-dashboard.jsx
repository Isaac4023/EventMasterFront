import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // TODO (Chuy): Poblar con eventos reales desde GET /event
  // Cada evento: { _id, title, description, location, startTime, endTime,
  //   status, totalCapacity, zones: [{ name, capacity, occupied, price }] }
  const [events, setEvents] = useState([]);

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
          {filteredEvents.map(event => (
            <TouchableOpacity 
              key={event.id} 
              style={styles.eventCard}
              onPress={() => router.push('/admin-availability')}
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
                    <View style={[styles.progressBarFill, { width: `${event.capacityPercentage}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{event.capacityPercentage}% Capacity</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {filteredEvents.length === 0 && (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{color: '#94a3b8'}}>No se encontraron eventos.</Text>
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
