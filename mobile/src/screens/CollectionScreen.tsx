import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import QRScanner from '../components/QRScanner';
import SubmitButton from '../components/SubmitButton';
import WeightInput from '../components/WeightInput';
import { useCollection } from '../hooks/useCollection';

export default function CollectionScreen() {
  const { qrId, setQrId, weight, setWeight, isSubmitting, error, successMessage, isFormValid, handleSubmit, resetState } = useCollection();
  const [localError, setLocalError] = useState<string | null>(null);

  const numericWeight = useMemo(() => Number(weight), [weight]);
  const hasQrId = qrId.trim().length > 0;

  const validateWeight = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setLocalError('Weight is required.');
      return;
    }

    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setLocalError('Weight must be a positive number.');
      return;
    }

    setLocalError(null);
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);
    if (value.trim()) {
      validateWeight(value);
    } else {
      setLocalError('Weight is required.');
    }
  };

  const handleSubmitPress = async () => {
    if (!hasQrId) {
      setLocalError('Please scan a bag QR code first.');
      return;
    }

    if (!Number.isFinite(numericWeight) || numericWeight <= 0) {
      setLocalError('Weight must be a positive number.');
      return;
    }

    await handleSubmit();
  };

  const showResetButton = successMessage && !isSubmitting;
  const showRetryButton = Boolean(error) && !isSubmitting;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Waste Collection</Text>
      <Text style={styles.subtitle}>Scan a bag, enter waste weight, and submit.</Text>

      <QRScanner onScan={(value) => {
        setQrId(value);
        setLocalError(null);
      }} disabled={isSubmitting} />

      {hasQrId ? <Text style={styles.scannedLabel}>Scanned Bag ID: {qrId}</Text> : null}

      <WeightInput
        value={weight}
        onChangeText={handleWeightChange}
        error={localError || error}
      />

      {error ? <ErrorMessage message={error} /> : null}
      {successMessage ? <ErrorMessage message={successMessage} success /> : null}

      {showRetryButton ? (
        <SubmitButton
          title="Retry"
          onPress={handleSubmitPress}
          disabled={!isFormValid || isSubmitting}
        />
      ) : !showResetButton ? (
        <SubmitButton
          title={isSubmitting ? 'Submitting…' : 'Submit Collection'}
          loading={isSubmitting}
          disabled={!isFormValid || isSubmitting}
          onPress={handleSubmitPress}
        />
      ) : null}

      {showResetButton ? (
        <SubmitButton
          title="Scan Next Bag"
          onPress={resetState}
          disabled={false}
        />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  subtitle: {
    color: '#475569',
    marginBottom: 18,
    fontSize: 15,
  },
  scannedLabel: {
    marginTop: 16,
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 16,
  },
});
