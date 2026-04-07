import React from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity
} from 'react-native';
import { colors } from '../src/theme/colors';
import { AppButton } from '../src/components/AppButton';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEvents } from '../src/hooks/useEvents';
import { StyleSheet } from 'react-native';

export default function EventDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { events, loading } = useEvents();

  // fallback para evitar errores
  const mockEvent = {
    title: '',
    description: '',
    location: '',
    startTime: '',
    imageUrl: null,
  };

  const event = events.find(e => e._id === id) || mockEvent;

  const handleReserve = () => {
    router.push(`/booking-confirm?id=${id}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: colors.text }}>Cargando evento...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
      </View>

      <ScrollView>

        {/* Imagen */}
        <View>
          {event.imageUrl ? (
            <Image source={{ uri: event.imageUrl }} style={styles.image} />
          ) : (
            <Image
              source={require('../assets/images/miimagen.jpg')}
              style={styles.image}
            />
          )}
        </View>

        {/* Info */}
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>

          <Text style={styles.subtitle}>
            {event.startTime
              ? new Date(event.startTime).toLocaleDateString()
              : ''} • {event.location}
          </Text>

          <Text style={styles.description}>
            {event.description}
          </Text>

          <AppButton
            title="RESERVAR AHORA"
            onPress={handleReserve}
          />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
    marginLeft: -10,
  },
  backText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  placeholderSpace: {
    width: 30, // Para balancear el flex del header
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e293b',
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  date: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 40,
  },
  reserveButton: {
    backgroundColor: '#fa6203', // Color naranja exacto de Figma
  },
});
