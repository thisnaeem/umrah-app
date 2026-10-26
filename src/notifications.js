// Notifications — Expo Go safe version.
//
// IMPORTANT: Do NOT import 'expo-notifications' at the top of this file.
// On Android, Expo Go (SDK 53+) does not include the push-notification
// native module 'ExpoTopicSubscriptionModule'. A top-level import crashes
// the whole app at startup with:
//   "Cannot find native module 'ExpoTopicSubscriptionModule'"
// and then Expo Router reports every screen that imports this file as
// "missing the required default export" — that is a cascade, not the real
// problem. The real problem is the native module.
//
// So this file lazy-loads expo-notifications only when a notification is
// actually requested, and swallows the failure in Expo Go. Prefs, SOS and
// location screens still work; they just cannot show a system notification
// in Expo Go on Android. In a development build / production build (where
// the native module is present), notifications work normally.

import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFS_KEY = 'umrah_notification_prefs';
export const DEFAULT_PREFS = {
  prayer: true,
  sos: true,
  sharingExpiry: true,
  group: true,
  rawdah: true,
  offers: false,
};

let NotificationsModule = null;
let loadFailed = false;
let handlerSet = false;

async function getNotifications() {
  if (NotificationsModule) return NotificationsModule;
  if (loadFailed) return null;
  try {
    const mod = await import('expo-notifications');
    NotificationsModule = mod;
    if (!handlerSet) {
      mod.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      handlerSet = true;
    }
    return mod;
  } catch {
    // Expo Go on Android, or any build without the native module.
    loadFailed = true;
    return null;
  }
}

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
  try {
    const mod = await getNotifications();
    if (!mod) return false;
    const { status } = await mod.requestPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

// Schedule a local notification, only if that category is enabled.
// Returns null (no crash) when notifications are unavailable in Expo Go.
export async function notify(category, title, body, seconds = 1) {
  try {
    const prefs = await getPrefs();
    if (!prefs[category]) return null;
    const mod = await getNotifications();
    if (!mod) return null;
    return await mod.scheduleNotificationAsync({
      content: { title, body, sound: true },
      trigger: seconds > 0 ? { type: 'timeInterval', seconds } : null,
    });
  } catch {
    return null;
  }
}

export async function schedulePrayerReminders() {
  try {
    const prefs = await getPrefs();
    if (!prefs.prayer) return;
    const mod = await getNotifications();
    if (!mod) return;
    await mod.cancelAllScheduledNotificationsAsync();
    const prayers = [
      { name: 'Fajr', time: '05:12' },
      { name: 'Dhuhr', time: '12:18' },
      { name: 'Asr', time: '15:38' },
      { name: 'Maghrib', time: '17:52' },
      { name: 'Isha', time: '19:22' },
    ];
    for (const p of prayers) {
      const [h, m] = p.time.split(':').map(Number);
      await mod.scheduleNotificationAsync({
        content: { title: `${p.name} Prayer`, body: `${p.name} time is ${p.time} in Makkah. Time for prayer.` },
        trigger: { type: 'calendar', hour: h, minute: m, repeats: true },
      });
    }
  } catch {
    // Notifications unavailable in this build — ignore, do not crash.
  }
}

export async function notifySos() {
  return notify('sos', 'SOS — Group Member Needs Help', 'A companion in your group pressed SOS. Open Live Location to see their position.');
}

export async function notifySharingExpiry(durationLabel) {
  return notify('sharingExpiry', 'Location Sharing Ending Soon', `Your live location sharing (${durationLabel}) is about to end. Extend it from Live Location if needed.`, 5);
}
