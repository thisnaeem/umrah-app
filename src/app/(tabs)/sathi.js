import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../theme';
import { SATHI_GROUPS } from '../../serviceData';

export default function SathiScreen() {
  const [city, setCity] = useState('All');
  const [joined, setJoined] = useState({});
  const [name, setName] = useState('');
  const [myCity, setMyCity] = useState('');
  const [created, setCreated] = useState(false);
  const cities = ['All', 'Lahore', 'Karachi', 'Islamabad'];
  const shown = city === 'All' ? SATHI_GROUPS : SATHI_GROUPS.filter((g) => g.from === city);

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Companions</Text>
        <Text style={styles.sub}>Find fellow traveller groups for Umrah — by city, date and language. Groups are demo data; live matching needs a backend.</Text>
      </View>

      <View style={styles.filterRow}>
        {cities.map((c) => (
          <TouchableOpacity key={c} onPress={() => setCity(c)} style={[styles.filter, city === c && styles.filterActive]}>
            <Text style={[styles.filterText, city === c && styles.filterTextActive]}>{c === 'All' ? 'All Sheher' : c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {shown.map((g) => (
        <View key={g.id} style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.type}>{g.type}</Text>
            <Text style={styles.size}>{g.size}</Text>
          </View>
          <Text style={styles.from}>📍 {g.from} • 📅 {g.date} • 🗣️ {g.lang}</Text>
          <Text style={styles.organizer}>Group leader: {g.organizer}</Text>
          <Text style={styles.note}>{g.note}</Text>
          <TouchableOpacity onPress={() => setJoined((p) => ({ ...p, [g.id]: !p[g.id] }))} style={[styles.joinBtn, joined[g.id] && styles.joinBtnDone]}>
            <Text style={styles.joinText}>{joined[g.id] ? '✓ Join Request Sent' : 'Send Join Request'}</Text>
          </TouchableOpacity>
          <Text style={styles.privacy}>Note: Phone numbers and private contacts are not shared here — only an in-app request is sent.</Text>
        </View>
      ))}

      <View style={styles.createCard}>
        <Text style={styles.createTitle}>Create Your Group</Text>
        <TextInput style={styles.input} placeholder="Your name (first name is enough)" placeholderTextColor={colors.muted} value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="City — e.g. Lahore" placeholderTextColor={colors.muted} value={myCity} onChangeText={setMyCity} />
        <TouchableOpacity onPress={() => setCreated(true)} style={styles.createBtn}>
          <Text style={styles.createBtnText}>Create Group</Text>
        </TouchableOpacity>
        {created && <Text style={styles.created}>✓ Your group draft is created (local demo). In the live app it will be saved to the backend and visible to other users.</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, marginTop: 6, lineHeight: 19 },
  filterRow: { flexDirection: 'row', marginHorizontal: 18, marginTop: 12, gap: 8, flexWrap: 'wrap' },
  filter: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.sand },
  filterActive: { backgroundColor: colors.green, borderColor: colors.green },
  filterText: { fontFamily: fonts.bold, fontSize: 12, color: colors.ink },
  filterTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 16, borderRadius: 18 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  type: { backgroundColor: colors.green, color: '#fff', fontFamily: fonts.bold, fontSize: 11, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  size: { fontFamily: fonts.bold, fontSize: 12, color: colors.green },
  from: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink, marginTop: 10 },
  organizer: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, marginTop: 4 },
  note: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, lineHeight: 19, marginTop: 8 },
  joinBtn: { backgroundColor: colors.gold, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  joinBtnDone: { backgroundColor: colors.green },
  joinText: { fontFamily: fonts.bold, color: '#fff', fontSize: 13 },
  privacy: { fontFamily: fonts.regular, fontSize: 11, color: colors.muted, marginTop: 8, lineHeight: 16 },
  createCard: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 20, padding: 18, borderRadius: 18, borderWidth: 1, borderColor: colors.gold },
  createTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.ink },
  input: { backgroundColor: colors.cream, padding: 12, borderRadius: 12, marginTop: 10, fontFamily: fonts.regular },
  createBtn: { backgroundColor: colors.green, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  createBtnText: { fontFamily: fonts.bold, color: '#fff' },
  created: { fontFamily: fonts.regular, fontSize: 13, color: colors.green, lineHeight: 19, marginTop: 10 },
});
