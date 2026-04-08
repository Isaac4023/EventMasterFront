import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { AppTextInput } from '../src/components/AppTextInput';
import { AppButton } from '../src/components/AppButton';
import { colors } from '../src/theme/colors';
import { useRouter } from 'expo-router';

// 🔥 Hooks y Utilidades
import { useAuth } from '../src/hooks/useAuth';
import { validators } from '../src/utils/validators';

export default function LoginScreen() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados de error para feedback visual individual
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    let hasError = false;
    const newErrors = { email: '', password: '' };

    if (!validators.email(email)) {
      newErrors.email = 'Email inválido o vacío';
      hasError = true;
    }

    if (!validators.password(password)) {
      newErrors.password = 'Contraseña demasiado corta (min 6)';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Intentando login con:', email);
      const result = await login(email, password);
      console.log('Resultado login:', result);
      
      if (result.success) {
        router.replace('/home');
      } else {
        const message = result.msg || 'Credenciales incorrectas';
        if (Platform.OS === 'web') {
          alert(`Error: ${message}`);
        } else {
          Alert.alert('Error', message);
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo_EventMaster.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Bienvenido de nuevo</Text>
          <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>
        </View>

        <View style={styles.form}>
          <AppTextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({...errors, email: ''});
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email}
            errorMessage={errors.email}
          />

          <AppTextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({...errors, password: ''});
            }}
            secureTextEntry
            error={!!errors.password}
            errorMessage={errors.password}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <AppButton
            title="Ingresar"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            ¿No tienes una cuenta?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Crea una aquí</Text>
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
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 80,
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  registerText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  registerLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
