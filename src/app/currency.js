import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../theme';

export default function CurrencyScreen() {
  const [amount, setAmount] = useState('1000');
  const [sarRate, setSarRate] = useState('75');
  const [usdRate, setUsdRate] = useState('280');
  const sar = Number(amount) || 0;
  const sarPkr = Number(sarRate) || 0;
  const usdPkr = Number(usdRate) || 0;
  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}><Text style={styles.title}>Currency Converter</Text><Text style={styles.sub}>Rates are estimates — check your bank / exchange rate before paying.</Text></View>
      <View style={styles.field}><Text style={styles.label}>Amount (SAR)</Text><TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} /></View>
      <View style={styles.field}><Text style={styles.label}>1 SAR = ? PKR</Text><TextInput style={styles.input} keyboardType="numeric" value={sarRate} onChangeText={setSarRate} /></View>
      <View style={styles.field}><Text style={styles.label}>1 USD = ? PKR</Text><TextInput style={styles.input} keyboardType="numeric" value={usdRate} onChangeText={setUsdRate} /></View>
      <View style={styles.result}><Text style={styles.resultText}>{sar} SAR = PKR {(sar * sarPkr).toLocaleString()}</Text><Text style={styles.resultText}>{sar} SAR = USD {(sar / 3.75).toFixed(2)} (1 USD = 3.75 SAR)</Text><Text style={styles.resultText}>PKR {(sar * sarPkr).toLocaleString()} = USD {((sar * sarPkr) / usdPkr).toFixed(2)}</Text></View>
      <View style={styles.note}><Text style={styles.noteText}>Tip: Keep small SAR notes for taxis, food and Zamzam. Card payment is common in hotels and malls.</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  field: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 14, borderRadius: 16 },
  label: { fontFamily: fonts.bold, fontSize: 14, color: colors.ink },
  input: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink, borderWidth: 1, borderColor: colors.sand, borderRadius: 12, padding: 12, marginTop: 8 },
  result: { backgroundColor: colors.green, marginHorizontal: 18, marginTop: 16, padding: 18, borderRadius: 18 },
  resultText: { color: '#fff', fontFamily: fonts.bold, fontSize: 15, marginTop: 6 },
  note: { backgroundColor: '#FFFBEA', marginHorizontal: 18, marginTop: 16, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.gold },
  noteText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, lineHeight: 20 },
});
