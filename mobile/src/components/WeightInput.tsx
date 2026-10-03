import React from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';

interface WeightInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string | null;
}

export default function WeightInput({ value, onChangeText, error }: WeightInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Waste Weight (kg)</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        placeholder="Enter weight"
        style={[styles.input, error ? styles.inputError : null]}
        accessibilityLabel="Waste weight input"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbe3ee',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  error: {
    marginTop: 6,
    color: '#dc2626',
    fontSize: 12,
  },
});
