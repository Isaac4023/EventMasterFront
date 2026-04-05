import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';

export default function AdminHomeScreen() {
  const router = useRouter();
  // TODO (Chuy): Poblar con datos reales del panel de admin
  const [stats, setStats] = useState({
    ventas: '',
    aforo: ''
  });
  
  const [activeEvents, setActiveEvents] = useState([]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.adminName}>Admin Panel</Text>
        </View>

        {/* Overview Container */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>VENTAS</Text>
              <Text style={styles.statValueRed}>{stats.ventas}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>AFORO</Text>
              <Text style={styles.statValueRed}>{stats.aforo}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Container */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          
          <TouchableOpacity 
            style={styles.outlineActionCard}
            onPress={() => router.push('/admin-new-venue')}
          >
            <Text style={styles.outlineActionText}>+ Registrar Lugar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.solidActionCard}
            onPress={() => router.push('/admin-new-event')}
          >
            <Text style={styles.solidActionText}>+ Nuevo evento</Text>
          </TouchableOpacity>
        </View>

        {/* Active Events Container */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eventos Activos</Text>
          
          {activeEvents.map((event) => (
            <View key={event.id} style={styles.activeEventCard}>
              <Text style={styles.activeEventName}>{event.name}</Text>
              <TouchableOpacity onPress={() => router.push('/admin-place-details')}>
                <Text style={styles.editButtonText}>EDIT</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>

      <BottomNav activeRoute="home" role="admin" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e14',
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
  adminName: {
    color: '#0d9a70',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a232e',
    borderColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    gap: 5,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 10,
  },
  statValueRed: {
    color: '#f44',
    fontSize: 18,
    fontWeight: '800',
  },
  outlineActionCard: {
    backgroundColor: 'transparent',
    borderColor: '#0d9a70',
    borderWidth: 1,
    borderRadius: 50,
    padding: 16,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#0d9a70',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  outlineActionText: {
    color: '#0d9a70',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  solidActionCard: {
    backgroundColor: '#0d9a70',
    borderRadius: 50,
    padding: 14,
    alignItems: 'center',
  },
  solidActionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  activeEventCard: {
    backgroundColor: '#1a232e',
    borderColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 21,
    marginBottom: 10,
  },
  activeEventName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  editButtonText: {
    color: '#fa6203',
    fontSize: 13,
    fontWeight: '600',
  }
});
