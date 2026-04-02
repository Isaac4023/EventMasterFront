import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';

const LOCATIONS = ['Mexico City, MX', 'Guadalajara, JAL', 'Monterrey, NL', 'Cancun, QR'];

export default function AdminPlaceDetailsScreen() {
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
          <TouchableOpacity onPress={() => router.back()} style={styles.absoluteBackButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PLACE DETAILS</Text>
        </View>

        {/* Image Upload Area */}
        <View style={styles.imageUploadWrapper}>
          <TouchableOpacity style={styles.imageUploadArea} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
              <View style={styles.uploadIconContainer}>
                <Text style={styles.uploadIconText}>+</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.uploadHint}>REPLACE PHOTO</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>VENUE NAME</Text>
          <AppTextInput 
            placeholder="Estadio Azteca"
            placeholderTextColor="#94a3b8"
            style={styles.compactInput} 
          />

          <Text style={styles.fieldLabel}>LOCATION</Text>
          <AppTextInput 
            placeholder="Mexico City, MX"
            placeholderTextColor="#94a3b8"
            style={styles.compactInput}
          />
          
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>CAPACITY</Text>
              <AppTextInput 
                placeholder="87,000" 
                keyboardType="numeric" 
                style={styles.compactInput}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>STATUS</Text>
              <AppTextInput 
                placeholder="Active"
                style={styles.compactInput}
              />
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>UPDATE INFORMATION</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>ARCHIVE VENUE</Text>
          </TouchableOpacity>
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
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  absoluteBackButton: {
    position: 'absolute',
    left: 0,
    top: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  imageUploadWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageUploadArea: {
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.05)',
    borderStyle: 'dashed',
    borderRadius: 24,
    width: '100%',
    height: 144,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconText: {
    color: '#fff',
    fontSize: 26,
    lineHeight: 28,
  },
  uploadHint: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
  },
  formContainer: {
    gap: 0,
  },
  fieldLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginTop: 15,
    marginBottom: 8,
    marginLeft: 0,
    textTransform: 'uppercase',
  },
  compactInput: {
    marginVertical: 0,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#1e293b',
    borderColor: 'rgba(255,255,255,0.05)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  halfField: {
    flex: 1,
  },
  buttonsContainer: {
    marginTop: 50,
    gap: 20,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dangerButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#ff4444',
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
