import React, { useState } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity, 
  StatusBar, 
  Image, 
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';
import { validators } from '../src/utils/validators';
import { useEvents } from '../src/hooks/useEvents';

/**
 * Pantalla de creación de eventos para administradores y organizadores.
 * Valida formatos de fecha ISO y capacidades antes de la persistencia.
 */

// Combina fecha y hora seleccionada en un string ISO 8601
const toISO = (date, time) => {
  const [h, m] = time.split(':');
  const d = new Date(date);
  d.setHours(Number(h) || 0, Number(m) || 0, 0, 0);
  return d.toISOString();
};

const formatDisplayDate = (date) =>
  `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

export default function AdminNewEventScreen() {
  const router = useRouter();
  const { createEvent, loading } = useEvents();
  
  const [image, setImage] = useState(null);

  // Estados de Fecha y Hora
  const [startDate, setStartDate] = useState(new Date());
  const [startDateText, setStartDateText] = useState('');
  const [startTimeText, setStartTimeText] = useState('');
  const [showStartDate, setShowStartDate] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [endDateText, setEndDateText] = useState('');
  const [endTimeText, setEndTimeText] = useState('');
  const [showEndDate, setShowEndDate] = useState(false);

  // Campos del Formulario
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const onChangeStartDate = (_, selected) => {
    setShowStartDate(Platform.OS === 'ios');
    if (selected) {
      setStartDate(selected);
      setStartDateText(formatDisplayDate(selected));
      if (errors.startDate) setErrors(prev => ({...prev, startDate: ''}));
    }
  };

  const onChangeEndDate = (_, selected) => {
    setShowEndDate(Platform.OS === 'ios');
    if (selected) {
      setEndDate(selected);
      setEndDateText(formatDisplayDate(selected));
    }
  };

  const handleCreate = async () => {
    const newErrors = {};
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!validators.required(title)) newErrors.title = 'Requerido';
    if (!validators.required(location)) newErrors.location = 'Requerido';
    if (!validators.capacity(capacity)) newErrors.capacity = 'Número > 0';
    if (!validators.required(description)) newErrors.description = 'Requerido';
    if (!validators.required(startDateText)) newErrors.startDate = 'Requerido';
    if (!timeRegex.test(startTimeText)) newErrors.startTime = 'HH:MM';
    if (!timeRegex.test(endTimeText)) newErrors.endTime = 'HH:MM';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        title,
        description,
        startTime: toISO(startDate, startTimeText),
        endTime: toISO(endDate, endTimeText),
        location,
        totalCapacity: Number(capacity),
        status: 'published',
      };

      await createEvent(payload);
      router.back();

    } catch (error) {
      console.error('Create event failure:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NUEVO EVENTO</Text>
          <View style={{ width: 40 }} />
        </View>

        <TouchableOpacity style={styles.imageUploadArea} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <View style={{ alignItems: 'center' }}>
              <View style={styles.uploadIconContainer}>
                <Text style={styles.uploadIconText}>+</Text>
              </View>
              <Text style={styles.uploadHint}>AGREGAR PORTADA</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>NOMBRE DEL EVENTO</Text>
          <AppTextInput
            placeholder="Ej. Gala Estelar 2026"
            value={title}
            onChangeText={(t) => { setTitle(t); if(errors.title) setErrors({...errors, title: ''}); }}
            error={!!errors.title}
            errorMessage={errors.title}
          />

          <Text style={styles.fieldLabel}>UBICACIÓN / RECINTO</Text>
          <AppTextInput
            placeholder="Ej. Centro de Convenciones"
            value={location}
            onChangeText={(t) => { setLocation(t); if(errors.location) setErrors({...errors, location: ''}); }}
            error={!!errors.location}
            errorMessage={errors.location}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.fieldLabel}>FECHA INICIO</Text>
              <TouchableOpacity onPress={() => setShowStartDate(true)}>
                <View pointerEvents="none">
                  <AppTextInput 
                    value={startDateText} 
                    editable={false} 
                    placeholder="mm/dd/yyyy" 
                    error={!!errors.startDate}
                    errorMessage={errors.startDate}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>HORA (HH:MM)</Text>
              <AppTextInput
                placeholder="09:00"
                value={startTimeText}
                onChangeText={(t) => { setStartTimeText(t); if(errors.startTime) setErrors({...errors, startTime: ''}); }}
                keyboardType="numbers-and-punctuation"
                error={!!errors.startTime}
                errorMessage={errors.startTime}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.fieldLabel}>FECHA FIN</Text>
              <TouchableOpacity onPress={() => setShowEndDate(true)}>
                <View pointerEvents="none">
                  <AppTextInput value={endDateText} editable={false} placeholder="mm/dd/yyyy" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>HORA (HH:MM)</Text>
              <AppTextInput
                placeholder="21:00"
                value={endTimeText}
                onChangeText={(t) => { setEndTimeText(t); if(errors.endTime) setErrors({...errors, endTime: ''}); }}
                keyboardType="numbers-and-punctuation"
                error={!!errors.endTime}
                errorMessage={errors.endTime}
              />
            </View>
          </View>

          <Text style={styles.fieldLabel}>AFORO / CAPACIDAD</Text>
          <AppTextInput
            placeholder="Ej. 5000"
            value={capacity}
            onChangeText={(t) => { setCapacity(t); if(errors.capacity) setErrors({...errors, capacity: ''}); }}
            keyboardType="numeric"
            error={!!errors.capacity}
            errorMessage={errors.capacity}
          />

          <Text style={styles.fieldLabel}>DESCRIPCIÓN DEL EVENTO</Text>
          <AppTextInput
            placeholder="Detalles sobre el evento..."
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={(t) => { setDescription(t); if(errors.description) setErrors({...errors, description: ''}); }}
            style={{ height: 100, textAlignVertical: 'top' }}
            error={!!errors.description}
            errorMessage={errors.description}
          />
        </View>

        <TouchableOpacity 
          style={[styles.primaryButton, loading && { opacity: 0.7 }]} 
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>PUBLICAR EVENTO</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {showStartDate && (
        <DateTimePicker value={startDate} mode="date" display="default" onChange={onChangeStartDate} />
      )}
      {showEndDate && (
        <DateTimePicker value={endDate} mode="date" display="default" onChange={onChangeEndDate} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 50 },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44, height: 44,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 22,
  },
  backText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  headerTitle: {
    color: colors.primary, fontSize: 13,
    fontWeight: '900', letterSpacing: 2,
  },
  imageUploadArea: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    borderRadius: 20,
    height: 160,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 25, overflow: 'hidden',
  },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  uploadIconContainer: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1.5, borderColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 10,
  },
  uploadIconText: { color: colors.primary, fontSize: 24, fontWeight: '300' },
  uploadHint: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  formContainer: { gap: 15 },
  row: { flexDirection: 'row', width: '100%' },
  fieldLabel: {
    color: colors.textSecondary, fontSize: 9,
    fontWeight: '800', letterSpacing: 1.5,
    marginBottom: 8, marginLeft: 2,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12, paddingVertical: 18,
    alignItems: 'center', marginTop: 40,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff', fontSize: 12,
    fontWeight: '900', letterSpacing: 2,
  },
});
