import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import { GUIDE_STEPS } from '../serviceData';

export default function GuideScreen() {
  const [done, setDone] = useState({});
  const [active, setActive] = useState(0);
  const totalChecks = GUIDE_STEPS.reduce((n, s) => n + s.checks.length, 0);
  const doneCount = Object.values(done).filter(Boolean).length;
  const pct = Math.round((doneCount / totalChecks) * 100);

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Guide — Umrah ke Doran</Text>
        <Text style={styles.sub}>Har step ko tick karein, aapki progress save hogi (is session me).</Text>
        <View style={styles.progress}>
          <Text style={styles.progressText}>{doneCount} / {totalChecks} • {pct}% mukammal</Text>
          <View style={styles.bar}><View style={[styles.barFill, { width: `${pct}%` }]} /></View>
        </View>
      </View>

      {GUIDE_STEPS.map((s, i) => (
        <View key={s.id} style={[styles.card, active === i && styles.cardActive]}>
          <TouchableOpacity onPress={() => setActive(i)}>
            <Text style={styles.stepTitle}>{s.title}</Text>
            <Text style={styles.stepLoc}>📍 {s.location}</Text>
            <Text style={styles.stepDetail}>{s.detail}</Text>
          </TouchableOpacity>
          {s.checks.map((c) => {
            const key = `${s.id}:${c}`;
            const checked = !!done[key];
            return (
              <TouchableOpacity key={key} onPress={() => setDone((p) => ({ ...p, [key]: !p[key] }))} style={styles.checkRow}>
                <View style={[styles.box, checked && styles.boxChecked]}><Text style={styles.boxText}>{checked ? '✓' : ''}</Text></View>
                <Text style={[styles.checkText, checked && styles.checkDone]}>{c}</Text>
              </TouchableOpacity>
            );
          })}
          {i < GUIDE_STEPS.length - 1 && (
            <TouchableOpacity onPress={() => setActive(i + 1)} style={styles.nextBtn}>
              <Text style={styles.nextText}>Agla Step →</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <View style={styles.emergency}>
        <Text style={styles.emTitle}>🆘 Zaroori Tips</Text>
        <Text style={styles.emText}>• Group se alag ho jayein to Haram ke fixed gate par milne ka waqt pehle tay karein.{'\n'}• Passport, hotel card aur phone charge hamesha saath rakhein.{'\n'}• Bheed me bachon ka haath pakrein, stroller ka rasta pehle dekh lein.{'\n'}• Kisi bhi emergency me hotel guide ya group leader ko call karein.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 24, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  progress: { backgroundColor: '#fff', padding: 14, borderRadius: 14, marginTop: 14 },
  progressText: { fontFamily: fonts.bold, color: colors.green, fontSize: 14 },
  bar: { height: 10, backgroundColor: colors.sand, borderRadius: 5, marginTop: 10, overflow: 'hidden' },
  barFill: { height: 10, backgroundColor: colors.gold },
  card: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 16, borderRadius: 18, borderWidth: 1, borderColor: colors.sand },
  cardActive: { borderColor: colors.gold },
  stepTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.ink },
  stepLoc: { fontFamily: fonts.medium, fontSize: 13, color: colors.green, marginTop: 4 },
  stepDetail: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: 6 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  box: { width: 24, height: 24, borderRadius: 7, borderWidth: 2, borderColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  boxChecked: { backgroundColor: colors.green },
  boxText: { color: '#fff', fontFamily: fonts.bold, fontSize: 12 },
  checkText: { fontFamily: fonts.regular, fontSize: 14, color: colors.ink },
  checkDone: { textDecorationLine: 'line-through', color: colors.muted },
  nextBtn: { backgroundColor: colors.green, paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginTop: 14 },
  nextText: { color: '#fff', fontFamily: fonts.bold },
  emergency: { backgroundColor: colors.green, marginHorizontal: 18, marginTop: 20, padding: 18, borderRadius: 18 },
  emTitle: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 16 },
  emText: { color: '#fff', fontFamily: fonts.regular, fontSize: 13, lineHeight: 21, marginTop: 8 },
});
