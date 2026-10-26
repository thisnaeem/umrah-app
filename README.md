# Umrah Guide — React Native (Expo) — Play Store App

Ek hi code se **Android aur iPhone** dono par chalne wali public Umrah service app. Ye kisi ek trip ka planner nahi hai — ye Umrah ki service dene ke liye bani hai.

## Kya hai is me

- **Home:** Services, duas, live guide, sathi, 3D map aur seekhein ke quick actions, packages aur aaj ki dua
- **Services:** Umrah packages (Economy / Standard / Family / Premium), visa, flights, hotels, transport, personal guide, ziyarat tours — filter ke saath, details ke saath
- **Duas:** Search + category filter, Arabic + Roman Urdu transliteration + meaning, favourite
- **Live Guide:** Umrah ke doran step-by-step tracker — Ihram, Tawaf, Sai, Halq, Madinah — har step ka checklist aur progress, emergency tips
- **Sathi Finder:** Sheher / date / language ke hisab se fellow travellers groups dhoondhein, join request, apna group banayein (demo data, neeche note dekhein)
- **3D Map:** Makkah aur Madinah ka isometric 3D map — zoom, day/night, filter (Hotel / Masjid / Airport / Ziyarat), pin par tap kar ke details, price, distance, aur Jeddah → Makkah → Madinah route
- **Seekhein:** Umrah steps, airport guide, bachon ke saath tips
- **Budget / Checklist:** Purane trip planner screens bhi maujood hain (Home se nahi, direct route se)

## UX / Icons / Fonts

- **Hugeicons:** `@hugeicons/react-native` + `@hugeicons/core-free-icons` (free). Important: icons ko package index se import nahi kiya gaya, `src/icons.js` me direct per-icon files import ki gayi hain — warna Metro 6000+ files khol kar EMFILE error deta hai.
- **Font:** Poppins (Regular / Medium / SemiBold / Bold)
- **Theme:** Deep green + gold + cream, rounded cards, bottom tabs (Expo Router)

## Chalayein — Expo Go

```bash
cd umrah-trip-planner
npm install
npx expo start
```

Phone me Expo Go se QR scan karein.

## Play Store par upload (Android)

1. App name, package aur version `app.json` me set hain:
   - name: `Umrah Guide`
   - android package: `com.thisnaeem.umrahguide` — pehli upload ke baad ye change nahi hota, is liye pehle confirm kar lein
   - iOS bundle: `com.thisnaeem.umrahguide`
2. EAS build:
```bash
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile production
```
3. Play Console me app banayein, AAB upload karein, store listing, screenshots, privacy policy URL aur content rating poori karein, phir review ke liye submit karein.

## Honest notes — Play Store se pehle ye zaroori hain

- **Packages / Services listings hain, live booking / payment nahi:** Booking ya payment lene se pehle provider / payment integration chahiye hogi.
- **Sathi Finder demo data hai:** Live matching, chat aur verification ke liye backend (auth, database, moderation) chahiye hoga. Private phone numbers app me share nahi hote.
- **Map native Google Maps nahi hai:** Ye custom isometric 3D map hai, taake bina Google API key ke Expo Go aur EAS dono me chale. Real Google Maps 3D chahiye to `react-native-maps` + API key + development build add karna hoga.
- **Prices andaza hain:** Final price booking par confirm karein.

## npm install fix (26 Oct 2026)

`react` ko `19.3.1` par rakha gaya hai, kyunke `react-dom@19.3.1` ko `react@^19.3.1` chahiye tha aur `19.3.0` par `npm install` ERESOLVE error deta tha. `expo-doctor` is par 1 cosmetic warning dikhata hai (expected 19.3.0, found 19.3.1), lekin Android/iOS bundle ban jate hain.

## Project structure

```
src/app/_layout.js      # Expo Router tabs + Poppins + Hugeicons tabs
src/app/index.js        # Home
src/app/services.js     # Packages + services
src/app/duas.js         # Duas
src/app/guide.js        # Live Umrah guide tracker
src/app/sathi.js        # Sathi finder
src/app/map.js          # Isometric 3D map
src/app/learn.js        # Learning
src/app/budget.js       # Budget calculator
src/app/checklist.js    # Checklist
src/icons.js            # Hugeicons direct imports (EMFILE fix)
src/serviceData.js      # Packages, services, duas, guide, sathi, places
src/data.js             # Itinerary, airport info, learning (legacy)
src/theme.js            # Colors + fonts
```
