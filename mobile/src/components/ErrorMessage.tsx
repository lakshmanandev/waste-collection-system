import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorMessageProps {
  message?: string | null;
  success?: boolean;
}

export default function ErrorMessage({ message, success = false }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <View style={[styles.container, success ? styles.success : styles.error]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
  },
  error: {
    backgroundColor: '#fee2e2',
  },
  success: {
    backgroundColor: '#dcfce7',
  },
  text: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
});
