import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export const EventCard = ({ 
  title, 
  subtitle, // Ej: '30 de Marzo • Auditorio Central'
  salesPercentage, // Ej: 60 (para 60%)
  primaryColor = '#fa6203', // Naranja por defecto
  imageUrl,
  onPress,
  buttonText = 'VER BOLETOS'
}) => {
  return (
    <View style={styles.card}>
      {/* Si viene la imagen de la API la mostramos, sino usamos el gradiente simulado de figma */}
      <View style={[styles.imageContainer, !imageUrl && { backgroundColor: primaryColor }]}>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>

        {/* Barra de progreso de tickets */}
        <View style={styles.progressBarBackground}>
          <View 
            style={[styles.progressBarFill, { width: `${salesPercentage}%`, backgroundColor: primaryColor }]} 
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a232e',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    minHeight: 117,
    marginBottom: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 18,
    marginRight: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 11,
    marginBottom: 10,
  },
  progressBarBackground: {
    backgroundColor: '#0a0e14',
    height: 6,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#135b78',
    paddingVertical: 6,
    borderRadius: 50,
    width: 112,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
