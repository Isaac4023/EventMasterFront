import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import { AppTextInput } from '../src/components/AppTextInput';
import { AppButton } from '../src/components/AppButton';
import { colors } from '../src/theme/colors';
import { useRouter } from 'expo-router';

// 🔥 NUEVO
import useForm from '../src/hooks/useForm';
import api from '../src/services/api';
import StorageService from '../src/helpers/StorageService';

export default function RegisterScreen() {
  const router = useRouter();

  const { values, handleChange, validateForm, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      // 🧾 REGISTER
      const res = await api.post('/auth/register', values);

      const token = res.data.token;

      // 🔐 Guardar token
      await StorageService.saveToken(token);

      // 👤 Obtener perfil
      const profileRes = await api.get('/auth/me');
      const profile = profileRes.data;

      // 💾 Guardar en AsyncStorage
      await StorageService.setItem('userProfile', profile);

      // ⚠️ TEMP hasta que backend mande role
      const role = profile.role || 'user';
      await StorageService.setItem('userRole', role);

      // 🔄 Reset form
      resetForm();

      // 🚀 Redirigir
      router.replace('/home');

    } catch (error) {
      console.error(error);

      Alert.alert(
        'Register error',
        error?.response?.data?.msg || 'Something went wrong'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo_EventMaster.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Crea tu cuenta</Text>

        <AppTextInput
          placeholder="Nombre completo"
          value={values.name}
          onChangeText={(text) => handleChange('name', text)}
          autoCapitalize="words"
        />

        <AppTextInput
          placeholder="Email"
          value={values.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <AppTextInput
          placeholder="Password"
          value={values.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
        />

        <AppButton
          title="Registrarse"
          onPress={handleRegister}
          style={styles.registerButton}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            ¿Ya tienes cuenta?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginLink}>Ingresa aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
