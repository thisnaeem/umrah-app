import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const PREFS_KEY = 'umrah_notification_prefs';
export const DEFAULT_PREFS = {
  prayer: true,
  sos: true,
  sharingExpiry: true,
  group: true,
  rawdah: true,
  offers: false,
};

export async function getPrefs() {
  try {
    const raw = await AsyncStorage.getItem(PREFS_KEY);
    return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

export async function savePrefs(prefs) {
  await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  return prefs;
}

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Schedule a local notification, only if that category is enabled.
export async function notify(category, title, body, seconds = 1) {
  const prefs = await getPrefs();
  if (!prefs[category]) return null;
  return Notifications.scheduleNotificationAsync({
    content: { title, body, sound: true },
    trigger: seconds > 0 ? { seconds, type: 'timeInterval' } : null,
  });
}

export async function schedulePrayerReminders() {
  const prefs = await getPrefs();
  if (!prefs.prayer) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
  const prayers = [
    { name: 'Fajr', time: '05:12' },
    { name: 'Dhuhr', time: '12:18' },
    { name: 'Asr', time: '15:38' },
    { name: 'Maghrib', time: '17:52' },
    { name: 'Isha', time: '19:22' },
  ];
  for (const p of prayers) {
    const [h, m] = p.time.split(':').map(Number);
    await Notifications.scheduleNotificationAsync({
      content: { title: `${p.name} Prayer`, body: `${p.name} time is ${p.time} in Makkah. Time for prayer.` },
      trigger: { hour: h, minute: m, repeats: true, type: 'daily' },
    });
  }
}

export async function notifySos() {
  return notify('sos', '🆘 SOS — Group Member Needs Help', 'A companion in your group pressed SOS. Open Live Location to see their position.');
}

export async function notifySharingExpiry(durationLabel) {
  return notify('sharingExpiry', 'Location Sharing Ending Soon', `Your live location sharing (${durationLabel}) is about to end. Extend it from Live Location if needed.`, 5);
}
