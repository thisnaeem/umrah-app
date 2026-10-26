import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../theme';
import { MAKKAH_PLACES, MADINAH_PLACES, AIRPORT_INFO } from '../data';

const BUILDINGS = [
  { left: '12%', top: '52%', h: 52, w: 42 },
  { left: '30%', top: '22%', h: 38, w: 36 },
  { left: '62%', top: '18%', h: 62, w: 44 },
  { left: '78%', top: '48%', h: 44, w: 38 },
  { left: '36%', top: '62%', h: 36, w: 40 },
];

export default function MapScreen() {
  const [city, setCity] = useState('Makkah');
  const places = city === 'Makkah' ? MAKKAH_PLACES : MADINAH_PLACES;
  const [selected, setSelected] = useState(places[0]);

  const onCity = (c) => {
    setCity(c);
    setSelected(c === 'Makkah' ? MAKKAH_PLACES[0] : MADINAH_PLACES[0]);
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>3D-Style Map</Text>
        <Text style={styles.headerSub}>Hotel par tap karein — details, price aur distance dekhein</Text>
      </View>

      <View style={styles.toggleRow}>
        {['Makkah', 'Madinah'].map((c) => (
          <TouchableOpacity key={c} onPress={() => onCity(c)} style={[styles.toggle, city === c && styles.toggleActive]}>
            <Text style={[styles.toggleText, city === c && styles.toggleTextActive]}>{c === 'Makkah' ? '🕋 Makkah' : '🕌 Madinah'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.mapBoard}>
        <LinearGradient colors={['#BFE3D0', '#E8F3E8']} style={StyleSheet.absoluteFill} />
        <View style={styles.roadH} />
        <View style={styles.roadV} />
        {BUILDINGS.map((b, i) => (
          <View key={i} style={[styles.building, { left: b.left, top: b.top, width: b.w, height: b.h }]}>
            <View style={styles.buildingTop} />
          </View>
        ))}
        {places.map((p) => (
          <TouchableOpacity
            key={p.id}
            onPress={() => setSelected(p)}
            style={[styles.pin, { left: `${p.x}%`, top: `${p.y}%` }, selected.id === p.id && styles.pinActive]}
          >
            <Text style={styles.pinText}>{p.type.includes('Airport') ? '✈️' : p.type.includes('Hotel') ? '🏨' : '🕋'}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.mapLabel}><Text style={styles.mapLabelText}>{city} • 3D Buildings View</Text></View>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.detailType}>{selected.type}</Text>
        <Text style={styles.detailName}>{selected.name}</Text>
        <Text style={styles.detailLine}>💰 {selected.price}   •   📍 {selected.distance}</Text>
        <Text style={styles.detailText}>{selected.detail}</Text>
      </View>

      <Text style={styles.sectionTitle}>{city} me Select Karein</Text>
      {places.map((p) => (
        <TouchableOpacity key={p.id} onPress={() => setSelected(p)} style={[styles.listCard, selected.id === p.id && styles.listActive]}>
          <Text style={styles.listName}>{p.name}</Text>
          <Text style={styles.listSub}>{p.type} • {p.price}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Airport se Sari Info</Text>
      {AIRPORT_INFO.map((a) => (
        <View key={a.title} style={styles.infoCard}>
          <Text style={styles.infoTitle}>{a.title}</Text>
          <Text style={styles.infoText}>{a.detail}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  headerTitle: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  headerSub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  toggleRow: { flexDirection: 'row', marginHorizontal: 18, marginTop: 12, gap: 10 },
  toggle: { flex: 1, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 12, alignItems: 'center', borderWidth: 1.5, borderColor: colors.sand },
  toggleActive: { backgroundColor: colors.green, borderColor: colors.green },
  toggleText: { fontFamily: fonts.bold, color: colors.ink },
  toggleTextActive: { color: '#fff' },
  mapBoard: { height: 320, marginHorizontal: 18, marginTop: 16, borderRadius: 24, overflow: 'hidden', borderWidth: 1.5, borderColor: colors.sand },
  roadH: { position: 'absolute', left: 0, right: 0, top: '46%', height: 18, backgroundColor: '#D9CFAF' },
  roadV: { position: 'absolute', top: 0, bottom: 0, left: '48%', width: 18, backgroundColor: '#D9CFAF' },
  building: { position: 'absolute', backgroundColor: '#8FB8A3', borderRadius: 6, shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 4, height: 6 } },
  buildingTop: { height: 10, backgroundColor: '#C9E2D2', borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  pin: { position: 'absolute', width: 38, height: 38, marginLeft: -19, marginTop: -19, backgroundColor: '#fff', borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.green, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 3 } },
  pinActive: { backgroundColor: colors.gold, borderColor: '#fff', width: 46, height: 46, marginLeft: -23, marginTop: -23, borderRadius: 23 },
  pinText: { fontSize: 18 },
  mapLabel: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(11,61,46,0.9)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  mapLabelText: { color: '#fff', fontFamily: fonts.medium, fontSize: 12 },
  detailCard: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 16, padding: 18, borderRadius: 18, borderWidth: 1.5, borderColor: colors.gold },
  detailType: { fontFamily: fonts.bold, fontSize: 12, color: colors.green, letterSpacing: 1 },
  detailName: { fontFamily: fonts.bold, fontSize: 20, color: colors.ink, marginTop: 6 },
  detailLine: { fontFamily: fonts.medium, fontSize: 14, color: colors.muted, marginTop: 6 },
  detailText: { fontFamily: fonts.regular, fontSize: 14, color: colors.ink, lineHeight: 21, marginTop: 8 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink, marginHorizontal: 18, marginTop: 24, marginBottom: 10 },
  listCard: { backgroundColor: '#fff', marginHorizontal: 18, marginBottom: 8, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.sand },
  listActive: { borderColor: colors.gold, backgroundColor: '#FFFBEA' },
  listName: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink },
  listSub: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, marginTop: 2 },
  infoCard: { backgroundColor: '#fff', marginHorizontal: 18, marginBottom: 10, padding: 16, borderRadius: 16 },
  infoTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink },
  infoText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 20, marginTop: 4 },
});
