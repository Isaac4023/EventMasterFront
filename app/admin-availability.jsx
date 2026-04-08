import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../src/theme/colors';
import api from '../src/services/api';

/**
 * Pantalla de disponibilidad para el Administrador.
 * Muestra el calendario de ocupación de una sede o evento.
 */
export default function AdminAvailabilityScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Intentar obtener detalles del evento/disponibilidad
      const res = await api.get(`/event/${id}`);
      setEventData(res.data);
      
      // Simulación de días de ocupación (Placeholder para lógica de calendario real)
      setCalendarDays(Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        status: i % 7 === 0 ? 'busy' : i % 10 === 0 ? 'event' : 'empty'
      })));

    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DISPONIBILIDAD</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchData} tintColor={colors.primary} />
        }
      >
        <View style={styles.titleContainer}>
          <Text style={styles.venueName}>{eventData?.title || 'Cargando...'}</Text>
          <Text style={styles.subtitle}>{eventData?.location || 'Verificando agenda...'}</Text>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 50 }} />
        ) : (
          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <Text style={styles.monthText}>ABRIL</Text>
              <Text style={styles.yearText}>2026</Text>
            </View>
            
            <View style={styles.calendarGrid}>
              {calendarDays.map((item, index) => {
                let bgColor = 'rgba(255,255,255,0.03)';
                let fontColor = 'rgba(255,255,255,0.4)';

                if (item.status === 'busy') {
                  bgColor = 'rgba(255, 68, 68, 0.2)';
                  fontColor = '#ff4444';
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
              })}
            </View>

            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                <Text style={styles.legendText}>Evento Público</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: '#ff4444' }]} />
                <Text style={styles.legendText}>Ocupado</Text>
              </View>
            </View>
          </View>
        )}
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