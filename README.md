<<<<<<< HEAD
# Waste Collection Management System

A full-stack monorepo for a waste collection workflow with a mobile scanner for collectors, a Node.js + Express backend, and a responsive Next.js admin dashboard.

## Tech Stack

- Mobile: React Native + Expo + TypeScript + Expo Camera
- Backend: Node.js + Express + TypeScript
- Admin: Next.js + TypeScript
- API: REST with Axios
- State management: React hooks + custom hooks
- Storage: In-memory array for initial implementation
- Tests: Jest + Supertest

## Project Structure

```text
waste-collection/
├── mobile/                 # Expo app
├── backend/                # Express API server
├── admin/                  # Next.js dashboard
├── docs/
│   ├── architecture.md
│   └── system-flow.md
├── README.md
├── .gitignore
└── package.json
```

## Prerequisites

- Node.js 18+
- npm 9+
- Expo CLI (installed via package dependencies)
- Optional: Android Studio with emulator
- Optional: physical Android device for LAN testing

## Installation

```bash
cd waste-collection
npm install
cd backend && npm install
cd ../mobile && npm install
cd ../admin && npm install
```

If you want to use the root workspace script directly, the workspace packages are already set up.

## Environment Variables

### Backend

Create `backend/.env`:

```env
PORT=4000
CORS_ORIGIN=http://localhost:3000
REQUEST_DELAY_MS=3000
```

### Mobile

Create `mobile/.env`:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.10:4000
```

### Admin

Create `admin/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

If the admin is being served on a different machine or container, use the backend host IP instead of `localhost`.

## Start the apps

### Backend

```bash
cd waste-collection/backend
npm run dev
```

### Admin Dashboard

```bash
cd waste-collection/admin
npm run dev
```

### Mobile app

```bash
cd waste-collection/mobile
npm start
```

Then use the Expo Go app or Android emulator to run the app.

## API Overview

### Create a collection

```http
POST /api/collections
Content-Type: application/json

{
  "qr_id": "BAG001",
  "weight": 10,
  "timestamp": "2026-10-03T10:30:00.000Z"
}
```

### Retrieve all collections

```http
GET /api/collections
```

### Health check

```http
GET /health
```

## Testing

### Backend tests

```bash
cd waste-collection/backend
npm test
```

## Examples: cURL and Postman

### Create collection via cURL

```bash
curl -X POST http://localhost:4000/api/collections \
  -H "Content-Type: application/json" \
  -d '{
    "qr_id": "BAG001",
    "weight": 10,
    "timestamp": "2026-10-03T10:30:00.000Z"
  }'
```

### Get all collections

```bash
curl http://localhost:4000/api/collections
```

### Postman

1. Create a new request collection.
2. Add a `POST` request to `http://localhost:4000/api/collections`.
3. Set the body to `raw` JSON.
4. Save requests for create and list operations.
5. Add a test script to inspect status codes if desired.

## Running Expo on Android emulator or device

### Android emulator

- Start Android Studio emulator.
- Run:

```bash
cd waste-collection/mobile
npm start
```

Then press `a` in the terminal or choose the emulator in Expo.

### Physical Android device

- Connect the Android device to the same Wi-Fi network as your computer.
- Find your computer LAN IP, for example `192.168.1.10`.
- Update `mobile/.env` to:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.10:4000
```

- Start the app with Expo Go and scan the QR code from the terminal.

Do not use `localhost` from a physical device because it points to the device itself, not your computer.

### Web admin dashboard

Use:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

If the dashboard runs in a browser on the same machine, `localhost` works correctly.

## Assumptions and limitations

- The initial storage is an in-memory array, so data resets when the backend restarts.
- Duplicate prevention is implemented safely in memory and is designed to be atomic if swapped to a database later.
- The mobile app simulates a 3-second network delay by default for the required UX behavior.
- Camera permissions rely on Expo Camera permissions and native device behavior.

## Known commands

```bash
# backend tests
cd waste-collection/backend && npm test

# backend dev server
cd waste-collection/backend && npm run dev

# admin dashboard
cd waste-collection/admin && npm run dev

# mobile app
cd waste-collection/mobile && npm start
```
=======
# waste-collection-system
Field waste collection flow: React Native (Expo) collector app, Node.js API, Next.js admin dashboard
>>>>>>> 0f2608238006686b1923d69416a441da0e0089b8
