import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';
import api from '../src/services/api';
import { useAuth } from '../src/hooks/useAuth';

export default function AdminProfileScreen() {
  const { logout } = useAuth();
  const router = useRouter();
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setAdminInfo(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.content}>

        {adminInfo ? (
          <>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {getInitial(adminInfo.name)}
              </Text>
            </View>

            {/* Info */}
            <Text style={styles.name}>{adminInfo.name}</Text>
            <Text style={styles.info}>{adminInfo.email}</Text>
            <Text style={styles.info}>{adminInfo.role}</Text>
          </>
        ) : (
          <Text style={styles.loading}>Cargando perfil...</Text>
        )}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomNav activeRoute="profile" role="admin" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  nameText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emailText: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 15,
  },
  roleBadge: {
    backgroundColor: 'rgba(13, 154, 112, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  roleText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  settingsSection: {
    backgroundColor: '#1a232e',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  settingItemText: {
    color: '#fff',
    fontSize: 14,
  },
  settingItemArrow: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
