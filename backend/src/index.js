require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'umrah-guide-dev-secret-change-me';
const PORT = process.env.PORT || 4000;

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
}

function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/health', (req, res) => res.json({ ok: true }));

// --- Auth: account creation + login ---
app.post('/auth/register', async (req, res) => {
  const { name, email, password, city } = req.body || {};
  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Name, email and a password of at least 6 characters are required.' });
  }
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) return res.status(400).json({ error: 'An account with this email already exists.' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email: email.toLowerCase(), passwordHash, city: city || null },
  });
  res.json({ token: sign(user), user: { id: user.id, name: user.name, email: user.email, city: user.city } });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await prisma.user.findUnique({ where: { email: (email || '').toLowerCase() } });
  if (!user) return res.status(401).json({ error: 'Invalid email or password.' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid email or password.' });
  res.json({ token: sign(user), user: { id: user.id, name: user.name, email: user.email, city: user.city } });
});

app.get('/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, name: user.name, email: user.email, city: user.city });
});

// --- Live location sharing ---
app.post('/location/share', auth, async (req, res) => {
  const { latitude, longitude, groupId, sharedUntil, isSos } = req.body || {};
  if (typeof latitude !== 'number' || typeof longitude !== 'number' || !groupId) {
    return res.status(400).json({ error: 'latitude, longitude and groupId are required.' });
  }
  const share = await prisma.locationShare.upsert({
    where: { userId_groupId: { userId: req.user.id, groupId } },
    update: { latitude, longitude, sharedUntil: sharedUntil || null, isSos: !!isSos },
    create: { userId: req.user.id, groupId, latitude, longitude, sharedUntil: sharedUntil || null, isSos: !!isSos },
  });
  if (isSos) {
    // Create SOS notifications for other group members.
    const members = await prisma.groupMember.findMany({ where: { groupId, NOT: { userId: req.user.id } } });
    for (const m of members) {
      await prisma.notification.create({
        data: { userId: m.userId, category: 'sos', title: 'SOS — Group Member Needs Help', body: 'A companion pressed SOS. Open Live Location to see their position.' },
      });
    }
  }
  res.json(share);
});

app.get('/location/group/:groupId', auth, async (req, res) => {
  const shares = await prisma.locationShare.findMany({
    where: { groupId: req.params.groupId },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { updatedAt: 'desc' },
  });
  res.json(shares);
});

app.post('/location/stop', auth, async (req, res) => {
  const { groupId } = req.body || {};
  if (!groupId) return res.status(400).json({ error: 'groupId is required.' });
  await prisma.locationShare.deleteMany({ where: { userId: req.user.id, groupId } });
  res.json({ ok: true });
});

// --- Notifications (server-side records) ---
app.get('/notifications', auth, async (req, res) => {
  const items = await prisma.notification.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' }, take: 50 });
  res.json(items);
});

app.post('/notifications', auth, async (req, res) => {
  const { userId, category, title, body } = req.body || {};
  if (!userId || !title) return res.status(400).json({ error: 'userId and title are required.' });
  const item = await prisma.notification.create({ data: { userId, category: category || 'general', title, body: body || '' } });
  res.json(item);
});

app.listen(PORT, () => console.log(`Umrah Guide backend running on http://localhost:${PORT}`));
