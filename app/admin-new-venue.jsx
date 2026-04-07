import React, { useState } from 'react';
import api from '../src/services/api';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';
import { validators } from '../src/utils/validators';

export default function AdminNewVenueScreen() {
  const router = useRouter();
  const [image, setImage] = useState(null);

  const [name, setName] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [contactPhone, setContactPhone] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleCreateVenue = async () => {

    // VALIDACIONES
    if (!validators.required(name)) return alert('Nombre requerido');
    if (!validators.capacity(maxCapacity)) return alert('Capacidad inválida');

    if (!validators.coordinate(latitude)) return alert('Latitud inválida');
    if (!validators.coordinate(longitude)) return alert('Longitud inválida');

    if (!validators.required(street)) return alert('Calle requerida');
    if (!validators.required(city)) return alert('Ciudad requerida');
    if (!validators.required(stateName)) return alert('Estado requerido');
    if (!validators.required(country)) return alert('País requerido');

    if (!validators.zipCode(zipCode)) return alert('Código postal inválido');

    if (contactPhone && !validators.phone(contactPhone)) {
      return alert('Teléfono inválido');
    }

    try {
      const payload = {
        name,
        maxCapacity: Number(maxCapacity),
        location: {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)],
        },
        address: {
          street,
          city,
          state: stateName,
          country,
          zipCode,
        },
        contactPhone,
      };

      await api.post('/places', payload);

      alert('Sede creada');
      router.back();

    } catch (error) {
      console.error(error.response?.data);
      alert('Error al crear sede');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ADD NEW VENUE</Text>
          <View style={{ width: 40 }} />
        </View>

        <TouchableOpacity style={styles.imageUploadArea} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <>
              <Text style={styles.uploadHint}>AGREGAR FOTO DE LA SEDE</Text>
            </>
          )}
        </TouchableOpacity>

       <View style={styles.formContainer}>
  <Text style={styles.fieldLabel}>VENUE NAME</Text>
  <AppTextInput
    value={name}
    onChangeText={setName}
    placeholder="Ej: Salón Los Pinos"
  />

  <Text style={styles.fieldLabel}>MAX CAPACITY</Text>
  <AppTextInput
    value={maxCapacity}
    onChangeText={setMaxCapacity}
    placeholder="Ej: 200"
    keyboardType="numeric"
  />

  <Text style={styles.fieldLabel}>LATITUDE</Text>
  <AppTextInput
    value={latitude}
    onChangeText={setLatitude}
    placeholder="Ej: 21.8853"
  />

  <Text style={styles.fieldLabel}>LONGITUDE</Text>
  <AppTextInput
    value={longitude}
    onChangeText={setLongitude}
    placeholder="Ej: -102.2916"
  />

  <Text style={styles.fieldLabel}>STREET</Text>
  <AppTextInput
    value={street}
    onChangeText={setStreet}
    placeholder="Ej: Av. Universidad 123"
  />

  <Text style={styles.fieldLabel}>CITY</Text>
  <AppTextInput
    value={city}
    onChangeText={setCity}
    placeholder="Ej: Aguascalientes"
  />

  <Text style={styles.fieldLabel}>STATE</Text>
  <AppTextInput
    value={stateName}
    onChangeText={setStateName}
    placeholder="Ej: Aguascalientes"
  />

  <Text style={styles.fieldLabel}>COUNTRY</Text>
  <AppTextInput
    value={country}
    onChangeText={setCountry}
    placeholder="Ej: México"
  />

  <Text style={styles.fieldLabel}>ZIP CODE</Text>
  <AppTextInput
    value={zipCode}
    onChangeText={setZipCode}
    placeholder="Ej: 20000"
    keyboardType="numeric"
  />

  <Text style={styles.fieldLabel}>PHONE</Text>
  <AppTextInput
    value={contactPhone}
    onChangeText={setContactPhone}
    placeholder="Ej: 4491234567"
    keyboardType="phone-pad"
  />
</View>
        <TouchableOpacity style={styles.primaryButton} onPress={handleCreateVenue}>
          <Text style={styles.primaryButtonText}>CREATE VENUE</Text>
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
