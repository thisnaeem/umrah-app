import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { colors, fonts } from '../../theme';
import { PACKAGES, DUAS } from '../../serviceData';
import { useAuth } from '../../context/AuthContext';

function QA({ href, emoji, label }) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.qa}>
        <View style={styles.qaIcon}><Text style={styles.qaEmoji}>{emoji}</Text></View>
        <Text style={styles.qaLabel}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

export default function HomeScreen() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const name = user?.guest ? 'Guest' : user?.name?.split(' ')[0] || 'Pilgrim';

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <LinearGradient colors={[colors.green, colors.greenLight, '#1E7A55']} style={styles.hero}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroSmall}>ASSALAMU ALAIKUM</Text>
            <Text style={styles.heroTitle}>Welcome, {name}</Text>
          </View>
          <Link href="/auth" asChild>
            <TouchableOpacity style={styles.signBtn}><Text style={styles.signText}>{user && !user.guest ? 'My Account' : 'Sign In'}</Text></TouchableOpacity>
          </Link>
        </View>
        <Text style={styles.heroSub}>Umrah services, duas, live guidance, companions and location safety — all in one app.</Text>
        <TextInput style={styles.search} placeholder="Search packages, duas, places…" placeholderTextColor="#B8CFC2" value={query} onChangeText={setQuery} />
        {query.length > 0 && (
          <View style={styles.searchBox}>
            <Link href="/services" asChild><TouchableOpacity><Text style={styles.searchItem}>Services & Packages for “{query}” →</Text></TouchableOpacity></Link>
            <Link href="/duas" asChild><TouchableOpacity><Text style={styles.searchItem}>Duas matching “{query}” →</Text></TouchableOpacity></Link>
            <Link href="/ziyarat" asChild><TouchableOpacity><Text style={styles.searchItem}>Ziyarat places →</Text></TouchableOpacity></Link>
          </View>
        )}
      </LinearGradient>

      <View style={styles.prayerCard}>
        <View>
          <Text style={styles.prayerLabel}>NEXT PRAYER • MAKKAH</Text>
          <Text style={styles.prayerTime}>Asr • 15:38</Text>
          <Text style={styles.prayerSub}>Fajr 05:12 • Dhuhr 12:18 • Maghrib 17:52 • Isha 19:22</Text>
        </View>
        <Link href="/prayer" asChild><TouchableOpacity style={styles.prayerBtn}><Text style={styles.prayerBtnText}>Times →</Text></TouchableOpacity></Link>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.qaGrid}>
        <QA href="/services" emoji="🏨" label="Services" />
        <QA href="/duas" emoji="🤲" label="Duas" />
        <QA href="/guide" emoji="🧭" label="Live Guide" />
        <QA href="/sathi" emoji="👥" label="Companions" />
        <QA href="/map" emoji="🗺️" label="3D Map" />
        <QA href="/location" emoji="📍" label="Live Location" />
        <QA href="/prayer" emoji="🕌" label="Prayer Times" />
        <QA href="/qibla" emoji="🧭" label="Qibla" />
        <QA href="/tasbih" emoji="📿" label="Tasbih" />
      </View>
      <View style={styles.qaGrid}>
        <QA href="/ziyarat" emoji="⛰️" label="Ziyarat" />
        <QA href="/currency" emoji="💱" label="Currency" />
        <QA href="/emergency" emoji="🆘" label="Emergency" />
        <QA href="/learn" emoji="📖" label="Learn" />
        <QA href="/budget" emoji="💰" label="Budget" />
        <QA href="/checklist" emoji="✅" label="Checklist" />
        <QA href="/notifications" emoji="🔔" label="Notifications" />
      </View>

      <Text style={styles.sectionTitle}>Featured Packages</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 18, gap: 12 }}>
        {PACKAGES.map((p) => (
          <Link key={p.id} href="/services" asChild>
            <TouchableOpacity style={styles.pkgCard}>
              <Text style={styles.pkgTag}>{p.tag}</Text>
              <Text style={styles.pkgName}>{p.name}</Text>
              <Text style={styles.pkgPrice}>{p.price}</Text>
              <Text style={styles.pkgText}>{p.duration} • {p.hotel} • ⭐ {p.rating}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Dua of the Day</Text>
      <View style={styles.duaCard}>
        <Text style={styles.duaTitle}>{DUAS[2].title} — Talbiyah</Text>
        <Text style={styles.duaArabic}>{DUAS[2].arabic}</Text>
        <Text style={styles.duaTrans}>{DUAS[2].translit}</Text>
        <Link href="/duas" asChild><TouchableOpacity style={styles.btn}><Text style={styles.btnText}>All Duas →</Text></TouchableOpacity></Link>
      </View>

      <View style={styles.safetyCard}>
        <Text style={styles.safetyTitle}>Travelling with family?</Text>
        <Text style={styles.safetyText}>Turn on Live Location Sharing in your group. If anyone gets lost, companions can see their last location on the map and use SOS.</Text>
        <Link href="/location" asChild><TouchableOpacity style={styles.btnDark}><Text style={styles.btnText}>Open Live Location →</Text></TouchableOpacity></Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  hero: { padding: 22, paddingTop: 26, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroSmall: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 12, letterSpacing: 1.5 },
  heroTitle: { color: '#fff', fontFamily: fonts.bold, fontSize: 28, marginTop: 6 },
  heroSub: { color: '#D9EDE2', fontFamily: fonts.regular, fontSize: 14, marginTop: 10, lineHeight: 20 },
  signBtn: { backgroundColor: colors.gold, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  signText: { color: '#fff', fontFamily: fonts.bold, fontSize: 12 },
  search: { backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff', padding: 13, borderRadius: 14, marginTop: 16, fontFamily: fonts.regular },
  searchBox: { backgroundColor: '#fff', borderRadius: 14, padding: 12, marginTop: 10 },
  searchItem: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink, paddingVertical: 4 },
  prayerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 18, padding: 16, borderRadius: 18, borderWidth: 1, borderColor: colors.sand, marginTop: 16 },
  prayerLabel: { fontFamily: fonts.bold, fontSize: 11, color: colors.green, letterSpacing: 1 },
  prayerTime: { fontFamily: fonts.bold, fontSize: 20, color: colors.ink, marginTop: 4 },
  prayerSub: { fontFamily: fonts.regular, fontSize: 11, color: colors.muted, marginTop: 4 },
  prayerBtn: { backgroundColor: colors.green, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  prayerBtnText: { color: '#fff', fontFamily: fonts.bold, fontSize: 12 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 19, color: colors.ink, marginHorizontal: 18, marginTop: 24, marginBottom: 12 },
  qaGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 12, gap: 10 },
  qa: { width: '30%', backgroundColor: '#fff', borderRadius: 18, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.sand },
  qaIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#EAF3EC', alignItems: 'center', justifyContent: 'center' },
  qaEmoji: { fontSize: 24 },
  qaLabel: { fontFamily: fonts.bold, fontSize: 11, color: colors.ink, marginTop: 8, textAlign: 'center' },
  pkgCard: { width: 240, backgroundColor: '#fff', padding: 16, borderRadius: 18, borderWidth: 1, borderColor: colors.sand },
  pkgTag: { backgroundColor: colors.green, color: '#fff', fontFamily: fonts.bold, fontSize: 11, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, overflow: 'hidden', alignSelf: 'flex-start' },
  pkgName: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink, marginTop: 10 },
  pkgPrice: { fontFamily: fonts.bold, fontSize: 15, color: colors.green, marginTop: 4 },
  pkgText: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, marginTop: 4 },
  duaCard: { backgroundColor: colors.green, marginHorizontal: 18, padding: 20, borderRadius: 20 },
  duaTitle: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 16 },
  duaArabic: { color: '#fff', fontSize: 20, lineHeight: 32, marginTop: 10, textAlign: 'right' },
  duaTrans: { color: '#D9EDE2', fontFamily: fonts.regular, fontSize: 13, marginTop: 10, lineHeight: 19 },
  btn: { backgroundColor: colors.gold, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  btnText: { fontFamily: fonts.bold, color: '#fff' },
  safetyCard: { backgroundColor: '#FFFBEA', marginHorizontal: 18, marginTop: 20, padding: 18, borderRadius: 18, borderWidth: 1, borderColor: colors.gold },
  safetyTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink },
  safetyText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: 6 },
  btnDark: { backgroundColor: colors.green, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 12 },
});
