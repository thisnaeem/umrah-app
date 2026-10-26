import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../theme';

function Field({ label, value, onChange, suffix }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(value)}
          onChangeText={(t) => onChange(Number(t.replace(/[^0-9]/g, '')) || 0)}
        />
        <Text style={styles.suffix}>{suffix}</Text>
      </View>
    </View>
  );
}

export default function BudgetScreen() {
  const [flightUsd, setFlightUsd] = useState(1897);
  const [visaPer, setVisaPer] = useState(55000);
  const [makkahNight, setMakkahNight] = useState(100);
  const [madinahNight, setMadinahNight] = useState(150);
  const [transportSar, setTransportSar] = useState(1600);
  const [foodPkr, setFoodPkr] = useState(70000);

  const USD_TO_PKR = 280;
  const SAR_TO_PKR = 75;
  const flightPkr = flightUsd * USD_TO_PKR;
  const visaTotal = visaPer * 4;
  const hotelPkr = (makkahNight * 4 + madinahNight * 3) * SAR_TO_PKR;
  const transportPkr = transportSar * SAR_TO_PKR;
  const total = flightPkr + visaTotal + hotelPkr + transportPkr + foodPkr;

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Budget Calculator</Text>
        <Text style={styles.sub}>Change your numbers — the total updates automatically</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>ESTIMATED TOTAL — FAMILY OF 4</Text>
        <Text style={styles.totalValue}>PKR {total.toLocaleString('en-PK')}</Text>
        <Text style={styles.totalSub}>≈ ${(total / USD_TO_PKR).toLocaleString('en-US')} • Estimated rates: 1 USD = 280 PKR, 1 SAR = 75 PKR</Text>
      </View>

      <Field label="Flights — total family (USD)" value={flightUsd} onChange={setFlightUsd} suffix="USD" />
      <Field label="Visa — per person (PKR)" value={visaPer} onChange={setVisaPer} suffix="PKR × 4" />
      <Field label="Makkah hotel — per night (SAR, 4 nights)" value={makkahNight} onChange={setMakkahNight} suffix="SAR" />
      <Field label="Madinah hotel — per night (SAR, 3 nights)" value={madinahNight} onChange={setMadinahNight} suffix="SAR" />
      <Field label="Transport — total (SAR)" value={transportSar} onChange={setTransportSar} suffix="SAR" />
      <Field label="Food — total 7 days (PKR)" value={foodPkr} onChange={setFoodPkr} suffix="PKR" />

      <View style={styles.breakCard}>
        <Text style={styles.breakTitle}>Breakdown</Text>
        <Text style={styles.breakLine}>✈️ Flights: PKR {flightPkr.toLocaleString('en-PK')}</Text>
        <Text style={styles.breakLine}>🛂 Visa (4): PKR {visaTotal.toLocaleString('en-PK')}</Text>
        <Text style={styles.breakLine}>🏨 Hotels (7 nights): PKR {hotelPkr.toLocaleString('en-PK')}</Text>
        <Text style={styles.breakLine}>🚗 Transport: PKR {transportPkr.toLocaleString('en-PK')}</Text>
        <Text style={styles.breakLine}>🍽️ Food: PKR {foodPkr.toLocaleString('en-PK')}</Text>
        <Text style={styles.note}>This is an estimate. Confirm the final price at booking. Ask your agent/hotel about visa/hotel charges for children.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6 },
  totalCard: { backgroundColor: colors.green, marginHorizontal: 18, marginTop: 16, padding: 20, borderRadius: 20 },
  totalLabel: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 12, letterSpacing: 1 },
  totalValue: { color: '#fff', fontFamily: fonts.bold, fontSize: 30, marginTop: 8 },
  totalSub: { color: '#D9EDE2', fontFamily: fonts.regular, fontSize: 12, marginTop: 6 },
  field: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 14, borderRadius: 16 },
  fieldLabel: { fontFamily: fonts.bold, fontSize: 14, color: colors.ink },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: colors.sand, borderRadius: 12, paddingHorizontal: 12 },
  input: { flex: 1, fontFamily: fonts.bold, fontSize: 16, color: colors.ink, paddingVertical: 10 },
  suffix: { fontFamily: fonts.medium, color: colors.muted, fontSize: 13 },
  breakCard: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 16, padding: 18, borderRadius: 18 },
  breakTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.ink, marginBottom: 10 },
  breakLine: { fontFamily: fonts.regular, fontSize: 14, color: colors.ink, marginTop: 6 },
  note: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: 12 },
});
