import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';

const DHIKRS = [
  { name: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', meaning: 'Glory be to Allah' },
  { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', meaning: 'All praise is for Allah' },
  { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', meaning: 'Allah is the Greatest' },
  { name: 'La ilaha illallah', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', meaning: 'There is no god but Allah' },
];

export default function TasbihScreen() {
  const [dhikr, setDhikr] = useState(0);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [total, setTotal] = useState(0);
  const [sets, setSets] = useState(0);

  const tap = () => {
    const next = count + 1;
    setCount(next);
    setTotal(total + 1);
    if (next >= target) {
      setSets(sets + 1);
      setCount(0);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Digital Tasbih</Text>
      <View style={styles.row}>
        {DHIKRS.map((d, i) => (
          <TouchableOpacity key={d.name} onPress={() => { setDhikr(i); setCount(0); }} style={[styles.chip, dhikr === i && styles.chipActive]}>
            <Text style={[styles.chipText, dhikr === i && styles.chipTextActive]}>{d.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.arabic}>{DHIKRS[dhikr].arabic}</Text>
      <Text style={styles.meaning}>{DHIKRS[dhikr].meaning}</Text>
      <TouchableOpacity style={styles.counter} onPress={tap} activeOpacity={0.8}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.target}>of {target} • Tap to count</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        {[33, 99, 100].map((t) => (
          <TouchableOpacity key={t} onPress={() => { setTarget(t); setCount(0); }} style={[styles.chip, target === t && styles.chipActive]}>
            <Text style={[styles.chipText, target === t && styles.chipTextActive]}>Target {t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.stats}>Total: {total} • Completed sets: {sets}</Text>
      <TouchableOpacity style={styles.reset} onPress={() => { setCount(0); setTotal(0); setSets(0); }}><Text style={styles.resetText}>Reset All</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream, padding: 20, alignItems: 'center' },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 16 },
  chip: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: colors.sand },
  chipActive: { backgroundColor: colors.green, borderColor: colors.green },
  chipText: { fontFamily: fonts.bold, fontSize: 12, color: colors.ink },
  chipTextActive: { color: '#fff' },
  arabic: { fontSize: 30, marginTop: 24, color: colors.ink },
  meaning: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 8 },
  counter: { width: 210, height: 210, borderRadius: 105, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  count: { color: '#fff', fontFamily: fonts.bold, fontSize: 56 },
  target: { color: '#D9EDE2', fontFamily: fonts.medium, fontSize: 13, marginTop: 4 },
  stats: { fontFamily: fonts.bold, fontSize: 14, color: colors.ink, marginTop: 20 },
  reset: { marginTop: 14, padding: 10 },
  resetText: { fontFamily: fonts.bold, color: colors.green },
});
