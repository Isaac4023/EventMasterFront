import React, { useState } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity, 
  StatusBar, 
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';
import { AppButton } from '../src/components/AppButton';
import { validators } from '../src/utils/validators';
import { usePlaces } from '../src/hooks/usePlaces';

/**
 * Pantalla de registro de nueva sede.
 * Solo disponible para administradores.
 */
export default function AdminNewVenueScreen() {
  const router = useRouter();
  const { createPlace, loading } = usePlaces();
  const [image, setImage] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('México');
  const [zipCode, setZipCode] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleCreateVenue = async () => {
    // Validaciones básicas
    if (!name || !maxCapacity || !latitude || !longitude || !street || !city) {
      Alert.alert('Datos Incompletos', 'Por favor llena los campos obligatorios.');
      return;
    }

    if (!validators.capacity(maxCapacity)) return Alert.alert('Error', 'Capacidad inválida');
    if (!validators.coordinate(latitude)) return Alert.alert('Error', 'Latitud inválida');
    if (!validators.coordinate(longitude)) return Alert.alert('Error', 'Longitud inválida');

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
        // imageUrl: image, // Si el backend lo soporta directamente o via upload previo
      };

      await createPlace(payload);
      router.back();
    } catch (error) {
      console.error('Create venue error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NUEVA SEDE</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageUploadArea} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.uploadHint}>SELECCIONAR FOTO</Text>
          )}
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.sectionLabel}>INFORMACIÓN GENERAL</Text>
          
          <Text style={styles.fieldLabel}>Nombre de la Sede *</Text>
          <AppTextInput
            value={name}
            onChangeText={setName}
            placeholder="Ej: Auditorio Nacional"
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.fieldLabel}>Capacidad *</Text>
              <AppTextInput
                value={maxCapacity}
                onChangeText={setMaxCapacity}
                placeholder="2500"
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.fieldLabel}>Teléfono</Text>
              <AppTextInput
                value={contactPhone}
                onChangeText={setContactPhone}
                placeholder="449 123 4567"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <Text style={styles.sectionLabel}>UBICACIÓN Y COORDENADAS</Text>
          
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.fieldLabel}>Latitud *</Text>
              <AppTextInput
                value={latitude}
                onChangeText={setLatitude}
                placeholder="19.4326"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Longitud *</Text>
              <AppTextInput
                value={longitude}
                onChangeText={setLongitude}
                placeholder="-99.1332"
              />
            </View>
          </View>

          <Text style={styles.fieldLabel}>Calle y Número *</Text>
          <AppTextInput
            value={street}
            onChangeText={setStreet}
            placeholder="Av. Paseo de la Reforma"
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.fieldLabel}>Ciudad *</Text>
              <AppTextInput
                value={city}
                onChangeText={setCity}
                placeholder="CDMX"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>C.P.</Text>
              <AppTextInput
                value={zipCode}
                onChangeText={setZipCode}
                placeholder="06000"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.row}>
             <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.fieldLabel}>Estado</Text>
              <AppTextInput
                value={stateName}
                onChangeText={setStateName}
                placeholder="CDMX"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>País</Text>
              <AppTextInput
                value={country}
                onChangeText={setCountry}
                placeholder="México"
              />
            </View>
          </View>

          <View style={{ height: 40 }} />

          <AppButton 
            title={loading ? "CREANDO..." : "GUARDAR SEDE"} 
            onPress={handleCreateVenue} 
            disabled={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  scrollContent: { 
    paddingHorizontal: 25, 
    paddingBottom: 60 
  },
  header: {
    paddingTop: 60, 
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40, 
    height: 40,
    justifyContent: 'center',
  },
  backText: { 
    color: '#fff', 
    fontSize: 24 
  },
  headerTitle: {
    color: colors.primary, 
    fontSize: 12,
    fontWeight: '900', 
    letterSpacing: 2,
  },
  imageUploadArea: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 25,
    height: 160,
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 30, 
    overflow: 'hidden',
  },
  previewImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  uploadHint: { 
    color: colors.primary, 
    fontSize: 9, 
    fontWeight: '900',
    letterSpacing: 1
  },
  formContainer: { 
    paddingBottom: 20 
  },
  sectionLabel: {
    color: '#fff',
    fontSize: 11, 
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 25, 
    marginBottom: 15,
    opacity: 0.8
  },
  fieldLabel: {
    color: colors.textSecondary, 
    fontSize: 10,
    fontWeight: '700', 
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
