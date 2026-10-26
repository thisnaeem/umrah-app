import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import { DUAS } from '../serviceData';

export default function DuasScreen() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [fav, setFav] = useState({});
  const cats = ['All', ...new Set(DUAS.map((d) => d.cat))];
  const shown = DUAS.filter((d) => (cat === 'All' || d.cat === cat) && (d.title.toLowerCase().includes(query.toLowerCase()) || d.translit.toLowerCase().includes(query.toLowerCase())));

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Duas</Text>
        <Text style={styles.sub}>Arabic, Roman Urdu transliteration aur meaning — Umrah ke har step ke liye.</Text>
      </View>
      <TextInput style={styles.search} placeholder="Dua dhoondhein..." placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} />
      <View style={styles.filterRow}>
        {cats.map((c) => (
          <TouchableOpacity key={c} onPress={() => setCat(c)} style={[styles.filter, cat === c && styles.filterActive]}>
            <Text style={[styles.filterText, cat === c && styles.filterTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {shown.map((d) => (
        <View key={d.id} style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.cat}>{d.cat}</Text>
            <TouchableOpacity onPress={() => setFav((p) => ({ ...p, [d.id]: !p[d.id] }))}>
              <Text style={styles.fav}>{fav[d.id] ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title2}>{d.title}</Text>
          <Text style={styles.arabic}>{d.arabic}</Text>
          <Text style={styles.trans}>{d.translit}</Text>
          <Text style={styles.meaning}>{d.meaning}</Text>
        </View>
      ))}
      {shown.length === 0 && <Text style={styles.empty}>Koi dua nahi mili. Search badlein.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  search: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 14, borderRadius: 14, fontFamily: fonts.regular, borderWidth: 1, borderColor: colors.sand },
  filterRow: { flexDirection: 'row', marginHorizontal: 18, marginTop: 12, gap: 8, flexWrap: 'wrap' },
  filter: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.sand },
  filterActive: { backgroundColor: colors.green, borderColor: colors.green },
  filterText: { fontFamily: fonts.bold, fontSize: 12, color: colors.ink },
  filterTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 18, borderRadius: 18 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cat: { backgroundColor: '#EAF3EC', color: colors.green, fontFamily: fonts.bold, fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  fav: { fontSize: 20 },
  title2: { fontFamily: fonts.bold, fontSize: 17, color: colors.ink, marginTop: 12 },
  arabic: { fontSize: 21, lineHeight: 34, marginTop: 10, textAlign: 'right', color: colors.ink },
  trans: { fontFamily: fonts.regular, fontSize: 14, color: colors.ink, lineHeight: 21, marginTop: 10 },
  meaning: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: 8 },
  empty: { fontFamily: fonts.regular, color: colors.muted, textAlign: 'center', marginTop: 24 },
});
