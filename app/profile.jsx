import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  ActivityIndicator 
} from 'react-native';
import { colors } from '../src/theme/colors';
import { AppTextInput } from '../src/components/AppTextInput';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';

/**
 * Pantalla de perfil de usuario.
 * Utiliza el estado global de autenticación para mostrar datos sincronizados.
 */
export default function ProfileScreen() {
  const { logout, user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const handleLogout = () => {
    logout(router);
  };

  // Si no hay usuario y no está cargando, algo salió mal o no ha cargado el context
  if (!user && authLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MI PERFIL</Text>
      </View>

      <View style={styles.content}>
        {/* Avatar dinámico basado en inicial */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarInitial}>
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>

        <Text style={styles.nameText}>{user?.name || 'Usuario'}</Text>

        <View style={styles.inputSection}>
          <Text style={styles.fieldLabel}>NOMBRE COMPLETO</Text>
          <AppTextInput 
            value={user?.name}
            editable={false}
            style={{ opacity: 0.8 }}
          />

          <View style={{ marginTop: 20 }}>
            <Text style={styles.fieldLabel}>CORREO ELECTRÓNICO</Text>
            <AppTextInput 
              value={user?.email}
              editable={false}
              style={{ opacity: 0.7 }}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.fieldLabel}>TIPO DE CUENTA</Text>
            <AppTextInput 
              value={user?.role?.toUpperCase()}
              editable={false}
              style={{ opacity: 0.7 }}
            />
          </View>
        </View>

        {/* Botón de Logout */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          disabled={authLoading}
        >
          {authLoading ? (
            <ActivityIndicator color={colors.danger} />
          ) : (
            <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
          )}
        </TouchableOpacity>
      </View>

      <BottomNav activeRoute="profile" role={user?.role || 'user'} />
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
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  nameText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
  },
  inputSection: {
    width: '100%',
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 1,
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 40,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
