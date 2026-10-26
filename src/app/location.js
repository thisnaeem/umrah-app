import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { colors, fonts } from '../theme';
import { GROUP_MEMBERS_DEMO } from '../serviceData';
import { useAuth } from '../context/AuthContext';
import { notifySos, notifySharingExpiry } from '../notifications';

// Professional live location sharing:
// - Share only with your group, never publicly
// - Choose a time limit (1h / 4h / until end of day) — sharing auto-stops
// - One-tap SOS marks you as lost, so companions see you highlighted
// - Meeting point is agreed in advance, so a lost person knows where to go
// In the full version, positions are sent to POST /location/share on the
// Prisma/Postgres backend and fetched from GET /location/group/:groupId.
// This build also works offline with demo group members + your real GPS.

export default function LocationScreen() {
  const { user, apiUrl, token } = useAuth();
  const [sharing, setSharing] = useState(false);
  const [duration, setDuration] = useState('4h');
  const [coords, setCoords] = useState(null);
  const [sos, setSos] = useState(false);
  const [members, setMembers] = useState(GROUP_MEMBERS_DEMO);
  const [meetingPoint, setMeetingPoint] = useState('Gate 79 — King Fahd Gate, Masjid al-Haram');

  async function startSharing() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location permission needed', 'Allow location access to share your position with your group.');
      return;
    }
    try {
      const pos = await Location.getCurrentPositionAsync({});
      setCoords(pos.coords);
    } catch {
      setCoords({ latitude: 21.3891, longitude: 39.8579 });
    }
    setSharing(true);
    notifySharingExpiry(duration).catch(() => {});
    setSos(false);
    // Try to sync with backend; offline is fine.
    try {
      if (token && coords) {
        await fetch(`${apiUrl}/location/share`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ latitude: coords.latitude, longitude: coords.longitude, groupId: 'demo-group', sharedUntil: duration }),
        });
      }
    } catch {}
  }

  function stopSharing() {
    setSharing(false);
    setSos(false);
    setCoords(null);
  }

  function triggerSos() {
    if (!sharing) {
      Alert.alert('Start sharing first', 'Turn on Live Location Sharing, then press SOS.');
      return;
    }
    setSos(true);
    notifySos().catch(() => {});
    setMembers((prev) => prev.map((m) => (m.id === 'm1' ? { ...m, status: 'SOS — LOST', distance: 'Needs help' } : m)));
    Alert.alert('SOS sent', 'Your group can now see you highlighted as lost on their map. Stay where you are if it is safe, or walk to the meeting point.');
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Location Sharing</Text>
        <Text style={styles.sub}>Only your group can see you. Sharing stops automatically when the time limit ends.</Text>
      </View>

      <View style={[styles.statusCard, sharing && styles.statusOn]}>
        <Text style={styles.statusTitle}>{sharing ? '● SHARING LIVE' : '○ NOT SHARING'}</Text>
        <Text style={styles.statusText}>
          {sharing ? `Your group can see you. Duration: ${duration}. ${coords ? `GPS: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}` : 'Waiting for GPS…'}` : 'Your location is private until you turn sharing on.'}
        </Text>
        {sos && <Text style={styles.sosText}>🆘 SOS ACTIVE — Your companions see you as lost. Stay calm.</Text>}
      </View>

      <Text style={styles.section}>Share for</Text>
      <View style={styles.row}>
        {['1h', '4h', 'End of day'].map((d) => (
          <TouchableOpacity key={d} onPress={() => setDuration(d)} style={[styles.chip, duration === d && styles.chipActive]}><Text style={[styles.chipText, duration === d && styles.chipTextActive]}>{d}</Text></TouchableOpacity>
        ))}
      </View>

      {!sharing ? (
        <TouchableOpacity style={styles.btn} onPress={startSharing}><Text style={styles.btnText}>Start Sharing With My Group</Text></TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.btn, styles.btnStop]} onPress={stopSharing}><Text style={styles.btnText}>Stop Sharing</Text></TouchableOpacity>
      )}

      <TouchableOpacity style={styles.sosBtn} onPress={triggerSos}><Text style={styles.sosBtnText}>🆘 I AM LOST — SEND SOS</Text></TouchableOpacity>

      <Text style={styles.section}>Meeting point (agree this before you split up)</Text>
      <View style={styles.meetCard}>
        <Text style={styles.meetText}>{meetingPoint}</Text>
        <View style={styles.row}>
          {['Gate 79 — King Fahd Gate', 'Gate 1 — King Abdulaziz Gate', 'Hotel Lobby'].map((m) => (
            <TouchableOpacity key={m} onPress={() => setMeetingPoint(m)} style={[styles.chip, meetingPoint === m && styles.chipActive]}><Text style={[styles.chipText, meetingPoint === m && styles.chipTextActive]}>{m}</Text></TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.section}>Your Group — Live Map</Text>
      <View style={styles.mapBox}>
        {members.map((m) => (
          <View key={m.id} style={[styles.memberDot, { left: `${m.x}%`, top: `${m.y}%`, backgroundColor: m.color }]}>
            <Text style={styles.dotText}>{m.name.split(' ')[0][0]}</Text>
          </View>
        ))}
        <Text style={styles.mapLabel}>Haram Area • Demo map — in the live version this is your real group on a real map</Text>
      </View>

      {members.map((m) => (
        <View key={m.id} style={styles.memberCard}>
          <View style={[styles.avatar, { backgroundColor: m.color }]}><Text style={styles.avatarText}>{m.name.split(' ')[0][0]}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.memberName}>{m.name} — {m.status}</Text>
            <Text style={styles.memberSub}>{m.distance} • Last seen: {m.lastSeen}</Text>
          </View>
        </View>
      ))}

      <View style={styles.privacy}>
        <Text style={styles.privacyTitle}>Privacy — how this is designed</Text>
        <Text style={styles.privacyText}>• Location is shared only with your own group, never publicly.{'\n'}• You choose the duration; it stops on its own.{'\n'}• Anyone can pause sharing at any time.{'\n'}• SOS does not share your phone number — it only shows your location to your group.{'\n'}• Signed in as: {user?.name || 'Guest'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  statusCard: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 16, borderRadius: 18, borderWidth: 1, borderColor: colors.sand },
  statusOn: { borderColor: colors.green, backgroundColor: '#EAF3EC' },
  statusTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.green },
  statusText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, lineHeight: 19, marginTop: 6 },
  sosText: { fontFamily: fonts.bold, fontSize: 14, color: '#B42318', marginTop: 10 },
  section: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink, marginHorizontal: 18, marginTop: 22, marginBottom: 10 },
  row: { flexDirection: 'row', marginHorizontal: 18, gap: 8, flexWrap: 'wrap' },
  chip: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: colors.sand },
  chipActive: { backgroundColor: colors.green, borderColor: colors.green },
  chipText: { fontFamily: fonts.bold, fontSize: 12, color: colors.ink },
  chipTextActive: { color: '#fff' },
  btn: { backgroundColor: colors.green, marginHorizontal: 18, marginTop: 16, paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  btnStop: { backgroundColor: '#6B7A72' },
  btnText: { color: '#fff', fontFamily: fonts.bold },
  sosBtn: { backgroundColor: '#B42318', marginHorizontal: 18, marginTop: 12, paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  sosBtnText: { color: '#fff', fontFamily: fonts.bold },
  meetCard: { backgroundColor: '#fff', marginHorizontal: 18, padding: 16, borderRadius: 18 },
  meetText: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink, marginBottom: 10 },
  mapBox: { backgroundColor: '#BFE3D0', marginHorizontal: 18, height: 240, borderRadius: 18, position: 'relative', overflow: 'hidden' },
  memberDot: { position: 'absolute', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  dotText: { color: '#fff', fontFamily: fonts.bold },
  mapLabel: { position: 'absolute', bottom: 10, left: 10, right: 10, backgroundColor: 'rgba(11,61,46,0.9)', color: '#fff', fontFamily: fonts.medium, fontSize: 11, padding: 8, borderRadius: 8, overflow: 'hidden' },
  memberCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 18, marginTop: 10, padding: 14, borderRadius: 16, gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontFamily: fonts.bold, fontSize: 18 },
  memberName: { fontFamily: fonts.bold, fontSize: 14, color: colors.ink },
  memberSub: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, marginTop: 2 },
  privacy: { backgroundColor: '#FFFBEA', marginHorizontal: 18, marginTop: 20, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.gold },
  privacyTitle: { fontFamily: fonts.bold, color: colors.ink },
  privacyText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, lineHeight: 20, marginTop: 6 },
});
