# AutoPay Mobile

AutoPay Mobile is the Expo React Native client for AutoPay, a Nigerian fintech app focused on automated bill payments, open banking, budgeting, insights, and family spending. This repository contains the frontend implementation only. All backend API calls are mocked for now and clearly marked with `// TODO: integrate with Go backend` comments.

## Prerequisites
- Node.js 18+
- pnpm, npm, or yarn
- Expo CLI (`npm install -g expo`)

## Getting Started
```bash
npm install
npm run dev
```
Scan the QR code with Expo Go on iOS/Android.

## Scripts
- `npm run dev` – start Metro bundler
- `npm run lint` – run ESLint
- `npm run test` – run Jest tests
- `npm run typecheck` – run TypeScript in no-emit mode
- `npm run prepare` – install Husky git hooks (optional)

## Environment Variables
Copy `.env.example` to `.env` and update:
- `API_BASE_URL` – backend REST endpoint
- `OPEN_BANKING_PROVIDER` – `mono`, `okra`, or `stitch`
- `BUILD_ENV` – `dev`, `staging`, or `prod`

## Folder Structure
```
/src
  app/                # Global providers
  navigation/         # Navigation stacks & types
  screens/            # Feature screens and flows
  components/         # Shared UI components
  store/              # Zustand stores & types
  services/           # API clients, adapters, mocks
  utils/              # Helpers, constants, theming
  hooks/              # Reusable hooks
  i18n/               # Translation setup
```

## Mock Data
Mock services live under `src/services/mocks`. Replace with live Go backend integrations later by removing the mock seeds and wiring the API client in the marked sections.

## Security Notes
- Sensitive data (PINs, biometric tokens) is persisted with Expo Secure Store.
- Balances are masked by default; revealing them requires explicit user action.
- Session timeout locks the app after extended backgrounding.
- Network errors provide user-friendly retry options.

## Testing
Example tests are included in `__tests__`. Add more coverage as the app grows.

## Backend Integration
All mock network calls are annotated with `// TODO: integrate with Go backend`. Replace these implementations with real service calls once the Go backend is available.
