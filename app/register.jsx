import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
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
  const { register, loading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const [errors, setErrors] = useState({});

  const availableRoles = [
    { id: 'user', label: 'USUARIO' },
    { id: 'staff', label: 'STAFF' },
  ];

  const handleRegister = async () => {
    let hasError = false;
    const newErrors = {};

    if (!validators.name(name)) {
      newErrors.name = 'Solo letras y espacios';
      hasError = true;
    }

    if (!validators.email(email)) {
      newErrors.email = 'Formato de email incorrecto';
      hasError = true;
    }

    if (!validators.password(password)) {
      newErrors.password = 'Min 6 caracteres, letras y números';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Intentando registro:', { name, email, role });
      const result = await register(name, email, password, role);
      console.log('Resultado registro:', result);

      if (result.success) {
        const successMsg = 'Usuario registrado correctamente. Redirigiendo al inicio de sesión...';
        if (Platform.OS === 'web') {
          alert(`¡Éxito! ${successMsg}`);
          router.replace('/');
        } else {
          Alert.alert('¡Éxito!', successMsg, [{ text: 'OK', onPress: () => router.replace('/') }]);
        }
      } else {
        const errMsg = result.msg || 'No se pudo completar el registro';
        if (Platform.OS === 'web') {
          alert(`Error de Registro: ${errMsg}`);
        } else {
          Alert.alert('Error de Registro', errMsg);
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
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← REGRESAR</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo_EventMaster.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Únete a la plataforma</Text>
          <Text style={styles.subtitle}>Crea una cuenta para gestionar o asistir a eventos</Text>
        </View>

        <View style={styles.form}>
          <AppTextInput
            placeholder="Nombre completo"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({...errors, name: ''});
            }}
            autoCapitalize="words"
            error={!!errors.name}
            errorMessage={errors.name}
          />

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

          <Text style={styles.roleLabel}>SELECCIONA TU PERFIL</Text>
          <View style={styles.rolesGrid}>
            {availableRoles.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={[
                  styles.roleItem,
                  role === r.id && styles.roleItemActive
                ]}
                onPress={() => setRole(r.id)}
              >
                <Text style={[
                  styles.roleItemText,
                  role === r.id && styles.roleItemTextActive
                ]}>
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <AppButton
            title="Registrarse"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya eres parte de EventMaster? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 80,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  form: {
    width: '100%',
  },
  roleLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 15,
  },
  rolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 25,
  },
  roleItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  roleItemActive: {
    backgroundColor: colors.primary + '20', // Opacidad baja del color primario
    borderColor: colors.primary,
  },
  roleItemText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '800',
  },
  roleItemTextActive: {
    color: colors.primary,
  },
  registerButton: {
    marginTop: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
