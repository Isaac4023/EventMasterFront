import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../src/theme/colors';
import api from '../src/services/api';

export default function AdminAvailabilityScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [calendarDays, setCalendarDays] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/event/${id}/availability`);

        setCalendarDays([
          { day: 1, status: 'event' },
          { day: 2, status: 'busy' },
          { day: 3, status: 'empty' },
        ]);

        setBookings([
          {
            name: res.data?.title || 'Evento',
            date: new Date().toLocaleDateString(),
            time: '18:00',
          }
        ]);

      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AVAILABILITY</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.venueName}>Estadio Azteca</Text>
          <Text style={styles.subtitle}>Occupancy Schedule</Text>
        </View>

        {/* Calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthText}>Mes Actual</Text>
            <Text style={styles.yearText}>2026</Text>
          </View>
          
          <View style={styles.calendarGrid}>
            {calendarDays.length > 0 ? calendarDays.map((item, index) => {
              let bgColor = '#1e293b';
              let fontColor = '#fff';

              if (item.status === 'busy') {
                bgColor = 'rgba(255, 68, 68, 0.6)';
              }

              if (item.status === 'event') {
                bgColor = colors.primary;
                fontColor = '#fff';
              }

              return (
                <View key={index} style={[styles.calendarCell, { backgroundColor: bgColor }]}>
                  <Text style={[styles.cellText, { color: fontColor }]}>
                    {item.day}
                  </Text>
                </View>
              );
            }) : (
              <Text style={{color: '#94a3b8', fontSize: 12}}>
                Cargando calendario...
              </Text>
            )}
          </View>
        </View>

        {/* Bookings */}
        <View style={styles.bookingsSection}>
          <Text style={styles.bookingsTitle}>CONFIRMED BOOKINGS</Text>
          
          {bookings.length > 0 ? (
            bookings.map((booking, idx) => (
              <View key={idx} style={[styles.bookingItem, { borderLeftColor: colors.primary }]}>
                <Text style={styles.bookingName}>{booking.name}</Text>
                <Text style={styles.bookingDate}>{booking.date} • {booking.time}</Text>
              </View>
            ))
          ) : (
            <Text style={{color: '#94a3b8'}}>
              No hay eventos confirmados por ahora.
            </Text>
          )}
        </View>

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