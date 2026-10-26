import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../theme';
import { PACKAGES, SERVICES } from '../../serviceData';

export default function ServicesScreen() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? PACKAGES : PACKAGES.filter((p) => p.tag === filter);

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Umrah Services</Text>
        <Text style={styles.sub}>Choose a package, then confirm booking with the provider. Prices are estimates.</Text>
      </View>

      <View style={styles.filterRow}>
        {['All', 'POPULAR', 'FAMILY BEST', 'PREMIUM'].map((f) => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filter, filter === f && styles.filterActive]}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f === 'All' ? 'All' : f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {shown.map((p) => (
        <TouchableOpacity key={p.id} onPress={() => setSelected(selected === p.id ? null : p.id)} style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.cardTag}>{p.tag}</Text>
            <Text style={styles.price}>{p.price}</Text>
          </View>
          <Text style={styles.cardTitle}>{p.name}</Text>
          <Text style={styles.cardText}>{p.duration} • {p.hotel} • ⭐ {p.rating}</Text>
          <Text style={styles.cardNote}>{p.detail}</Text>
          {selected === p.id && (
            <View style={styles.detailBox}>
              <Text style={styles.detailText}>✓ Visa processing{'\n'}✓ Flight + hotel + transport{'\n'}✓ Ziyarat tour{'\n'}✓ Nusuk / Rawdah help{'\n'}Contact the provider to book — in-app payment is not live yet.</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>More Services</Text>
      {SERVICES.map((s) => (
        <View key={s.id} style={styles.serviceCard}>
          <Text style={styles.serviceName}>{s.name}</Text>
          <Text style={styles.serviceDetail}>{s.detail}</Text>
          <Text style={styles.servicePrice}>{s.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, lineHeight: 20 },
  filterRow: { flexDirection: 'row', marginHorizontal: 18, marginTop: 12, gap: 8, flexWrap: 'wrap' },
  filter: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.sand },
  filterActive: { backgroundColor: colors.green, borderColor: colors.green },
  filterText: { fontFamily: fonts.bold, fontSize: 12, color: colors.ink },
  filterTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', marginHorizontal: 18, marginTop: 12, padding: 16, borderRadius: 18, borderWidth: 1, borderColor: colors.sand },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTag: { backgroundColor: colors.green, color: '#fff', fontFamily: fonts.bold, fontSize: 11, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  price: { fontFamily: fonts.bold, color: colors.green, fontSize: 14 },
  cardTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.ink, marginTop: 10 },
  cardText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, marginTop: 3 },
  cardNote: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, marginTop: 8, lineHeight: 19 },
  detailBox: { backgroundColor: '#EAF3EC', padding: 12, borderRadius: 12, marginTop: 12 },
  detailText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, lineHeight: 20 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink, marginHorizontal: 18, marginTop: 24, marginBottom: 10 },
  serviceCard: { backgroundColor: '#fff', marginHorizontal: 18, marginBottom: 10, padding: 16, borderRadius: 16 },
  serviceName: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink },
  serviceDetail: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: 4 },
  servicePrice: { fontFamily: fonts.bold, fontSize: 13, color: colors.green, marginTop: 6 },
});
