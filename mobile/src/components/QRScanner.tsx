import React, { useEffect, useState } from 'react';
import { Camera, CameraView, PermissionStatus } from 'expo-camera';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface QRScannerProps {
  onScan: (qrId: string) => void;
  disabled?: boolean;
}

export default function QRScanner({ onScan, disabled = false }: QRScannerProps) {
  const [permission, setPermission] = useState<PermissionStatus | null>(null);
  const [scanned, setScanned] = useState(false);

  const requestPermission = async () => {
    const result = await Camera.requestCameraPermissionsAsync();
    setPermission(result.status);
    if (result.status === 'granted') {
      setScanned(false);
    }
  };

  useEffect(() => {
    void requestPermission();
  }, []);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scanned || disabled) {
      return;
    }

    setScanned(true);
    onScan(data.trim());
  };

  if (permission === null) {
    return <View style={styles.center}><Text>Requesting camera access…</Text></View>;
  }

  if (permission !== 'granted') {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.heading}>Camera permission required</Text>
        <Text style={styles.message}>To scan QR bags, allow access to the camera in this app or enable it in your device settings.</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Request permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.cameraWrap}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />
      {scanned && (
        <View style={styles.overlay} pointerEvents="none">
          <Text style={styles.overlayText}>Bag scanned</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
    backgroundColor: '#eaf2ff',
    borderRadius: 18,
  },
  permissionContainer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dfe7f5',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1f2937',
  },
  message: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  cameraWrap: {
    overflow: 'hidden',
    borderRadius: 18,
    minHeight: 230,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#dfe7f5',
  },
  camera: {
    width: '100%',
    height: 260,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.2)',
  },
  overlayText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
