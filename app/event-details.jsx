import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../src/theme/colors';
import { AppButton } from '../src/components/AppButton';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EventDetailsScreen() {
  const router = useRouter();
  // Aquí se podrían extraer parámetros reales en un futuro:
  // const { id } = useLocalSearchParams();

  // TODO (Chuy): Reemplazar con datos del evento recibidos por params o desde la API
  const mockEvent = {
    title: '',
    date: '',
    description: '',
    imageUrl: null,
  };

  const handleReserve = () => {
    router.push('/booking-confirm');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={styles.placeholderSpace} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Imagen principal */}
        <View style={styles.imageContainer}>
          {mockEvent.imageUrl ? (
            <Image source={{ uri: mockEvent.imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>

        {/* Información del evento */}
        <Text style={styles.title}>{mockEvent.title}</Text>
        <Text style={styles.date}>{mockEvent.date}</Text>
        <Text style={styles.description}>{mockEvent.description}</Text>

        {/* Botón de Reserva personalizado con color naranja (Figma: #fa6203) */}
        <AppButton 
          title="RESERVAR AHORA" 
          onPress={handleReserve} 
          style={styles.reserveButton}
        />
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
