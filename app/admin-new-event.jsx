import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';

const LOCATIONS = ['Estadio Azteca, CDMX', 'Auditorio Nacional, CDMX', 'Arena Monterrey, NL', 'Foro Sol, CDMX'];

export default function AdminNewEventScreen() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  
  const [dateText, setDateText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
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

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const formatted = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
      setDateText(formatted);
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
          <Text style={styles.headerTitle}>NUEVO EVENTO</Text>
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
              <Text style={styles.uploadHint}>AGREGAR FOTO</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <AppTextInput placeholder="Nombre del Evento" />
          
          <AppTextInput 
            placeholder="Ubicación" 
          />

          {Platform.OS === 'web' ? (
            <AppTextInput 
              placeholder="mm/dd/yyyy" 
              value={dateText}
              onChangeText={setDateText}
            />
          ) : (
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View pointerEvents="none">
                <AppTextInput 
                  placeholder="mm/dd/yyyy" 
                  value={dateText} 
                  editable={false} 
                />
              </View>
            </TouchableOpacity>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <AppTextInput placeholder="Capacidad Máxima" keyboardType="numeric" />
          
          {/* Custom Text Area for Description */}
          <View style={[styles.textAreaContainer]}>
            <AppTextInput placeholder="Descripción..." multiline={true} numberOfLines={4} />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>+ PUBLICAR EVENTO</Text>
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
    fontSize: 16,
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
    marginBottom: 20,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadIconText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 28,
  },
  uploadHint: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
  },
  formContainer: {
    gap: 15,
  },
  textAreaContainer: {
    height: 100,
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
    fontSize: 12,
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
