import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState(null);

  const handleLogout = () => {
    // TODO: Connect with Auth logout hook
    console.log('Logging out...');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PROFILE</Text>
      </View>

      <View style={styles.content}>
        {profileInfo ? (
          <>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarInitial}>{profileInfo.name?.charAt(0) || '?'}</Text>
            </View>

            {/* Nombre Display */}
            <Text style={styles.nameText}>{profileInfo.name}</Text>

            {/* Input Editable */}
            <View style={styles.inputSection}>
              <AppTextInput 
                value={profileInfo.name}
                onChangeText={(text) => setProfileInfo({...profileInfo, name: text})}
                placeholder="Full Name"
                autoCapitalize="words"
              />
            </View>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{color: '#94a3b8'}}>Cargando perfil...</Text>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>

      <BottomNav activeRoute="profile" />
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
