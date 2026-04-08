import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  StatusBar,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { EventCard } from '../src/components/EventCard';
import { BottomNav } from '../src/components/BottomNav';
import { useEvents } from '../src/hooks/useEvents';
import { useAuth } from '../src/hooks/useAuth';

/**
 * Pantalla principal del cliente.
 * Muestra el feed de eventos próximos y redirige a admin/staff si corresponde.
 */
export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { events, loading, refresh } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');

  // Redirección por rol al montar
  useEffect(() => {
    if (user?.role === 'admin') {
      router.replace('/admin-home');
    } else if (user?.role === 'staff') {
      router.replace('/staff-home');
    }
  }, [user]);

  const handleEventPress = (id) => {
    router.push(`/event-details?id=${id}`);
  };

  const filteredEvents = events.filter(event => {
    const query = searchQuery.toLowerCase();
    return (
      event.title?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>EVENT MASTER</Text>
      </View>

      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/images/lupa.png')}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar eventos o ciudades..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
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
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No se encontraron eventos para tu búsqueda.
              </Text>
            </View>
          ) : (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 20 }} />
          )
        }
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            location={item.location}
            date={item.startTime}
            salesPercentage={
              item.totalCapacity > 0
                ? Math.round(((item.totalCapacity - item.totalAvailable) / item.totalCapacity) * 100)
                : 0
            }
            primaryColor={colors.primary}
            imageUrl={item.imageUrl}
            onPress={() => handleEventPress(item._id)}
          />
        )}
      />

      <BottomNav activeRoute="home" role={user?.role} />
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
  },
  searchContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 25,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    tintColor: colors.textSecondary,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 14,
    fontWeight: '600',
  },
});
