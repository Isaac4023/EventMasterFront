import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Alert } from 'react-native';
import { AppTextInput } from '../src/components/AppTextInput';
import { AppButton } from '../src/components/AppButton';
import { colors } from '../src/theme/colors';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: REMOVE BEFORE MERGE - Credenciales de prueba exclusivas para navegar en UI
    if (email.trim() === 'test@test.com' && password === '123') {
      router.replace('/home');
      return;
    }
    if (email.trim() === 'admin@test.com' && password === '123') {
      router.replace('/admin-home');
      return;
    }
    Alert.alert('Error', 'Prototipo: test@test.com (user) o admin@test.com (admin) / Pass: 123');

    // TODO: Connect with useAuth hook from Chuy
    console.log('Login attempt', email, password);
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
          title="Ingresar" 
          onPress={handleLogin} 
          style={styles.loginButton}
        />
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Regístrate</Text>
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
  loginButton: {
    marginTop: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  registerLink: {
    color: colors.danger,
    fontSize: 12,
  },
});
