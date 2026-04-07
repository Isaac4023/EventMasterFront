import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../src/theme/colors';
import { useRouter } from 'expo-router';
import { BottomNav } from '../src/components/BottomNav';
import { AppTextInput } from '../src/components/AppTextInput';
import api from '../src/services/api';

export default function AdminManagePlacesScreen() {
  const router = useRouter();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await api.get('/places');
        setVenues(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <ScrollView>
        <Text>MANAGE PLACES</Text>

        <AppTextInput placeholder="Buscar..." />

        <TouchableOpacity onPress={() => router.push('/admin-new-venue')}>
          <Text>+ ADD NEW VENUE</Text>
        </TouchableOpacity>

        {venues.length > 0 ? (
          venues.map((venue) => (
            <TouchableOpacity
              key={venue._id}
              onPress={() => router.push(`/admin-availability?id=${venue._id}`)}
            >
              <Text>{venue.name}</Text>
              <Text>{venue.address?.city}</Text>
              <Text>Cap: {venue.maxCapacity}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay sedes</Text>
        )}
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
