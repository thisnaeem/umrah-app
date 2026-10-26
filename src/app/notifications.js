import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import { DEFAULT_PREFS, getPrefs, savePrefs, requestNotificationPermission, schedulePrayerReminders, notify } from '../notifications';

const ITEMS = [
  { key: 'prayer', title: 'Prayer Reminders', detail: 'Daily reminders for Fajr, Dhuhr, Asr, Maghrib and Isha in Makkah.' },
  { key: 'sos', title: 'SOS Alerts from Group', detail: 'Immediate alert when a companion presses SOS / is lost.' },
  { key: 'sharingExpiry', title: 'Location Sharing Expiry', detail: 'Warning before your live location sharing ends.' },
  { key: 'group', title: 'Group Join Requests', detail: 'When someone requests to join your companion group.' },
  { key: 'rawdah', title: 'Rawdah Permit Reminder', detail: 'Reminder to book your Nusuk Rawdah slot early.' },
  { key: 'offers', title: 'Package Offers', detail: 'Occasional new package and service offers. Off by default.' },
];

export default function NotificationsScreen() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    getPrefs().then(setPrefs);
  }, []);

  async function toggle(key, value) {
    const next = await savePrefs({ ...prefs, [key]: value });
    setPrefs(next);
    if (key === 'prayer' && value) {
      await schedulePrayerReminders();
    }
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.sub}>Choose what the app alerts you about. Nothing is sent to anyone else — these are your own device alerts.</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={async () => setGranted(await requestNotificationPermission())}>
        <Text style={styles.btnText}>{granted ? '✓ Notifications Allowed' : 'Allow Notifications'}</Text>
      </TouchableOpacity>
      {ITEMS.map((item) => (
        <View key={item.key} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.detail}>{item.detail}</Text>
          </View>
          <Switch value={!!prefs[item.key]} onValueChange={(v) => toggle(item.key, v)} trackColor={{ true: colors.green }} />
        </View>
      ))}
      <TouchableOpacity style={styles.testBtn} onPress={() => notify('sos', 'Test Notification', 'This is how an SOS alert will look on your phone.')}>
        <Text style={styles.testText}>Send a Test Notification</Text>
      </TouchableOpacity>
      <View style={styles.note}>
        <Text style={styles.noteText}>Where notifications are used in this app:{'\n'}• Prayer screen — daily prayer reminders{'\n'}• Live Location — SOS alerts and sharing expiry{'\n'}• Companions — group join requests{'\n'}• Guide — Rawdah / Nusuk reminder</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  btn: { backgroundColor: colors.green, marginHorizontal: 18, marginTop: 12, paddingVertical: 13, borderRadius: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontFamily: fonts.bold },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 16, borderRadius: 18, gap: 12 },
  name: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink },
  detail: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: 4 },
  testBtn: { backgroundColor: colors.gold, marginHorizontal: 18, marginTop: 16, paddingVertical: 13, borderRadius: 14, alignItems: 'center' },
  testText: { color: '#fff', fontFamily: fonts.bold },
  note: { backgroundColor: '#FFFBEA', marginHorizontal: 18, marginTop: 16, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.gold },
  noteText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, lineHeight: 20 },
});
