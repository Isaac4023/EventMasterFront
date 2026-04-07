import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, Text, TextInput, View } from 'react-native';
import { BottomNav } from '../src/components/BottomNav';
import { EventCard } from '../src/components/EventCard';
import { colors } from '../src/theme/colors';
import api from '../src/services/api';

export default function StaffHomeScreen() {
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await api.get('/event');
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    (event.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Buscar eventos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              subtitle={item.location}
              salesPercentage={0}
              primaryColor={'#fa6203'}
              onPress={() => router.push(`/staff-scanner?id=${item._id}`)}
            />
          )}
        />
      )}

      <BottomNav activeRoute="home" role="staff" />
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
  },
  searchContainer: {
    backgroundColor: '#1a232e',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 50,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 21,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchIcon: {
    width: 17,
    height: 17,
    marginRight: 10,
    tintColor: colors.textSecondary,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  }
});
