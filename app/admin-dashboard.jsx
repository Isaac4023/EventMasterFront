import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';
import { useEvents } from '../src/hooks/useEvents';
import { colors } from '../src/theme/colors';

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const { events } = useEvents();

  const filteredEvents = events.filter(event =>
    (event.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TextInput
          placeholder="Buscar eventos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {filteredEvents.map(event => (
          <TouchableOpacity
            key={event._id}
            onPress={() => router.push(`/admin-availability?id=${event._id}`)}
          >
            <Text>{event.title}</Text>
          </TouchableOpacity>
        ))}
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
