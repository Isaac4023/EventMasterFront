import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { BottomNav } from '../src/components/BottomNav';
import { EventCard } from '../src/components/EventCard';
import { colors } from '../src/theme/colors';

export default function StaffHomeScreen() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // TODO (Chuy): Llamar GET /event y poblar el array
  // Cada evento: { _id, title, description, location, startTime, endTime,
  //   status, totalCapacity, zones: [{ name, capacity, occupied, price }] }
  const fetchEvents = async () => {
    try {
      setLoading(true);
      // const res = await api.get('/event');
      // setEvents(res.data);
      setEvents([]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventPress = (eventId) => {
    router.push('/staff-scanner');
  };

  const filteredEvents = events.filter(event => 
    (event.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EVENT MASTER</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image source={require('../assets/images/lupa.png')} style={styles.searchIcon} resizeMode="contain" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar eventos..."
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Events List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={{ color: '#fff' }}>Cargando eventos...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay eventos disponibles.</Text>}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              subtitle={`${item.location || ''} • ${item.startTime ? new Date(item.startTime).toLocaleDateString() : ''}`}
              salesPercentage={item.totalCapacity ? Math.round(((item.zones || []).reduce((s, z) => s + (z.occupied || 0), 0) / item.totalCapacity) * 100) : 0}
              primaryColor={'#fa6203'}
              imageUrl={item.imageUrl}
              onPress={() => handleEventPress(item._id)}
              buttonText="VER DETALLES"
            />
          )}
        />
      )}

      {/* Barra de Navegación */}
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
