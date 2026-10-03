import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Unhandled error:', error);

  if (error instanceof Error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
    return;
  }

  res.status(500).json({ message: 'Internal server error' });
};
