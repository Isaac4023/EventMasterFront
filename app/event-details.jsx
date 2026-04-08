import React, { useState, useEffect } from 'react';
import {
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { colors } from '../src/theme/colors';
import { AppButton } from '../src/components/AppButton';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEvents } from '../src/hooks/useEvents';
import { formatting } from '../src/helpers/formatting';

/**
 * Pantalla de detalles de un evento específico.
 * Muestra información completa y permite iniciar el proceso de reserva.
 */
export default function EventDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { event, loadingEvent, getEventById } = useEvents();

  useEffect(() => {
    if (id) getEventById(id);
  }, [id, getEventById]);

  const handleReserve = () => {
    router.push(`/booking-confirm?id=${id}`);
  };

  if (loadingEvent) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={{ color: colors.textSecondary }}>Evento no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETALLES</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          {event.imageUrl ? (
            <Image source={{ uri: event.imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
               <Text style={{ color: '#444' }}>Sin Imagen</Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{event.location || 'Ubicación'}</Text>
            </View>
            <Text style={styles.dateText}>
              {event.startTime ? formatting.date(event.startTime) : ''}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SOBRE EL EVENTO</Text>
            <Text style={styles.description}>
              {event.description || 'Sin descripción disponible.'}
            </Text>
          </View>

          <View style={styles.bottomSpace} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title="RESERVAR ENTRADAS"
          onPress={handleReserve}
          disabled={event.totalAvailable === 0}
        />
        {event.totalAvailable === 0 && (
          <Text style={styles.soldOutText}>AGOTADO</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 24,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  imageWrapper: {
    height: 250,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 25,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 15,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  dateText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 12,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 24,
  },
  footer: {
    padding: 25,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    backgroundColor: colors.background,
  },
  soldOutText: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 10,
    fontWeight: '900',
  },
  bottomSpace: {
    height: 50,
  }
});
