import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, View, StatusBar, Image } from 'react-native';
import { BottomNav } from '../src/components/BottomNav';
import { EventCard } from '../src/components/EventCard';
import { useEvents } from '../src/hooks/useEvents';
import { colors } from '../src/theme/colors';
import { StyleSheet } from 'react-native';

export default function StaffHomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const { events, loading } = useEvents();

  const filteredEvents = events.filter(event =>
    (event.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>STAFF EVENTS</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/images/lupa.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar eventos..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* LISTA */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Cargando...' : 'No hay eventos disponibles'}
          </Text>
        }
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

      <BottomNav activeRoute="home" />
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