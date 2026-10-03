import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 4000),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  requestDelayMs: Number(process.env.REQUEST_DELAY_MS || 3000),
};
