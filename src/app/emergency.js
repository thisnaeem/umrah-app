import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';

const CONTACTS = [
  { name: 'Saudi Unified Emergency', number: '911', detail: 'Police, ambulance and fire — one number in Saudi Arabia.' },
  { name: 'Ambulance (Red Crescent)', number: '997', detail: 'Medical emergency.' },
  { name: 'Police', number: '999', detail: 'Police emergency.' },
  { name: 'Hajj & Umrah Helpline', number: '800 123 2222', detail: 'General Umrah help and guidance.' },
  { name: 'Haram Lost & Found', number: '—', detail: 'Go to the Lost & Found office inside Masjid al-Haram, or ask Haram security staff.' },
];

export default function EmergencyScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}><Text style={styles.title}>Emergency & Help</Text><Text style={styles.sub}>Save these before you travel. If someone is lost, open Live Location and use SOS there.</Text></View>
      {CONTACTS.map((c) => (
        <View key={c.name} style={styles.card}>
          <Text style={styles.name}>{c.name}</Text>
          <Text style={styles.detail}>{c.detail}</Text>
          {c.number !== '—' && (
            <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(`tel:${c.number.replace(/ /g, '')}`)}>
              <Text style={styles.btnText}>Call {c.number}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <View style={styles.tips}><Text style={styles.tipsTitle}>If you get lost</Text><Text style={styles.tipsText}>1. Stay where you are and stay calm.{'\n'}2. Open Live Location — your group can see you.{'\n'}3. Press SOS in Live Location.{'\n'}4. Go to the agreed meeting gate if you can walk safely.{'\n'}5. Show your hotel card to staff and ask for help.</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  card: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 16, borderRadius: 18 },
  name: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink },
  detail: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: 4 },
  btn: { backgroundColor: colors.green, paddingVertical: 11, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontFamily: fonts.bold },
  tips: { backgroundColor: colors.green, marginHorizontal: 18, marginTop: 20, padding: 18, borderRadius: 18 },
  tipsTitle: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 16 },
  tipsText: { color: '#fff', fontFamily: fonts.regular, fontSize: 14, lineHeight: 22, marginTop: 8 },
});
