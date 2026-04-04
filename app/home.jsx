import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../src/theme/colors';
import { EventCard } from '../src/components/EventCard';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';

// TODO: Populate with data from API hook
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Rock Fest 2026',
    subtitle: 'March 28, 2026',
    salesPercentage: 60,
    primaryColor: '#fa6203',
    imageUrl: 'rockfest_placeholder',
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    AsyncStorage.getItem('userRole').then(r => {
      if (r) setRole(r);
    });
  }, []);

  const handleEventPress = (id) => {
    if (role === 'staff') {
      // NOTE: availability screen doesn't exist yet natively, 
      // maybe we do /admin-place-details? Or we create /availability
      // Temporarily doing /availability assuming it will be created if requested
      router.push(`/availability`);
    } else {
      router.push(`/event-details?id=${id}`);
    }
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
        <Image source={require('../assets/images/lupa.png')} style={styles.searchIcon} resizeMode="contain" />
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar eventos..."
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Listado Principal */}
      <FlatList
        data={MOCK_EVENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay eventos disponibles. Cargando desde API...</Text>}
        renderItem={({ item }) => (
          <EventCard 
            title={item.title}
            subtitle={item.subtitle}
            salesPercentage={item.salesPercentage}
            primaryColor={item.primaryColor}
            imageUrl={item.imageUrl}
            onPress={() => handleEventPress(item.id)}
          />
        )}
      />

      {/* Barra de Navegación */}
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
    paddingTop: 60, // Compensar el notch/barra de estado
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
    paddingBottom: 100, // Espacio para que el BottomNav no tape los ultimos items
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  }
});
