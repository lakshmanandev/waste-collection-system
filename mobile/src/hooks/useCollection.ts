import { useCallback, useMemo, useState } from 'react';
import { config } from '../config/env';
import { createCollection } from '../services/collectionService';
import { CollectionPayload } from '../types/collection';

export const useCollection = () => {
  const [qrId, setQrId] = useState('');
  const [weight, setWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isFormValid = useMemo(() => {
    const parsed = Number(weight);
    return qrId.trim().length > 0 && Number.isFinite(parsed) && parsed > 0;
  }, [qrId, weight]);

  const resetState = useCallback(() => {
    setQrId('');
    setWeight('');
    setError(null);
    setSuccessMessage(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const payload: CollectionPayload = {
      qr_id: qrId.trim(),
      weight: Number(weight),
      timestamp: new Date().toISOString(),
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, config.requestDelayMs));
      const response = await createCollection(payload);
      setSuccessMessage(response.message || 'Collection successful');
      setError(null);
    } catch (err) {
      const typedError = err as { status?: number; message?: string };
      const message = typedError.message || 'Something went wrong';
      setError(message);
      setSuccessMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  }, [isFormValid, isSubmitting, qrId, weight]);

  return {
    qrId,
    setQrId,
    weight,
    setWeight,
    isSubmitting,
    error,
    successMessage,
    isFormValid,
    handleSubmit,
    resetState,
  };
};
