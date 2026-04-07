import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';
import { AppTextInput } from '../src/components/AppTextInput';
import { usePlaces } from '../src/hooks/usePlaces';
import { StyleSheet } from 'react-native';

const VenueCard = ({ id, name, location, capacity }) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.venueCard} 
      onPress={() => router.push(`/admin-availability?id=${id}`)}
      activeOpacity={0.8}
    >
      <Text style={styles.venueName}>{name}</Text>
      <Text style={styles.venueLocation}>{location}</Text>

      <View style={styles.venueFooter}>
        <Text style={styles.venueCapacity}>CAP: {capacity}</Text>

        <TouchableOpacity onPress={() => router.push('/admin-place-details')}>
          <Text style={styles.editVenueText}>EDIT VENUE</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function AdminManagePlacesScreen() {
  const router = useRouter();
  const { places, loading } = usePlaces();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MANAGE PLACES</Text>
        </View>

        {/* Search */}
        <AppTextInput placeholder="Filter for events" />

        {/* Add New Venue */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => router.push('/admin-new-venue')}
        >
          <Text style={styles.primaryButtonText}>+ ADD NEW VENUE</Text>
        </TouchableOpacity>

        {/* Venues List */}
        <View style={styles.venuesContainer}>
          {places.length > 0 ? (
            places.map((venue) => (
              <VenueCard
                key={venue._id}
                 id={venue._id}
                 name={venue.name}
                 location={venue.address?.city || 'Sin ubicación'}
                 capacity={venue.maxCapacity}
              />
              ))
          ) : (
            <Text style={{ color: '#94a3b8', textAlign: 'center', marginTop: 20 }}>
              {loading ? 'Cargando sedes...' : 'No hay sedes registradas todavía.'}
            </Text>
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
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  venuesContainer: {
    gap: 15,
  },
  venueCard: {
    backgroundColor: '#1a232e',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 16,
  },
  venueName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  venueLocation: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 10,
  },
  venueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  venueCapacity: {
    color: '#94a3b8',
    fontSize: 11,
  },
  editVenueText: {
    color: colors.secondary,
    fontSize: 11,
    fontWeight: '900',
  },
});
