import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import { CHECKLIST_GROUPS } from '../data';

export default function ChecklistScreen() {
  const [done, setDone] = useState({});
  const total = CHECKLIST_GROUPS.reduce((n, g) => n + g.items.length, 0);
  const doneCount = Object.values(done).filter(Boolean).length;
  const pct = Math.round((doneCount / total) * 100);

  const toggle = (key) => setDone((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Checklist</Text>
        <Text style={styles.sub}>{doneCount} / {total} complete • {pct}%</Text>
        <View style={styles.bar}><View style={[styles.barFill, { width: `${pct}%` }]} /></View>
      </View>

      {CHECKLIST_GROUPS.map((g) => (
        <View key={g.title}>
          <Text style={styles.groupTitle}>{g.title}</Text>
          {g.items.map((item) => {
            const key = `${g.title}:${item}`;
            const checked = !!done[key];
            return (
              <TouchableOpacity key={key} onPress={() => toggle(key)} style={styles.row}>
                <View style={[styles.box, checked && styles.boxChecked]}>
                  <Text style={styles.boxText}>{checked ? '✓' : ''}</Text>
                </View>
                <Text style={[styles.itemText, checked && styles.itemDone]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <View style={styles.noteCard}>
        <Text style={styles.noteText}>Tip: Even when the checklist is complete, re-check visa, hotel and flight confirmation before booking.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.medium, fontSize: 14, color: colors.green, marginTop: 6 },
  bar: { height: 10, backgroundColor: colors.sand, borderRadius: 5, marginTop: 12, overflow: 'hidden' },
  barFill: { height: 10, backgroundColor: colors.gold },
  groupTitle: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink, marginHorizontal: 18, marginTop: 24, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 18, marginBottom: 8, padding: 14, borderRadius: 14, gap: 12 },
  box: { width: 26, height: 26, borderRadius: 8, borderWidth: 2, borderColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  boxChecked: { backgroundColor: colors.green },
  boxText: { color: '#fff', fontFamily: fonts.bold },
  itemText: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.ink },
  itemDone: { textDecorationLine: 'line-through', color: colors.muted },
  noteCard: { backgroundColor: '#FFFBEA', marginHorizontal: 18, marginTop: 20, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.gold },
  noteText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, lineHeight: 20 },
});
