# Umrah Trip Planner — React Native (Expo)

Ek hi code se **Android aur iPhone** dono par chalne wali app.

## Kya hai is me — sab kuch

- **Plan tab:** Lahore → Jeddah trip, family of 4, flight options (PIA Nov 19 recommended, Gulf Air Dec, Emirates Madinah), 7 nights ka itinerary (Makkah 4 + Madinah 3, wapas Day 8)
- **3D Map tab:** Makkah aur Madinah ka 3D-style interactive map. Hotel/masjid/airport pin par tap karein to details, price aur Haram se distance nazar aata hai. Hotel list se bhi select kar sakte hain.
  - Note: Ye map React Native views se bana stylized 3D-style map hai, taake Expo Go me dono phones par baghair dev build ke chale. Native Google Maps 3D buildings chahiye to baad me `react-native-maps` + development build add karna hoga.
- **Budget tab:** Calculator — flights, visa, hotel, transport, khana badlein, total PKR/USD khud update hota hai. Default rates andaza hain (1 USD = 280 PKR, 1 SAR = 75 PKR), final price booking par confirm karein.
- **Seekhein tab:** Umrah steps (Ihram, Tawaf, Sai, Tahallul, Rawdah), airport se safar guide, bachon ke saath tips.
- **Checklist tab:** Documents, health/Nusuk, packing — tick karein, progress % dekhein.

## UI / UX

- Modern font: **Poppins** (Regular / Medium / SemiBold / Bold) via `@expo-google-fonts/poppins`
- Cool theme: deep green + gold + cream, gradient hero, rounded cards, bottom tabs (Expo Router)

## Chalayein — Android + iPhone (Expo Go, sab se easy)

```bash
cd umrah-trip-planner
npm install
npx expo start
```

Phir phone me **Expo Go** app kholein aur QR code scan karein. Android aur iPhone dono isi tarah chalenge.

## Store ke liye build (EAS)

```bash
npx eas-cli@latest login
npx eas-cli@latest build --platform android
npx eas-cli@latest build --platform ios
```

iOS build ke liye Apple Developer account chahiye, Android ke liye Play Console.

## Project structure

```
src/app/_layout.js      # Expo Router tabs + Poppins fonts
src/app/index.js        # Plan + itinerary + flights
src/app/map.js          # 3D-style Makkah/Madinah map + airport info
src/app/budget.js       # Budget calculator
src/app/learn.js        # Umrah learning guide
src/app/checklist.js    # Checklist with progress
src/data.js             # Flights, hotels, itinerary, transport, learning data
src/theme.js            # Colors + fonts
```

## npm install fix (26 Oct 2026)

`react` ko `19.3.1` par rakha gaya hai, kyunke `react-dom@19.3.1` ko `react@^19.3.1` chahiye tha aur `19.3.0` par `npm install` ERESOLVE error deta tha. Is fix ke baad clean `npm install` baghair `--legacy-peer-deps` ke chal gaya. Note: `expo-doctor` is par 1 cosmetic warning dikhata hai (expected 19.3.0, found 19.3.1), lekin Android/iOS bundle ban jate hain.

## Verification (is machine par kiya gaya)

- `npx expo-doctor` — 20/20 checks passed
- `npx expo export --platform android` — bundle bana (1184 modules)
- `npx expo export --platform ios` — bundle bana

Prices/flights 26 Oct 2026 ki research par based hain aur change ho sakte hain — booking se pehle dobara confirm karein.
