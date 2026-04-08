import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Contexto de Autenticación Global
import { AuthProvider } from '../src/context/AuthContext';
import { useAuth } from '../src/hooks/useAuth';

function InitialLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)' || segments.length === 0 || segments[0] === 'register';

    if (!user && !inAuthGroup) {
      // Si no hay usuario y no está en login/registro, ir a login
      router.replace('/');
    } else if (user && inAuthGroup) {
      // Si hay usuario y está en login/registro, ir a home
      router.replace('/home');
    }
  }, [user, loading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="home" />
      {/* Otras pantallas se registran automáticamente por el sistema de archivos de Expo Router */}
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <InitialLayout />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
