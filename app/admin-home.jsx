import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';

export default function AdminHomeScreen() {
  const router = useRouter();
  // TODO (Chuy): Llenar estos estados con axios
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  const QUICK_ACTIONS = [
    { id: '1', title: 'Nuevo Evento', icon: 'M12 4v16m8-8H4', route: '/admin-new-event' },
    { id: '2', title: 'Nueva Sede', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', route: '/admin-new-venue' },
    { id: '3', title: 'Generar Reporte', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', route: '/admin-dashboard' },
  ];

  const getInitials = (name) => name.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>BIENVENIDO,</Text>
          <Text style={styles.adminName}>Admin Panel</Text>
        </View>

        {/* Stats Grid */}
        {stats ? (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>BOLETOS HOY</Text>
              <Text style={styles.statValue}>{stats.todayTickets}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>INGRESOS (MES)</Text>
              <Text style={styles.statValue}>${stats.monthlyRevenue}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>EVENTOS ACTIVOS</Text>
              <Text style={styles.statValue}>{stats.activeEvents}</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: 'rgba(13, 154, 112, 0.15)' }]}>
              <Text style={[styles.statLabel, { color: colors.primary }]}>OCUPACIÓN</Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>{stats.avgOccupancy}%</Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Cargando estadísticas...</Text>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCIONES RÁPIDAS</Text>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity 
                key={action.id} 
                style={styles.actionCard}
                onPress={() => router.push(action.route)}
              >
                <View style={styles.actionIconPlaceholder}>
                  <Text style={styles.actionIconFallback}>{action.title.charAt(0)}</Text>
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ACTIVIDAD RECIENTE</Text>
          </View>

          {recentActivity.length > 0 ? (
            recentActivity.map(activity => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityAvatar}>
                  <Text style={styles.avatarText}>{getInitials(activity.user)}</Text>
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityUser}>{activity.user} • {activity.event}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
               <Text style={styles.emptyText}>No hay actividad reciente cargada.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNav activeRoute="admin" isAdmin={true} />
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
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a232e',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statTitle: {
    color: colors.textSecondary,
    fontSize: 10,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  statValue: {
    color: colors.danger,
    fontSize: 18,
    fontWeight: '900',
  },
  actionsContainer: {
    gap: 15,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  activeEventCard: {
    backgroundColor: '#1a232e',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 17,
    paddingHorizontal: 21,
    marginTop: 10,
  },
  activeEventTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  editText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '600',
  }
});
