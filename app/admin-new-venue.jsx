import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';

const CITIES = ['Mexico City, MX', 'Guadalajara, JAL', 'Monterrey, NL', 'Cancun, QR'];

export default function AdminNewVenueScreen() {
  const router = useRouter();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ADD NEW VENUE</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Image Upload Area */}
        <TouchableOpacity style={styles.imageUploadArea} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <>
              <View style={styles.uploadIconContainer}>
                <Text style={styles.uploadIconText}>+</Text>
              </View>
              <Text style={styles.uploadHint}>AGREGAR FOTO DE LA SEDE</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>VENUE NAME</Text>
          <AppTextInput placeholder="Ej. Estadio Metropolitano" />

          <Text style={styles.fieldLabel}>LOCATION</Text>
          <AppTextInput placeholder="Dirección / Ciudad" />
          
          <Text style={styles.fieldLabel}>CAPACITY</Text>
          <AppTextInput placeholder="Ej. 5000" keyboardType="numeric" />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>+ CREATE VENUE</Text>
        </TouchableOpacity>

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
  imageUploadArea: {
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    borderRadius: 24,
    height: 144,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadIconText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 22,
  },
  uploadHint: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
  },
  formContainer: {
    gap: 5,
  },
  fieldLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    width: '80%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  modalItemText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  }
});
