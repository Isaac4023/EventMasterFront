import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, StatusBar } from 'react-native';
import { colors } from '../src/theme/colors';
import { EventCard } from '../src/components/EventCard';
import { BottomNav } from '../src/components/BottomNav';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Tech Conference 2026',
    subtitle: '30 de Marzo • Auditorio Central',
    salesPercentage: 15,
    primaryColor: '#0d9a70',
    imageUrl: null, // Si es nulo, el componente pintará el color primario simulando figma
  },
  {
    id: '2',
    title: 'Music Fest',
    subtitle: '05 de Abril • Estadio Norte',
    salesPercentage: 60,
    primaryColor: '#fa6203',
    imageUrl: null,
  }
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleEventPress = (id) => {
    // TODO: Navigate to Event Details
    console.log('Navigate to event', id);
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
  }
});
