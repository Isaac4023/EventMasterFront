import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';

export default function AdminProfileScreen() {
  const router = useRouter();
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    // TODO (Chuy): Fetch profile info here with Axios
  }, []);

  // Gets first letter if no photo, e.g. "A"
  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  const handleLogout = () => {
    // Logic to clear token will go here
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PERFIL DE ADMINISTRADOR</Text>
        </View>

        {adminInfo ? (
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{getInitial(adminInfo.name)}</Text>
            </View>
            <Text style={styles.nameText}>{adminInfo.name}</Text>
            <Text style={styles.emailText}>{adminInfo.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{adminInfo.role}</Text>
            </View>
          </View>
        ) : (
          <View style={[styles.profileSection, { paddingVertical: 40 }]}>
            <Text style={{color: '#94a3b8'}}>Cargando perfil...</Text>
          </View>
        )}

        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Ajustes de Cuenta</Text>
            <Text style={styles.settingItemArrow}>{'>'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Gestión de Equipo</Text>
            <Text style={styles.settingItemArrow}>{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Centro de Ayuda</Text>
            <Text style={styles.settingItemArrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>

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
