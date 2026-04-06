import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';

export default function AdminNewVenueScreen() {
  const router = useRouter();
  const [image, setImage] = useState(null);

  // ── Campos requeridos por POST /places ────────────────────────────────────
  const [name, setName]           = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');

  // location → GeoJSON { type: "Point", coordinates: [lng, lat] }
  const [latitude, setLatitude]   = useState('');
  const [longitude, setLongitude] = useState('');

  // address (requerido en el schema)
  const [street, setStreet]       = useState('');
  const [city, setCity]           = useState('');
  const [state, setState]         = useState('');
  const [country, setCountry]     = useState('');
  const [zipCode, setZipCode]     = useState('');

  // Opcionales
  const [contactPhone, setContactPhone] = useState('');

  // ── Image picker ──────────────────────────────────────────────────────────
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  // TODO (Chuy): Usar este payload en POST /places con JWT en header x-auth-token
  // Requiere rol admin. La API también acepta defaultZones y amenities (opcionales).
  // const payload = {
  //   name,
  //   maxCapacity: Number(maxCapacity),
  //   location: {
  //     type: "Point",
  //     coordinates: [Number(longitude), Number(latitude)],  // ← [lng, lat] orden GeoJSON
  //   },
  //   address: { street, city, state, country, zipCode },
  //   contactPhone,       // opcional
  //   defaultZones: [],   // opcional: [{ name: "VIP", capacity: 5000, description: "..." }]
  //   amenities: [],      // opcional: ["Parking", "WiFi", "Accesibilidad"]
  // };

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

        {/* Image Upload */}
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

        {/* ── Form ─────────────────────────────────────────────────────────── */}
        <View style={styles.formContainer}>

          {/* Name */}
          <Text style={styles.fieldLabel}>VENUE NAME</Text>
          <AppTextInput
            placeholder="Ej. Estadio Metropolitano"
            value={name}
            onChangeText={setName}
          />

          {/* Capacity */}
          <Text style={styles.fieldLabel}>MAX CAPACITY</Text>
          <AppTextInput
            placeholder="Ej. 22000"
            value={maxCapacity}
            onChangeText={setMaxCapacity}
            keyboardType="numeric"
          />

          {/* ── Coordinates (GeoJSON requerido por la API) ────────────────── */}
          <Text style={styles.sectionLabel}>COORDENADAS (GEOLOCALIZACIÓN)</Text>
          <Text style={styles.hint}>
            Puedes obtenerlas en Google Maps → clic derecho sobre el lugar.
          </Text>

          <Text style={styles.fieldLabel}>LATITUD</Text>
          <AppTextInput
            placeholder="Ej. 19.4975"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="decimal-pad"
          />

          <Text style={styles.fieldLabel}>LONGITUD</Text>
          <AppTextInput
            placeholder="Ej. -99.1764"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="decimal-pad"
          />

          {/* ── Address ───────────────────────────────────────────────────── */}
          <Text style={styles.sectionLabel}>DIRECCIÓN</Text>

          <Text style={styles.fieldLabel}>CALLE Y NÚMERO</Text>
          <AppTextInput
            placeholder="Ej. Av. de las Granjas 800"
            value={street}
            onChangeText={setStreet}
          />

          <Text style={styles.fieldLabel}>CIUDAD</Text>
          <AppTextInput
            placeholder="Ej. CDMX"
            value={city}
            onChangeText={setCity}
          />

          <Text style={styles.fieldLabel}>ESTADO</Text>
          <AppTextInput
            placeholder="Ej. Azcapotzalco"
            value={state}
            onChangeText={setState}
          />

          <Text style={styles.fieldLabel}>PAÍS</Text>
          <AppTextInput
            placeholder="Ej. México"
            value={country}
            onChangeText={setCountry}
          />

          <Text style={styles.fieldLabel}>CÓDIGO POSTAL</Text>
          <AppTextInput
            placeholder="Ej. 02250"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />

          {/* ── Opcionales ────────────────────────────────────────────────── */}
          <Text style={styles.sectionLabel}>CONTACTO (OPCIONAL)</Text>

          <Text style={styles.fieldLabel}>TELÉFONO</Text>
          <AppTextInput
            placeholder="Ej. +525512345678"
            value={contactPhone}
            onChangeText={setContactPhone}
            keyboardType="phone-pad"
          />

        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>+ CREATE VENUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 50 },
  header: {
    paddingTop: 60, paddingBottom: 20,
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
    color: colors.primary, fontSize: 14,
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
    marginBottom: 25, overflow: 'hidden',
  },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  uploadIconContainer: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 2, borderColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 8,
  },
  uploadIconText: { color: '#fff', fontSize: 20, lineHeight: 22 },
  uploadHint: { color: colors.primary, fontSize: 10, fontWeight: '900' },
  formContainer: { gap: 6 },
  sectionLabel: {
    color: colors.primary,
    fontSize: 10, fontWeight: '900',
    letterSpacing: 1.5, textTransform: 'uppercase',
    marginTop: 20, marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13,154,112,0.3)',
    paddingBottom: 6,
  },
  fieldLabel: {
    color: '#94a3b8', fontSize: 10,
    fontWeight: '700', letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 10, marginLeft: 4,
  },
  hint: {
    color: '#475569', fontSize: 11,
    marginBottom: 4, marginLeft: 4,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 50, paddingVertical: 15,
    alignItems: 'center', marginTop: 30,
  },
  primaryButtonText: {
    color: '#fff', fontSize: 11,
    fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase',
  },
});
