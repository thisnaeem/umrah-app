import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import { PRAYER_TIMES } from '../serviceData';

export default function PrayerScreen() {
  const [city, setCity] = useState('Makkah');
  const times = PRAYER_TIMES[city];
  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}><Text style={styles.title}>Prayer Times</Text><Text style={styles.sub}>Approximate times for the Holy Cities. Always confirm with your local mosque / hotel.</Text></View>
      <View style={styles.row}>
        {Object.keys(PRAYER_TIMES).map((c) => (
          <TouchableOpacity key={c} onPress={() => setCity(c)} style={[styles.chip, city === c && styles.chipActive]}><Text style={[styles.chipText, city === c && styles.chipTextActive]}>{c}</Text></TouchableOpacity>
        ))}
      </View>
      {Object.entries(times).map(([name, time]) => (
        <View key={name} style={styles.card}><Text style={styles.name}>{name}</Text><Text style={styles.time}>{time}</Text></View>
      ))}
      <View style={styles.note}><Text style={styles.noteText}>Next prayer in Makkah: Asr at 15:38. Prayer times change by date — in the full version these will be fetched live by GPS location.</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  row: { flexDirection: 'row', marginHorizontal: 18, marginTop: 12, gap: 8 },
  chip: { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: colors.sand },
  chipActive: { backgroundColor: colors.green, borderColor: colors.green },
  chipText: { fontFamily: fonts.bold, color: colors.ink },
  chipTextActive: { color: '#fff' },
  card: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', marginHorizontal: 18, marginTop: 10, padding: 16, borderRadius: 16 },
  name: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink },
  time: { fontFamily: fonts.bold, fontSize: 16, color: colors.green },
  note: { backgroundColor: '#FFFBEA', marginHorizontal: 18, marginTop: 20, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.gold },
  noteText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, lineHeight: 20 },
});
