export const config = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000',
  requestDelayMs: Number(process.env.EXPO_PUBLIC_REQUEST_DELAY_MS || 3000),
};
