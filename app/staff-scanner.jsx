import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Modal, 
  ActivityIndicator, 
  TextInput,
  Alert 
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { BottomNav } from '../src/components/BottomNav';
import { useReservations } from '../src/hooks/useReservations';
import { useAuth } from '../src/hooks/useAuth';

/**
 * Pantalla de escaneo de tickets para el Staff.
 * Valida QRs contra la API y gestiona el flujo de acceso.
 */
export default function StaffScannerScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { verifyTicket, loading: verifying } = useReservations();
  const [permission, requestPermission] = useCameraPermissions();
  
  const [scanned, setScanned] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [manualId, setManualId] = useState('');

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.permissionText}>Se requiere acceso a la cámara</Text>
        <TouchableOpacity style={styles.verifyBtn} onPress={requestPermission}>
          <Text style={styles.verifyBtnText}>CONCEDER PERMISO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    processVerification(data);
  };

  const processVerification = async (ticketId) => {
    const res = await verifyTicket(ticketId || manualId);
    if (res.success) {
      setResultData(res.data);
      setShowResultModal(true);
    } else {
      Alert.alert('Ticket Inválido', res.msg, [{ text: 'OK', onPress: () => setScanned(false) }]);
    }
  };

  const resetScanner = () => {
    setShowResultModal(false);
    setScanned(false);
    setManualId('');
    setResultData(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>STAFF: CONTROL DE ACCESO</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Ubica el código QR del ticket{`\n`}dentro del recuadro.
        </Text>

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

        <TextInput 
          style={styles.manualInput}
          placeholder="Entrada Manual de ID"
          placeholderTextColor={colors.textSecondary}
          value={manualId}
          onChangeText={setManualId}
          textAlign="center"
        />

        <TouchableOpacity 
          style={[styles.verifyBtn, (verifying || !manualId) && scanned && { opacity: 0.5 }]} 
          onPress={() => {
            if (!verifying && manualId) {
              setScanned(true);
              processVerification(manualId);
            }
          }}
          disabled={verifying || (!manualId && !scanned)}
        >
          {verifying ? (
             <ActivityIndicator color={colors.primary} />
          ) : (
             <Text style={styles.verifyBtnText}>VERIFICAR TICKET MANUAL</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal visible={showResultModal} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
             <View style={styles.successIconWrapper}>
               <Text style={styles.successIconText}>✓</Text>
             </View>

             <Text style={styles.authorizedTitle}>¡ACCESO AUTORIZADO!</Text>

             <View style={styles.userInfo}>
               <Text style={styles.userName}>{resultData?.user?.name || 'Invitado'}</Text>
               <Text style={styles.userSection}>{resultData?.event?.title || 'Evento'}</Text>
             </View>

             <View style={styles.capacityCard}>
               <Text style={styles.capacityLabel}>ESTADO DEL TICKET</Text>
               <Text style={styles.capacityNumbers}>VALIDADO</Text>
             </View>

             <TouchableOpacity style={styles.nextScanBtn} onPress={resetScanner}>
               <Text style={styles.nextScanText}>SIGUIENTE ESCANEO</Text>
             </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNav activeRoute="home" role={user?.role} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
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
    width: 240,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  cameraOutline: {
    width: '100%',
    height: '100%',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 40,
    overflow: 'hidden',
  },
  camera: { flex: 1 },
  laserLine: {
    position: 'absolute',
    top: '50%',
    width: '85%',
    height: 1.5,
    backgroundColor: colors.primary,
  },
  manualInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 15,
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  verifyBtn: {
    width: '100%',
    height: 55,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyBtnText: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1.5,
  },
  permissionText: { color: '#fff', marginBottom: 20, fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#111827',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  successIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIconText: { fontSize: 40, color: '#fff' },
  authorizedTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
  },
  userInfo: { alignItems: 'center', marginBottom: 30 },
  userName: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  userSection: { color: colors.textSecondary, fontSize: 13 },
  capacityCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  capacityLabel: { color: colors.textSecondary, fontSize: 10, marginBottom: 5 },
  capacityNumbers: { color: colors.primary, fontSize: 16, fontWeight: '900' },
  nextScanBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextScanText: { color: '#fff', fontWeight: '900', fontSize: 12, letterSpacing: 1 },
});
