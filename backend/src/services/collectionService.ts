import { CollectionRecord, CreateCollectionInput } from '../types/collection';
import { normalizeQrId } from '../utils/validation';

const collections: CollectionRecord[] = [];
const seenQrIds = new Set<string>();

export const getAllCollections = (): CollectionRecord[] =>
  [...collections].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export const createCollection = (input: CreateCollectionInput): CollectionRecord => {
  const normalizedQrId = normalizeQrId(input.qr_id);
  if (seenQrIds.has(normalizedQrId)) {
    throw new Error('DUPLICATE_QR_ID');
  }

  const collection: CollectionRecord = {
    qr_id: normalizedQrId,
    weight: Number(input.weight),
    points: Math.round(Number(input.weight) * 15),
    timestamp: new Date(input.timestamp).toISOString(),
  };

  seenQrIds.add(normalizedQrId);
  collections.unshift(collection);

  return collection;
};

export const hasCollectionForQrId = (qrId: string): boolean => seenQrIds.has(normalizeQrId(qrId));

export const resetCollectionsForTests = (): void => {
  collections.length = 0;
  seenQrIds.clear();
};
