import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../theme';
import { TRIP, FLIGHT_OPTIONS, ITINERARY } from '../data';

export default function PlanScreen() {
  const [selectedFlight, setSelectedFlight] = useState(FLIGHT_OPTIONS[0]);

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <LinearGradient colors={[colors.green, colors.greenLight, '#1E7A55']} style={styles.hero}>
        <Text style={styles.heroSmall}>UMRAH TRIP PLANNER</Text>
        <Text style={styles.heroTitle}>Lahore se Makkah{'\n'}aur Madinah</Text>
        <Text style={styles.heroSub}>{TRIP.nights} nights • Makkah {TRIP.makkahNights} + Madinah {TRIP.madinahNights} • Family of 4</Text>
        <View style={styles.heroRow}>
          <View style={styles.heroChip}><Text style={styles.heroChipText}>✈️ {TRIP.from}</Text></View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.heroChip}><Text style={styles.heroChipText}>🕋 {TRIP.to}</Text></View>
        </View>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Flight Chunein — Sab Se Sasta</Text>
      {FLIGHT_OPTIONS.map((f) => {
        const active = selectedFlight.id === f.id;
        return (
          <TouchableOpacity key={f.id} onPress={() => setSelectedFlight(f)} style={[styles.card, active && styles.cardActive]}>
            <View style={styles.cardTop}>
              <Text style={styles.cardTag}>{f.tag}</Text>
              <Text style={styles.price}>${f.priceUsd} total</Text>
            </View>
            <Text style={styles.cardTitle}>{f.title}</Text>
            <Text style={styles.cardText}>{f.route}</Text>
            <Text style={styles.cardText}>{f.duration}</Text>
            <Text style={styles.cardNote}>{f.note}</Text>
          </TouchableOpacity>
        );
      })}

      <Text style={styles.sectionTitle}>7 Nights ka Itinerary</Text>
      {ITINERARY.map((d) => (
        <View key={d.day} style={styles.dayCard}>
          <View style={styles.dayBadge}><Text style={styles.dayBadgeText}>{d.day}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dayCity}>{d.city} • {d.title}</Text>
            <Text style={styles.dayDetail}>{d.detail}</Text>
          </View>
        </View>
      ))}

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>👶 Bachon ke saath tip</Text>
        <Text style={styles.tipText}>Nonstop flight lo, train se Madinah jao, aur hotel me family room lo. 1 saal ke bache ko lap par rakhein, 3 saal ke bache ki apni seat hogi.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  content: { paddingBottom: 32 },
  hero: { padding: 22, paddingTop: 28, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroSmall: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 12, letterSpacing: 1.5 },
  heroTitle: { color: '#fff', fontFamily: fonts.bold, fontSize: 30, lineHeight: 36, marginTop: 8 },
  heroSub: { color: '#D9EDE2', fontFamily: fonts.regular, fontSize: 14, marginTop: 10 },
  heroRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 8 },
  heroChip: { backgroundColor: 'rgba(255,255,255,0.18)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  heroChipText: { color: '#fff', fontFamily: fonts.medium, fontSize: 13 },
  arrow: { color: colors.goldLight, fontSize: 18, fontFamily: fonts.bold },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 19, color: colors.ink, marginHorizontal: 18, marginTop: 24, marginBottom: 12 },
  card: { backgroundColor: colors.card, marginHorizontal: 18, marginBottom: 12, padding: 16, borderRadius: 18, borderWidth: 1.5, borderColor: colors.sand },
  cardActive: { borderColor: colors.gold, backgroundColor: '#FFFBEA' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTag: { backgroundColor: colors.green, color: '#fff', fontFamily: fonts.bold, fontSize: 11, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  price: { fontFamily: fonts.bold, color: colors.green, fontSize: 15 },
  cardTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink, marginTop: 10 },
  cardText: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 3 },
  cardNote: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, marginTop: 8 },
  dayCard: { flexDirection: 'row', backgroundColor: colors.card, marginHorizontal: 18, marginBottom: 10, padding: 14, borderRadius: 16, gap: 12 },
  dayBadge: { backgroundColor: colors.gold, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8, height: 36, justifyContent: 'center' },
  dayBadgeText: { fontFamily: fonts.bold, fontSize: 12, color: '#fff' },
  dayCity: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink },
  dayDetail: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, marginTop: 4, lineHeight: 19 },
  tipCard: { backgroundColor: colors.green, marginHorizontal: 18, marginTop: 16, padding: 18, borderRadius: 18 },
  tipTitle: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 16 },
  tipText: { color: '#fff', fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, marginTop: 8 },
});
