import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../src/theme/colors';
import api from '../src/services/api';

export default function AdminAvailabilityScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get(`/event/${id}/availability`);
        setEvent(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchAvailability();
  }, [id]);

  if (!event) {
    return <Text style={{ color: '#fff' }}>Cargando disponibilidad...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />

      <ScrollView>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#fff' }}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={{ color: '#fff', fontSize: 18 }}>
          {event.title}
        </Text>

        <Text style={{ color: '#fff' }}>
          Capacidad total: {event.totalCapacity}
        </Text>

        <Text style={{ color: '#fff' }}>
          Disponibles: {event.totalAvailable}
        </Text>

        {/* ZONAS */}
        {event.zones.map((zone, idx) => (
          <View key={idx} style={{ marginTop: 10 }}>
            <Text style={{ color: '#fff' }}>
              {zone.name}
            </Text>
            <Text style={{ color: '#aaa' }}>
              {zone.occupied}/{zone.capacity} ocupados
            </Text>
            <Text style={{ color: '#aaa' }}>
              Disponibles: {zone.available}
            </Text>
            <Text style={{ color: '#aaa' }}>
              Precio: ${zone.price}
            </Text>
          </View>
        ))}
      </ScrollView>
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
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
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
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  titleContainer: {
    marginBottom: 20,
  },
  venueName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  calendarCard: {
    backgroundColor: '#1a232e',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 30,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  yearText: {
    color: colors.primary,
    fontSize: 14,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
  calendarCell: {
    width: '12%', // roughly fit 7 in a row with gap
    aspectRatio: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 11,
    fontWeight: '500',
  },
  bookingsSection: {
    gap: 15,
  },
  bookingsTitle: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  bookingItem: {
    borderLeftWidth: 3,
    paddingLeft: 12,
    justifyContent: 'center',
    height: 45,
  },
  bookingName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bookingDate: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  }
});
