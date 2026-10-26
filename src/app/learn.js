import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import { LEARNING_STEPS, AIRPORT_INFO } from '../data';

export default function LearnScreen() {
  const [open, setOpen] = useState(0);

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Seekhein — Umrah Guide</Text>
        <Text style={styles.sub}>Pehli dafa ja rahe hain? Har step aasan lafzon me.</Text>
      </View>

      {LEARNING_STEPS.map((s, i) => {
        const isOpen = open === i;
        return (
          <TouchableOpacity key={s.title} onPress={() => setOpen(isOpen ? -1 : i)} style={styles.card}>
            <Text style={styles.cardTitle}>{s.title}</Text>
            {isOpen && <Text style={styles.cardText}>{s.detail}</Text>}
            <Text style={styles.more}>{isOpen ? '▲ Band karein' : '▼ Kholein'}</Text>
          </TouchableOpacity>
        );
      })}

      <Text style={styles.sectionTitle}>Airport aur Safar Guide</Text>
      {AIRPORT_INFO.map((a) => (
        <View key={a.title} style={styles.infoCard}>
          <Text style={styles.infoTitle}>{a.title}</Text>
          <Text style={styles.infoText}>{a.detail}</Text>
        </View>
      ))}

      <View style={styles.kidsCard}>
        <Text style={styles.kidsTitle}>👶 Bachon ke saath Seekhna</Text>
        <Text style={styles.kidsText}>• Stroller Haram me le ja sakte hain, lekin rush me ahtiyat karein.{'\n'}• Bachon ko paani, snacks aur extra kapre saath rakhein.{'\n'}• Tawaf/Sai me breaks lein — jaldi karne ki zaroorat nahi.{'\n'}• Madinah me Rawdah ke liye bachon ka bhi khayal rakhein, slot pehle book karein.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  card: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.sand },
  cardTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink },
  cardText: { fontFamily: fonts.regular, fontSize: 14, color: colors.ink, lineHeight: 21, marginTop: 8 },
  more: { fontFamily: fonts.medium, fontSize: 12, color: colors.green, marginTop: 8 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink, marginHorizontal: 18, marginTop: 24, marginBottom: 10 },
  infoCard: { backgroundColor: '#fff', marginHorizontal: 18, marginBottom: 10, padding: 16, borderRadius: 16 },
  infoTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink },
  infoText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 20, marginTop: 4 },
  kidsCard: { backgroundColor: colors.green, marginHorizontal: 18, marginTop: 16, padding: 18, borderRadius: 18 },
  kidsTitle: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 16 },
  kidsText: { color: '#fff', fontFamily: fonts.regular, fontSize: 14, lineHeight: 22, marginTop: 8 },
});
