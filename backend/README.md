# Umrah Guide Backend — Prisma + Postgres

## Quick start (local)

1. Start Postgres with Docker:
   ```
   docker compose up -d
   ```
   Or use your own Postgres and set `DATABASE_URL` in `backend/.env`:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/umrah_guide?schema=public"
   JWT_SECRET="change-this-to-a-long-random-secret"
   PORT=4000
   ```

2. Install, generate Prisma client, migrate:
   ```
   cd backend
   npm install
   npx prisma migrate dev --name init
   npm run dev
   ```

3. Test: `curl http://localhost:4000/health` → `{"ok":true}`

## Connect the app

In the app, set `EXPO_PUBLIC_API_URL` to your computer's LAN IP when testing on a real phone, e.g.:
```
EXPO_PUBLIC_API_URL=http://192.168.0.105:4000 npx expo start
```
Default is `http://localhost:4000` (works in iOS simulator / web).

## API

- `POST /auth/register` — { name, email, password, city? } → { token, user }
- `POST /auth/login` — { email, password } → { token, user }
- `GET /me` — Bearer token → user
- `POST /location/share` — Bearer token, { latitude, longitude, groupId, sharedUntil?, isSos? }
- `GET /location/group/:groupId` — Bearer token → latest shares
- `POST /location/stop` — Bearer token, { groupId }
- `GET /notifications` — Bearer token → server notifications
- `POST /notifications` — Bearer token, { userId, category, title, body }

Passwords are hashed with bcrypt and never stored in plain text. JWT tokens last 30 days.
