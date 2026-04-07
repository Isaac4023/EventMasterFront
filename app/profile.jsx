import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const [profileInfo, setProfileInfo] = useState(null);
  const [role, setRole] = useState('user');

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setProfileInfo(JSON.parse(storedUser));
        }

        const storedRole = await AsyncStorage.getItem('userRole');
        if (storedRole) {
          setRole(storedRole);
        }

      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');

    router.replace('/');
  };

  if (!profileInfo) {
    return <Text style={{ color: colors.text }}>Cargando perfil...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />

      <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>
        PROFILE
      </Text>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: '#fff', fontSize: 22 }}>
          {profileInfo.name}
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        <AppTextInput 
          value={profileInfo.name}
          onChangeText={(text) => setProfileInfo({...profileInfo, name: text})}
        />
      </View>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          LOG OUT
        </Text>
      </TouchableOpacity>

      <BottomNav activeRoute="profile" role={role} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  nameText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  inputSection: {
    width: '100%',
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 40,
    padding: 15,
  },
  logoutText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
