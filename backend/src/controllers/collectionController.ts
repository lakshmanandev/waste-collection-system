import { NextFunction, Request, Response } from 'express';
import { createCollection, getAllCollections } from '../services/collectionService';
import { isNonEmptyString, isPositiveFiniteNumber, isValidIsoDateTime, normalizeQrId } from '../utils/validation';

export const createCollectionHandler = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { qr_id, weight, timestamp } = req.body ?? {};

    if (
      !isNonEmptyString(qr_id) ||
      !isPositiveFiniteNumber(weight) ||
      !isValidIsoDateTime(timestamp)
    ) {
      res.status(400).json({ message: 'Invalid collection data' });
      return;
    }

    const normalizedQrId = normalizeQrId(qr_id);
    const payload = {
      qr_id: normalizedQrId,
      weight: Number(weight),
      timestamp: new Date(timestamp).toISOString(),
    };

    try {
      const collection = createCollection(payload);
      res.status(201).json({
        message: 'Collection successful',
        data: collection,
      });
      return;
    } catch (error) {
      if (error instanceof Error && error.message === 'DUPLICATE_QR_ID') {
        res.status(409).json({ message: 'This bag has already been collected' });
        return;
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const getCollectionsHandler = (_req: Request, res: Response): void => {
  const collections = getAllCollections();
  res.status(200).json({
    message: 'Collections retrieved successfully',
    data: collections,
  });
};
