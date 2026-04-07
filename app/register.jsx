import React, { useState } from 'react';
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

import { useAuth } from '../src/hooks/useAuth';
import { validators } from '../src/utils/validators';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!validators.name(name)) {
      return Alert.alert('Error', 'Nombre inválido (solo letras)');
    }

    if (!validators.email(email)) {
      return Alert.alert('Error', 'Email inválido');
    }

    if (!validators.password(password)) {
      return Alert.alert(
        'Error',
        'La contraseña debe tener al menos 6 caracteres y contener letras y números'
      );
    }

    register(name, email, password, router);
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
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <AppTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <AppTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 80,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    marginBottom: 30,
  },
  registerButton: {
    marginTop: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 12,
  },
});
