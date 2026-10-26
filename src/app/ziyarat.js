import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import { ZIYARAT } from '../serviceData';

export default function ZiyaratScreen() {
  const [city, setCity] = useState('All');
  const shown = city === 'All' ? ZIYARAT : ZIYARAT.filter((z) => z.city === city);
  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}><Text style={styles.title}>Ziyarat Places</Text><Text style={styles.sub}>Sacred places in Makkah and Madinah, with the best time to visit.</Text></View>
      <View style={styles.row}>
        {['All', 'Makkah', 'Madinah'].map((c) => (
          <TouchableOpacity key={c} onPress={() => setCity(c)} style={[styles.chip, city === c && styles.chipActive]}><Text style={[styles.chipText, city === c && styles.chipTextActive]}>{c}</Text></TouchableOpacity>
        ))}
      </View>
      {shown.map((z) => (
        <View key={z.name} style={styles.card}>
          <Text style={styles.city}>{z.city} • Best: {z.best}</Text>
          <Text style={styles.name}>{z.name}</Text>
          <Text style={styles.detail}>{z.detail}</Text>
        </View>
      ))}
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
  card: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 16, borderRadius: 18 },
  city: { fontFamily: fonts.bold, fontSize: 12, color: colors.green, letterSpacing: 0.5 },
  name: { fontFamily: fonts.bold, fontSize: 17, color: colors.ink, marginTop: 6 },
  detail: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, lineHeight: 20, marginTop: 6 },
});
