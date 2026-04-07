import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../theme/colors';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BottomNav = ({ activeRoute = 'home' }) => {
  const router = useRouter();
  const [role, setRole] = useState('user');

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await AsyncStorage.getItem('userRole');
      if (storedRole) setRole(storedRole);
    };
    loadRole();
  }, []);

  const userNavItems = [
    { id: 'home', title: 'Home', icon: require('../../assets/images/home.png'), route: '/home' },
    { id: 'tickets', title: 'Tickets', icon: require('../../assets/images/boletos.png'), route: '/tickets' },
    { id: 'profile', title: 'Perfil', icon: require('../../assets/images/user.png'), route: '/profile' },
  ];

  const adminNavItems = [
    { id: 'home', title: 'Home', icon: require('../../assets/images/home.png'), route: '/admin-home' },
    { id: 'tickets', title: 'Dashboard', icon: require('../../assets/images/boletos.png'), route: '/admin-dashboard' },
    { id: 'profile', title: 'Perfil', icon: require('../../assets/images/user.png'), route: '/admin-profile' },
  ];

  const staffNavItems = [
    { id: 'home', title: 'Home', icon: require('../../assets/images/home.png'), route: '/staff-home' },
    { id: 'tickets', title: 'Scanner', icon: require('../../assets/images/boletos.png'), route: '/staff-scanner' },
    { id: 'profile', title: 'Perfil', icon: require('../../assets/images/user.png'), route: '/profile' },
  ];

  const navItems =
    role === 'admin'
      ? adminNavItems
      : role === 'staff'
      ? staffNavItems
      : userNavItems;

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = activeRoute === item.id;
        return (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.navItem, !isActive && styles.inactiveItem]}
            onPress={() => router.replace(item.route)}
          >
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

// 🔥 ESTO FALTABA (EL ERROR)
const styles = StyleSheet.create({
  container: {
    height: 66,
    backgroundColor: 'rgba(26,35,46,0.9)',
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