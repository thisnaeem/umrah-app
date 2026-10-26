import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const { user, register, login, logout, continueAsGuest, apiUrl } = useAuth();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!email || !password) return Alert.alert('Missing fields', 'Please enter email and password.');
    if (mode === 'register' && !name) return Alert.alert('Missing fields', 'Please enter your name.');
    setBusy(true);
    try {
      if (mode === 'register') await register(name, email, password, city);
      else await login(email, password);
      Alert.alert('Welcome', 'You are signed in.');
    } catch (e) {
      Alert.alert('Could not sign in', `${e.message}\n\nBackend: ${apiUrl}\nIf the backend is not running, use Continue as Guest to explore the app.`);
    } finally {
      setBusy(false);
    }
  }

  if (user && !user.guest) {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>My Account</Text>
        <View style={styles.card}><Text style={styles.name}>{user.name}</Text><Text style={styles.detail}>{user.email}</Text><Text style={styles.detail}>{user.city || 'No city set'}</Text></View>
        <TouchableOpacity style={styles.btn} onPress={logout}><Text style={styles.btnText}>Sign Out</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.title}>{mode === 'login' ? 'Sign In' : 'Create Account'}</Text>
      <Text style={styles.sub}>Accounts are stored in Postgres via Prisma. Passwords are never stored in plain text — they are hashed with bcrypt.</Text>
      <View style={styles.tabs}>
        {['login', 'register'].map((m) => (
          <TouchableOpacity key={m} onPress={() => setMode(m)} style={[styles.tab, mode === m && styles.tabActive]}><Text style={[styles.tabText, mode === m && styles.tabTextActive]}>{m === 'login' ? 'Sign In' : 'Create Account'}</Text></TouchableOpacity>
        ))}
      </View>
      {mode === 'register' && (
        <>
          <TextInput style={styles.input} placeholder="Full name" placeholderTextColor={colors.muted} value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="City (optional)" placeholderTextColor={colors.muted} value={city} onChangeText={setCity} />
        </>
      )}
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.muted} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password (min 6 characters)" placeholderTextColor={colors.muted} secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={[styles.btn, busy && { opacity: 0.6 }]} onPress={submit} disabled={busy}><Text style={styles.btnText}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}</Text></TouchableOpacity>
      <TouchableOpacity style={styles.guest} onPress={continueAsGuest}><Text style={styles.guestText}>Continue as Guest →</Text></TouchableOpacity>
      <Text style={styles.note}>To run the backend locally, see backend/README.md: Postgres with Docker, then `npx prisma migrate dev` and `npm run dev`. Set EXPO_PUBLIC_API_URL to your computer's IP when testing on a real phone.</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream, padding: 20 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  tabs: { flexDirection: 'row', gap: 8, marginTop: 16 },
  tab: { flex: 1, backgroundColor: '#fff', paddingVertical: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.sand },
  tabActive: { backgroundColor: colors.green, borderColor: colors.green },
  tabText: { fontFamily: fonts.bold, color: colors.ink },
  tabTextActive: { color: '#fff' },
  input: { backgroundColor: '#fff', padding: 14, borderRadius: 14, marginTop: 12, fontFamily: fonts.regular, borderWidth: 1, borderColor: colors.sand },
  btn: { backgroundColor: colors.green, paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 16 },
  btnText: { color: '#fff', fontFamily: fonts.bold },
  guest: { alignItems: 'center', marginTop: 16 },
  guestText: { fontFamily: fonts.bold, color: colors.green },
  note: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, lineHeight: 18, marginTop: 20 },
  card: { backgroundColor: '#fff', padding: 18, borderRadius: 18, marginTop: 16 },
  name: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink },
  detail: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 4 },
});
