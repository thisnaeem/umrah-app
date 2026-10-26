// LEGACY SHIM — 2026-10-26
// This file exists only because older folders / GitHub clones still have src/app/map.js
// alongside src/app/(tabs)/map.js, and Expo Router was rendering THIS file (not the tab one).
// It is the same fixed MapScreen, with imports adjusted for this location.
// Clean folders should delete this file and use only src/app/(tabs)/map.js.
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import { PLACES_V2 } from '../serviceData';
import { AIRPORT_INFO } from '../data';

function Cube({ x, y, w, h, color, topColor }) {
  return (
    <View style={[styles.cube, { left: `${x}%`, top: `${y}%`, width: w, height: h }]}>
      <View style={[styles.cubeTop, { backgroundColor: topColor }]} />
      <View style={[styles.cubeFace, { backgroundColor: color }]} />
      <View style={[styles.cubeSide, { backgroundColor: '#00000022' }]} />
    </View>
  );
}

export default function MapScreen() {
  const [city, setCity] = useState('Makkah');
  const [filter, setFilter] = useState('All');
  const [zoom, setZoom] = useState(1);
  const [night, setNight] = useState(false);
  const allPlaces = PLACES_V2 || [];
  const places = allPlaces.filter((p) => p.city === city && (filter === 'All' || p.type === filter));
  const allCity = allPlaces.filter((p) => p.city === city);
  const [selected, setSelected] = useState(allCity[0]);

  const onCity = (c) => {
    setCity(c);
    const first = allPlaces.find((p) => p.city === c);
    setSelected(first);
    setFilter('All');
  };

  const boardBg = night ? '#1E2E2A' : '#BFE3D0';
  const roadBg = night ? '#3A4A44' : '#D9CFAF';

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>3D Map — {city}</Text>
        <Text style={styles.headerSub}>Isometric 3D view • Zoom, tap a pin, see the route</Text>
      </View>

      <View style={styles.toggleRow}>
        {['Makkah', 'Madinah'].map((c) => (
          <TouchableOpacity key={c} onPress={() => onCity(c)} style={[styles.toggle, city === c && styles.toggleActive]}>
            <Text style={[styles.toggleText, city === c && styles.toggleTextActive]}>{c === 'Makkah' ? '🕋 Makkah' : '🕌 Madinah'}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setNight(!night)} style={styles.toggle}>
          <Text style={styles.toggleText}>{night ? '☀️ Day' : '🌙 Night'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {['All', 'Hotel', 'Masjid', 'Airport', 'Ziyarat'].map((f) => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filter, filter === f && styles.filterActive]}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f === 'All' ? 'All' : f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.mapWrap}>
        <ScrollView horizontal contentContainerStyle={{ width: 900 * zoom, height: 560 * zoom }}>
          <View style={[styles.board, { backgroundColor: boardBg, width: 900 * zoom, height: 560 * zoom }]}>
            <View style={[styles.roadH, { backgroundColor: roadBg }]} />
            <View style={[styles.roadV, { backgroundColor: roadBg }]} />
            <View style={[styles.roadD, { backgroundColor: roadBg }]} />
            {allCity.map((p) => (
              <Cube key={p.id} x={p.x - 4} y={p.y - 6} w={70} h={p.h} color={p.type === 'Masjid' ? '#0B3D2E' : '#8FB8A3'} topColor={p.type === 'Masjid' ? colors.gold : '#C9E2D2'} />
            ))}
            {places.map((p) => (
              <TouchableOpacity
                key={p.id}
                onPress={() => setSelected(p)}
                style={[styles.pin, { left: `${p.x}%`, top: `${p.y}%` }, selected.id === p.id && styles.pinActive]}
              >
                <Text style={styles.pinText}>{p.type === 'Airport' ? '✈️' : p.type === 'Hotel' ? '🏨' : p.type === 'Masjid' ? '🕋' : '📍'}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.mapLabel}><Text style={styles.mapLabelText}>{city} • Isometric 3D • Zoom {zoom.toFixed(1)}x</Text></View>
          </View>
        </ScrollView>
        <View style={styles.zoomRow}>
          <TouchableOpacity onPress={() => setZoom(Math.max(1, zoom - 0.5))} style={styles.zoomBtn}><Text style={styles.zoomText}>−</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setZoom(1)} style={styles.zoomBtn}><Text style={styles.zoomText}>Reset</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setZoom(Math.min(2.5, zoom + 0.5))} style={styles.zoomBtn}><Text style={styles.zoomText}>+</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.detailType}>{selected.type} • {selected.city}</Text>
        <Text style={styles.detailName}>{selected.name}</Text>
        <Text style={styles.detailLine}>💰 {selected.price}   •   📍 {selected.distance}</Text>
        <Text style={styles.detailText}>{selected.detail}</Text>
      </View>

      <Text style={styles.sectionTitle}>{city}  Places</Text>
      {allCity.map((p) => (
        <TouchableOpacity key={p.id} onPress={() => setSelected(p)} style={[styles.listCard, selected.id === p.id && styles.listActive]}>
          <Text style={styles.listName}>{p.name}</Text>
          <Text style={styles.listSub}>{p.type} • {p.price} • {p.distance}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Travel Route</Text>
      <View style={styles.routeCard}>
        <Text style={styles.routeText}>✈️ Jeddah Airport → Makkah by car (75 min, 300 SAR){'\n'}🚄 Makkah → Madinah by Haramain train (2.5 hours, 170–230 SAR){'\n'}🚌 Madinah → Jeddah return (train/bus, evening flight)</Text>
      </View>

      <Text style={styles.sectionTitle}>Airport Information</Text>
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
  headerSub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6 },
  toggleRow: { flexDirection: 'row', marginHorizontal: 18, marginTop: 12, gap: 8 },
  toggle: { flex: 1, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 12, alignItems: 'center', borderWidth: 1.5, borderColor: colors.sand },
  toggleActive: { backgroundColor: colors.green, borderColor: colors.green },
  toggleText: { fontFamily: fonts.bold, color: colors.ink, fontSize: 13 },
  toggleTextActive: { color: '#fff' },
  filterRow: { flexDirection: 'row', marginHorizontal: 18, marginTop: 10, gap: 6, flexWrap: 'wrap' },
  filter: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 16, borderWidth: 1, borderColor: colors.sand },
  filterActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  filterText: { fontFamily: fonts.bold, fontSize: 11, color: colors.ink },
  filterTextActive: { color: '#fff' },
  mapWrap: { marginHorizontal: 18, marginTop: 14, borderRadius: 24, overflow: 'hidden', borderWidth: 1.5, borderColor: colors.sand, backgroundColor: '#fff' },
  board: { height: 560, position: 'relative', overflow: 'hidden' },
  roadH: { position: 'absolute', left: 0, right: 0, top: '46%', height: 22 },
  roadV: { position: 'absolute', top: 0, bottom: 0, left: '48%', width: 22 },
  roadD: { position: 'absolute', left: '-10%', right: '-10%', top: '30%', height: 16, transform: [{ rotate: '-18deg' }] },
  cube: { position: 'absolute' },
  cubeTop: { height: 14, borderTopLeftRadius: 6, borderTopRightRadius: 6, transform: [{ skewX: '-20deg' }], marginLeft: 8 },
  cubeFace: { flex: 1, borderRadius: 4, marginTop: -2, opacity: 0.95 },
  cubeSide: { width: 12, position: 'absolute', right: -6, top: 8, bottom: 0, borderRadius: 4 },
  pin: { position: 'absolute', width: 40, height: 40, marginLeft: -20, marginTop: -36, backgroundColor: '#fff', borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.green, shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 0, height: 4 } },
  pinActive: { backgroundColor: colors.gold, borderColor: '#fff', width: 50, height: 50, marginLeft: -25, marginTop: -46, borderRadius: 25 },
  pinText: { fontSize: 19 },
  mapLabel: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(11,61,46,0.9)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  mapLabelText: { color: '#fff', fontFamily: fonts.medium, fontSize: 12 },
  zoomRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, padding: 10, backgroundColor: '#fff' },
  zoomBtn: { backgroundColor: colors.green, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 12 },
  zoomText: { color: '#fff', fontFamily: fonts.bold },
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
  routeCard: { backgroundColor: colors.green, marginHorizontal: 18, padding: 16, borderRadius: 16 },
  routeText: { color: '#fff', fontFamily: fonts.regular, fontSize: 14, lineHeight: 22 },
  infoCard: { backgroundColor: '#fff', marginHorizontal: 18, marginBottom: 10, padding: 16, borderRadius: 16 },
  infoTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink },
  infoText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 20, marginTop: 4 },
});
