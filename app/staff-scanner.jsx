import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Modal, ActivityIndicator, TextInput } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StaffScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [role, setRole] = useState('user');
  const [manualId, setManualId] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userRole').then(r => {
      if (r) setRole(r);
    });
  }, []);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text, marginBottom: 20 }}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.verifyBtn} onPress={requestPermission}>
          <Text style={styles.verifyBtnText}>GRANT PERMISSION</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    processScan();
  };

  // Also triggered by pressing Verify Ticket
  const processScan = async () => {
  setLoading(true);

  try {
    const stored = await AsyncStorage.getItem('reservations');
    const reservations = stored ? JSON.parse(stored) : [];

    // Simular lectura (usa manualId o random)
    const scannedQR = manualId || reservations[0]?.qr;

    const found = reservations.find(r => r.qr === scannedQR);

    setTimeout(() => {
      setLoading(false);

      if (found) {
        setShowResultModal(true);
      } else {
        alert('Ticket inválido');
        setScanned(false);
      }
    }, 1000);

  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

  const resetScanner = () => {
    setShowResultModal(false);
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>STAFF: ENTRY SCAN</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Position the ticket QR code{`\n`}within the frame.
        </Text>

        {/* CAMERA AREA */}
        <View style={styles.cameraFrameWrapper}>
          <View style={styles.cameraOutline}>
            <CameraView
              style={styles.camera}
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            />
          </View>
          <View style={styles.laserLine} />
        </View>

        {/* MANUAL INPUT (Mock) */}
        <TextInput 
          style={styles.manualInputContainer}
          placeholder="Manual Entry ID"
          placeholderTextColor={colors.textSecondary}
          value={manualId}
          onChangeText={setManualId}
          textAlign="center"
          color={colors.text}
        />

        {/* VERIFY BUTTON */}
        <TouchableOpacity 
          style={styles.verifyBtn} 
          onPress={() => {
            if (!loading) {
              setScanned(true);
              processScan();
            }
          }}
        >
          {loading ? (
             <ActivityIndicator color={colors.primary} />
          ) : (
             <Text style={styles.verifyBtnText}>VERIFY TICKET</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* SUCCESS MODAL (¡AUTORIZADO!) */}
      <Modal
        visible={showResultModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
             <View style={styles.successIconWrapper}>
               <Text style={styles.successIconText}>✓</Text>
             </View>

             {/* TODO (Chuy): Reemplazar con datos reales del ticket verificado */}
             <Text style={styles.authorizedTitle}>¡AUTORIZADO!</Text>

             <View style={styles.userInfo}>
               <Text style={styles.userName}>{/* nombre del titular */}</Text>
               <Text style={styles.userSection}>{/* zona y fila */}</Text>
             </View>

             <View style={styles.capacityCard}>
               <Text style={styles.capacityLabel}>AFORO ACTUAL</Text>
               <Text style={styles.capacityNumbers}>{/* actual / max */}</Text>
             </View>

             <TouchableOpacity style={styles.nextScanBtn} onPress={resetScanner}>
               <Text style={styles.nextScanText}>Siguiente Escaneo</Text>
             </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNav activeRoute="tickets" role={role} />
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  instructionText: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 40,
  },
  cameraFrameWrapper: {
    width: 204,
    height: 204,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  cameraOutline: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  camera: {
    flex: 1,
  },
  laserLine: {
    position: 'absolute',
    top: '50%',
    width: '90%',
    height: 2,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  manualInputContainer: {
    width: '100%',
    height: 42,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderStyle: 'dashed',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  manualInputText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  verifyBtn: {
    width: '100%',
    backgroundColor: '#1a232e',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
  },
  verifyBtnText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 1,
  },

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#0e151c',
    borderRadius: 45,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e293b',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 30 },
    paddingVertical: 50,
  },
  successIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  successIconText: {
    fontSize: 50,
    color: '#fff',
  },
  authorizedTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  userName: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 5,
  },
  userSection: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  capacityCard: {
    width: 256,
    backgroundColor: '#1a232e',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    marginBottom: 50,
  },
  capacityLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    marginBottom: 5,
  },
  capacityNumbers: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  nextScanBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  nextScanText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  }
});
