# Umrah Guide — React Native (Expo) — Play Store App

One codebase for **Android and iPhone**. A public Umrah service app — not a single personal trip planner.

## What is in it

- **Home (redesigned):** Welcome + search, next prayer card, quick actions, featured packages, Dua of the Day, family safety card
- **Services:** Umrah packages (Economy / Standard / Family / Premium), visa, flights, hotels, transport, personal guide, Ziyarat tours — with filters and details
- **Duas:** Search + category filter, Arabic + transliteration + English meaning, favourites
- **Live Guide:** Step-by-step Umrah tracker — Ihram, Tawaf, Sa'i, Halq, Madinah — with checklists and progress
- **Companions (Sathi):** Find fellow traveller groups by city / date / language, join requests, create a group
- **3D Map:** Makkah and Madinah isometric 3D map — zoom, day/night, filters (Hotel / Masjid / Airport / Ziyarat), tap a pin for details, price, distance, and Jeddah → Makkah → Madinah route. **Navigation fix:** the app now uses a Stack + Tabs layout, so Map, Learn, Budget and Checklist open reliably. The old hidden-tab (`href: null`) layout was why Map did not open.
- **Live Location Sharing (professional):** Share your position only with your group, with a time limit (1h / 4h / end of day, auto-stop), a live group map, an agreed meeting point, and a one-tap **SOS — I Am Lost** button that highlights you to companions. Privacy controls are built in.
- **Notifications:** Prayer reminders, SOS alerts, location-sharing expiry, group join requests, Rawdah reminders and package offers — each can be toggled in the Notifications screen. Local notifications use `expo-notifications`; server notifications are stored in Postgres.
- **Prayer Times, Qibla Compass, Digital Tasbih, Ziyarat Places, Currency Converter, Emergency & Help:** the tools top Umrah apps offer, all in English
- **Learn, Budget, Checklist:** Umrah learning, budget calculator and packing/document checklist
- **Authentication:** Proper account creation and sign-in, backed by Prisma + Postgres (see `backend/`)

## UX / Icons / Fonts

- **Hugeicons — bottom navigation only.** Tabs use Hugeicons (direct per-icon imports in `src/icons.js`, without a `.js` suffix — the package exports map already adds it, otherwise Metro warns about `Home01Icon.js.js`). Everywhere else the app uses plain text / emoji, as requested.
- **Font:** Poppins (Regular / Medium / SemiBold / Bold)
- **Theme:** Deep green + gold + cream, rounded cards
- **Language:** English throughout the app UI.

## Run — Expo Go

```bash
cd umrah-trip-planner
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone.

## Backend — Prisma + Postgres

```bash
cd backend
docker compose up -d        # Postgres
npm install
npx prisma migrate dev --name init
npm run dev                 # http://localhost:4000
```

API: `POST /auth/register`, `POST /auth/login`, `GET /me`, `POST /location/share`, `GET /location/group/:groupId`, `POST /location/stop`, `GET /notifications`, `POST /notifications`. Passwords are hashed with bcrypt, auth uses JWT. Full details in `backend/README.md`.

For a real phone, set `EXPO_PUBLIC_API_URL` to your computer's LAN IP, e.g. `EXPO_PUBLIC_API_URL=http://192.168.0.105:4000 npx expo start`. Without a backend, use **Continue as Guest** in the app.

## Play Store (Android)

1. In `app.json`: name `Umrah Guide`, android package `com.thisnaeem.umrahguide` — this cannot change after the first upload, so confirm it first. iOS bundle: `com.thisnaeem.umrahguide`.
2. EAS build:
```bash
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile production
```
3. In Play Console, create the app, upload the AAB, complete store listing, screenshots, privacy policy URL and content rating, then submit for review.

## Honest notes — before Play Store

- **Packages / Services are listings, not live booking/payment:** provider / payment integration is still needed before taking bookings.
- **Companions groups are demo data in the app:** live matching uses the backend groups API; chat and verification are not yet built.
- **Map is not native Google Maps:** it is a custom isometric 3D map, so it works in Expo Go and EAS without an API key. Real Google Maps 3D needs `react-native-maps` + API key + a development build.
- **Prices are estimates:** confirm final prices at booking.
- **Location sharing in the app works offline with demo group members + your real GPS:** the backend endpoints are ready for live group sync once the backend is deployed.

## npm install fix (26 Oct 2026)

`react` is pinned to `19.3.1` because `react-dom@19.3.1` requires `react@^19.3.1` and `19.3.0` gave an ERESOLVE error on `npm install`. `expo-doctor` shows 1 cosmetic warning for this, but Android/iOS bundles build fine.

## Project structure

```
src/app/_layout.js        # Stack root + AuthProvider + notification permission
src/app/(tabs)/_layout.js # Bottom tabs (Hugeicons only here)
src/app/(tabs)/index.js   # Home
src/app/(tabs)/services.js, duas.js, guide.js, sathi.js, map.js
src/app/learn.js, budget.js, checklist.js
src/app/prayer.js, qibla.js, tasbih.js, ziyarat.js, currency.js, emergency.js
src/app/location.js       # Live location sharing + SOS
src/app/notifications.js  # Notification preferences
src/app/auth.js           # Sign in / create account
src/context/AuthContext.js
src/notifications.js      # expo-notifications helpers
src/icons.js              # Hugeicons direct imports (EMFILE fix, no .js suffix)
src/serviceData.js        # Packages, services, duas, guide, groups, places, prayer times, Ziyarat
backend/                  # Express + Prisma + Postgres
```
