import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../theme/colors';
import { useRouter } from 'expo-router';

export const BottomNav = ({ activeRoute = 'home', role = 'user' }) => {
  const router = useRouter();

  // Propiedades de navegación base del diseño Figma
  const userNavItems = [
    { id: 'home', title: 'Home', icon: require('../../assets/images/home.png'), route: '/home' },
    { id: 'tickets', title: 'Tickets', icon: require('../../assets/images/boletos.png'), route: '/tickets' },
    { id: 'profile', title: 'Perfil', icon: require('../../assets/images/user.png'), route: '/profile' },
  ];

  const adminNavItems = [
    { id: 'home', title: 'Home', icon: require('../../assets/images/home.png'), route: '/admin-home' },
    { id: 'tickets', title: 'Tickets', icon: require('../../assets/images/boletos.png'), route: '/admin-manage-places' },
    { id: 'profile', title: 'Perfil', icon: require('../../assets/images/user.png'), route: '/profile' },
  ];

  const staffNavItems = [
    { id: 'home', title: 'Home', icon: require('../../assets/images/home.png'), route: '/home' },
    { id: 'tickets', title: 'Tickets', icon: require('../../assets/images/boletos.png'), route: '/staff-scanner' },
    { id: 'profile', title: 'Perfil', icon: require('../../assets/images/user.png'), route: '/profile' },
  ];

  const navItems = role === 'admin' ? adminNavItems : role === 'staff' ? staffNavItems : userNavItems;

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = activeRoute === item.id;
        return (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.navItem, !isActive && styles.inactiveItem]}
            onPress={() => router.push(item.route)}
          >
            {/* Contenedor del ícono, en caso de que sean blancos, se usa tintColor para cambiarlos */}
            <Image 
              source={item.icon} 
              style={[
                styles.icon, 
                { tintColor: isActive ? colors.primary : colors.danger }
              ]} 
              resizeMode="contain"
            />
            <Text 
              style={[
                styles.label, 
                { color: isActive ? colors.primary : colors.danger }
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 66,
    backgroundColor: 'rgba(26,35,46,0.9)', // Figma tenía 0.8, pero 0.9 suele leerse mejor sin librerías complejas de Blur si está sobre negro
    borderTopColor: 'rgba(255,255,255,0.05)',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 38,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  inactiveItem: {
    opacity: 0.55,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  }
});
