import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../src/theme/colors';
import { EventCard } from '../src/components/EventCard';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';

// 🔥 NUEVO
import { useEvents } from '../src/hooks/useEvents';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState('user');

  // 🔥 Hook de eventos
  const { events, loading } = useEvents();

  useEffect(() => {
    AsyncStorage.getItem('userRole').then((r) => {
      if (r) setRole(r);
    });
  }, []);

  const handleEventPress = (id) => {
    router.push(`/event-details?id=${id}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EVENT MASTER</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/images/lupa.png')}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar eventos..."
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Lista */}
      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Cargando eventos...' : 'No hay eventos disponibles'}
          </Text>
        }
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            subtitle={`${item.location} • ${
              item.startTime
                ? new Date(item.startTime).toLocaleDateString()
                : ''
            }`}
            salesPercentage={
              item.totalCapacity
                ? Math.round(
                    ((item.zones || []).reduce(
                      (s, z) => s + (z.occupied || 0),
                      0
                    ) /
                      item.totalCapacity) *
                      100
                  )
                : 0
            }
            primaryColor={'#fa6203'}
            imageUrl={item.imageUrl}
            onPress={() => handleEventPress(item._id)}
          />
        )}
      />

      {/* BottomNav */}
      <BottomNav activeRoute="home" role={role} />
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
    fontWeight: '300',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
});
