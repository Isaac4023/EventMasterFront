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

export default function LoginScreen() {
  const router = useRouter();

  // 🔥 Hook de formulario
  const { values, handleChange, validateForm } = useForm({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      // 🔐 LOGIN
      const res = await api.post('/auth/login', values);
      const token = res.data.token;

      // 🔐 Guardar JWT en SecureStore
      await StorageService.saveToken(token);

      // 👤 Obtener perfil
      const profileRes = await api.get('/auth/me');
      const profile = profileRes.data;

      // 💾 Guardar en AsyncStorage
      await StorageService.setItem('userProfile', profile);

      // ⚠️ TEMP (hasta que backend mande role)
      const role = profile.role || 'user';
      await StorageService.setItem('userRole', role);

      // 🚀 Redirección
      if (role === 'admin') {
        router.replace('/admin-home');
      } else if (role === 'staff') {
        router.replace('/staff-home');
      } else {
        router.replace('/home');
      }

    } catch (error) {
      console.error(error);

      Alert.alert(
        'Login error',
        error?.response?.data?.msg || 'Invalid credentials'
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

        <Text style={styles.title}>Bienvenido</Text>

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
          title="Ingresar"
          onPress={handleLogin}
          style={styles.loginButton}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            ¿No tienes cuenta?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}