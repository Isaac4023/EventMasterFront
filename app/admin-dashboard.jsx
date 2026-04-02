import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';
import { useRouter } from 'expo-router';

export default function AdminFinancialDashboard() {
  const router = useRouter();

  // TODO (Chuy): Alimentar estos estados al cargar la pantalla
  const [financialStats, setFinancialStats] = useState(null);
  const [transactions, setTransactions] = useState([]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>RESUMEN FINANCIERO</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Top Cards */}
        {financialStats ? (
          <View style={styles.cardsRow}>
            <View style={styles.mainCard}>
              <Text style={styles.cardHeader}>Total Ventas (Mes)</Text>
              <Text style={styles.cardBigNumber}>${financialStats.totalSales.toLocaleString()}</Text>
              <Text style={styles.cardTrendPositive}>+12.5% vs Mes Anterior</Text>
            </View>
            <View style={styles.columnCards}>
              <View style={styles.smallCard}>
                <Text style={styles.cardHeader}>Boletos Vendidos</Text>
                <Text style={styles.cardNormalNumber}>{financialStats.ticketsSold}</Text>
              </View>
              <View style={styles.smallCard}>
                <Text style={styles.cardHeader}>Reembolsos</Text>
                <Text style={[styles.cardNormalNumber, { color: colors.danger }]}>${financialStats.refunds}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
             <Text style={{color: '#94a3b8'}}>Cargando resumen financiero...</Text>
          </View>
        )}

        {/* Report Download */}
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadIcon}>↓</Text>
          <Text style={styles.downloadText}>DESCARGAR REPORTE EXCEL</Text>
        </TouchableOpacity>

        {/* Recent Transactions List */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>TRANSACCIONES RECIENTES</Text>
          
          {transactions.length > 0 ? (
            transactions.map(tx => (
              <View key={tx.id} style={styles.txRow}>
                <View style={styles.txInfo}>
                  <Text style={styles.txUser}>{tx.user}</Text>
                  <Text style={styles.txEvent}>{tx.event} - {tx.date}</Text>
                </View>
                <View style={styles.txAmountContainer}>
                  <Text style={[styles.txAmount, tx.type === 'REFUND' && { color: colors.danger }]} >
                    {tx.type === 'REFUND' ? '-' : '+'}${tx.amount}
                  </Text>
                  <Text style={styles.txStatus}>{tx.status}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
               <Text style={{color: '#94a3b8'}}>No hay transacciones cargadas.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNav activeRoute="home" isAdmin={true} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  eventsContainer: {
    marginTop: 20,
    gap: 20,
  },
  eventCard: {
    backgroundColor: '#1a232e',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  placeholderText: {
    color: '#94a3b8',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardContent: {
    padding: 20,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 20,
  },
  progressContainer: {
    gap: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ff7a00', // orange color from Figma screen
    borderRadius: 4,
  },
  progressText: {
    color: '#ff7a00',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
