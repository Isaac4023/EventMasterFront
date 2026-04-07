import React, { useState } from 'react';
import api from '../src/services/api';
import { validators } from '../src/utils/validators';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Image, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';

// ─── Helpers ────────────────────────────────────────────────────────────────
const toISO = (date, time) => {
  // Combina la fecha y hora seleccionadas en formato ISO 8601
  // Ej.: 2026-11-15T09:00:00.000Z
  const [h, m] = time.split(':');
  const d = new Date(date);
  d.setHours(Number(h) || 0, Number(m) || 0, 0, 0);
  return d.toISOString();
};

const formatDisplayDate = (date) =>
  `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

export default function AdminNewEventScreen() {
  const router = useRouter();
  const [image, setImage] = useState(null);

  // ── Start fields ──────────────────────────────────────────────────────────
  const [startDate, setStartDate]       = useState(new Date());
  const [startDateText, setStartDateText] = useState('');
  const [startTimeText, setStartTimeText] = useState(''); // "HH:MM"
  const [showStartDate, setShowStartDate] = useState(false);

  // ── End fields ────────────────────────────────────────────────────────────
  const [endDate, setEndDate]         = useState(new Date());
  const [endDateText, setEndDateText] = useState('');
  const [endTimeText, setEndTimeText] = useState(''); // "HH:MM"
  const [showEndDate, setShowEndDate] = useState(false);

  // ── Form fields ───────────────────────────────────────────────────────────
  const [title, setTitle]       = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');

  // ── Image picker ──────────────────────────────────────────────────────────
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  // ── Date picker handlers ──────────────────────────────────────────────────
  const onChangeStartDate = (_, selected) => {
    setShowStartDate(Platform.OS === 'ios');
    if (selected) {
      setStartDate(selected);
      setStartDateText(formatDisplayDate(selected));
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


  if (!validators.required(title)) {
    return alert('El título es requerido');
  }

  if (!validators.required(location)) {
    return alert('La ubicación es requerida');
  }

  if (!validators.capacity(capacity)) {
    return alert('Capacidad inválida');
  }

  if (!validators.required(description)) {
    return alert('La descripción es requerida');
  }

  if (!validators.required(startDateText)) {
    return alert('Fecha de inicio requerida');
  }

  if (!validators.required(endDateText)) {
    return alert('Fecha de fin requerida');
  }

  // formato HH:MM
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(startTimeText)) {
    return alert('Hora de inicio inválida (HH:MM)');
  }

  if (!timeRegex.test(endTimeText)) {
    return alert('Hora de fin inválida (HH:MM)');
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

    await api.post('/event/new', payload);

    alert('Evento creado');
    router.back();

  } catch (error) {
    console.error(error.response?.data);
    alert('Error al crear evento');
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

        {/* Image Upload */}
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

          {/* Title */}
          <Text style={styles.fieldLabel}>NOMBRE DEL EVENTO</Text>
          <AppTextInput
            placeholder="Ej. Concierto de Rock 2026"
            value={title}
            onChangeText={setTitle}
          />

          {/* Location */}
          <Text style={styles.fieldLabel}>UBICACIÓN</Text>
          <AppTextInput
            placeholder="Ej. Auditorio Nacional"
            value={location}
            onChangeText={setLocation}
          />

          {/* ── Start DateTime ─────────────────────────────────────── */}
          <Text style={styles.fieldLabel}>FECHA DE INICIO</Text>
          {Platform.OS === 'web' ? (
            <AppTextInput
              placeholder="mm/dd/yyyy"
              value={startDateText}
              onChangeText={setStartDateText}
            />
          ) : (
            <TouchableOpacity onPress={() => setShowStartDate(true)}>
              <View pointerEvents="none">
                <AppTextInput placeholder="mm/dd/yyyy" value={startDateText} editable={false} />
              </View>
            </TouchableOpacity>
          )}
          {showStartDate && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onChangeStartDate}
            />
          )}

          <Text style={styles.fieldLabel}>HORA DE INICIO (HH:MM)</Text>
          <AppTextInput
            placeholder="Ej. 09:00"
            value={startTimeText}
            onChangeText={setStartTimeText}
            keyboardType="numbers-and-punctuation"
          />

          {/* ── End DateTime ───────────────────────────────────────── */}
          <Text style={styles.fieldLabel}>FECHA DE FIN</Text>
          {Platform.OS === 'web' ? (
            <AppTextInput
              placeholder="mm/dd/yyyy"
              value={endDateText}
              onChangeText={setEndDateText}
            />
          ) : (
            <TouchableOpacity onPress={() => setShowEndDate(true)}>
              <View pointerEvents="none">
                <AppTextInput placeholder="mm/dd/yyyy" value={endDateText} editable={false} />
              </View>
            </TouchableOpacity>
          )}
          {showEndDate && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
          )}

          <Text style={styles.fieldLabel}>HORA DE FIN (HH:MM)</Text>
          <AppTextInput
            placeholder="Ej. 18:00"
            value={endTimeText}
            onChangeText={setEndTimeText}
            keyboardType="numbers-and-punctuation"
          />

          {/* Capacity */}
          <Text style={styles.fieldLabel}>CAPACIDAD MÁXIMA</Text>
          <AppTextInput
            placeholder="Ej. 10000"
            value={capacity}
            onChangeText={setCapacity}
            keyboardType="numeric"
          />

          {/* Description */}
          <Text style={styles.fieldLabel}>DESCRIPCIÓN</Text>
          <View style={styles.textAreaContainer}>
            <AppTextInput
              placeholder="Descripción del evento..."
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
          </View>

        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleCreate}>
          <Text style={styles.primaryButtonText}>+ PUBLICAR EVENTO</Text>
        </TouchableOpacity>
      </ScrollView>
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
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  backText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerTitle: {
    color: colors.primary, fontSize: 16,
    fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase',
  },
  imageUploadArea: {
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    borderRadius: 24,
    height: 144,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20, overflow: 'hidden',
  },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  uploadIconContainer: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 2, borderColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 8,
  },
  uploadIconText: { color: '#fff', fontSize: 24, lineHeight: 28 },
  uploadHint: { color: '#94a3b8', fontSize: 10, fontWeight: '700' },
  formContainer: { gap: 8 },
  fieldLabel: {
    color: '#94a3b8', fontSize: 10,
    fontWeight: '700', letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 10, marginLeft: 4,
  },
  textAreaContainer: { height: 100 },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 50, paddingVertical: 15,
    alignItems: 'center', marginTop: 30,
  },
  primaryButtonText: {
    color: '#fff', fontSize: 12,
    fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase',
  },
});
