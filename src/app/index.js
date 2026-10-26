import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Kaaba01Icon, HandPrayerIcon, Compass01Icon, GroupIcon, MapsGlobal01Icon, BookOpen01Icon, Hotel01Icon } from '../icons';
import Icon from '../components/Icon';
import { colors, fonts } from '../theme';
import { PACKAGES, DUAS } from '../serviceData';

function QuickAction({ href, icon, label }) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.qa}>
        <View style={styles.qaIcon}><Icon icon={icon} size={26} color={colors.green} /></View>
        <Text style={styles.qaLabel}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <LinearGradient colors={[colors.green, colors.greenLight, '#1E7A55']} style={styles.hero}>
        <Text style={styles.heroSmall}>UMRAH GUIDE • PLAY STORE APP</Text>
        <Text style={styles.heroTitle}>Umrah, Aasan{'\n'}Aur Mukammal</Text>
        <Text style={styles.heroSub}>Services, duas, live guidance aur sathi — sab kuch ek app me.</Text>
        <View style={styles.heroRow}>
          <View style={styles.heroChip}><Text style={styles.heroChipText}>🕋 Services</Text></View>
          <View style={styles.heroChip}><Text style={styles.heroChipText}>📖 Duas</Text></View>
          <View style={styles.heroChip}><Text style={styles.heroChipText}>👥 Sathi</Text></View>
        </View>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.qaGrid}>
        <QuickAction href="/services" icon={Hotel01Icon} label="Services" />
        <QuickAction href="/duas" icon={HandPrayerIcon} label="Duas" />
        <QuickAction href="/guide" icon={Compass01Icon} label="Live Guide" />
        <QuickAction href="/sathi" icon={GroupIcon} label="Sathi Dhoondhein" />
        <QuickAction href="/map" icon={MapsGlobal01Icon} label="3D Map" />
        <QuickAction href="/learn" icon={BookOpen01Icon} label="Seekhein" />
      </View>

      <Text style={styles.sectionTitle}>Umrah Packages</Text>
      {PACKAGES.slice(0, 3).map((p) => (
        <Link key={p.id} href="/services" asChild>
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.cardTag}>{p.tag}</Text>
              <Text style={styles.price}>{p.price}</Text>
            </View>
            <Text style={styles.cardTitle}>{p.name} • {p.duration}</Text>
            <Text style={styles.cardText}>{p.hotel} • ⭐ {p.rating}</Text>
            <Text style={styles.cardNote}>{p.detail}</Text>
          </TouchableOpacity>
        </Link>
      ))}

      <Text style={styles.sectionTitle}>Aaj ki Dua</Text>
      <View style={styles.duaCard}>
        <Icon icon={Kaaba01Icon} size={28} color={colors.gold} />
        <Text style={styles.duaTitle}>{DUAS[2].title} — Talbiyah</Text>
        <Text style={styles.duaArabic}>{DUAS[2].arabic}</Text>
        <Text style={styles.duaTrans}>{DUAS[2].translit}</Text>
        <Link href="/duas" asChild>
          <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Sab Duas Dekhein →</Text></TouchableOpacity>
        </Link>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Play Store ke liye note</Text>
        <Text style={styles.noteText}>Packages aur services listings hain — live booking / payment ke liye provider integration chahiye hogi. Sathi finder abhi local demo groups dikhata hai, live matching ke liye backend chahiye hoga.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  hero: { padding: 22, paddingTop: 28, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroSmall: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 12, letterSpacing: 1.5 },
  heroTitle: { color: '#fff', fontFamily: fonts.bold, fontSize: 32, lineHeight: 38, marginTop: 8 },
  heroSub: { color: '#D9EDE2', fontFamily: fonts.regular, fontSize: 14, marginTop: 10, lineHeight: 20 },
  heroRow: { flexDirection: 'row', marginTop: 16, gap: 8, flexWrap: 'wrap' },
  heroChip: { backgroundColor: 'rgba(255,255,255,0.18)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  heroChipText: { color: '#fff', fontFamily: fonts.medium, fontSize: 13 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 19, color: colors.ink, marginHorizontal: 18, marginTop: 24, marginBottom: 12 },
  qaGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 12, gap: 10 },
  qa: { width: '30%', backgroundColor: '#fff', borderRadius: 18, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: colors.sand },
  qaIcon: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#EAF3EC', alignItems: 'center', justifyContent: 'center' },
  qaLabel: { fontFamily: fonts.bold, fontSize: 12, color: colors.ink, marginTop: 8, textAlign: 'center' },
  card: { backgroundColor: '#fff', marginHorizontal: 18, marginBottom: 12, padding: 16, borderRadius: 18, borderWidth: 1, borderColor: colors.sand },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTag: { backgroundColor: colors.green, color: '#fff', fontFamily: fonts.bold, fontSize: 11, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  price: { fontFamily: fonts.bold, color: colors.green, fontSize: 14 },
  cardTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink, marginTop: 10 },
  cardText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, marginTop: 3 },
  cardNote: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, marginTop: 8, lineHeight: 19 },
  duaCard: { backgroundColor: colors.green, marginHorizontal: 18, padding: 20, borderRadius: 20 },
  duaTitle: { color: colors.goldLight, fontFamily: fonts.bold, fontSize: 16, marginTop: 10 },
  duaArabic: { color: '#fff', fontSize: 20, lineHeight: 32, marginTop: 10, textAlign: 'right' },
  duaTrans: { color: '#D9EDE2', fontFamily: fonts.regular, fontSize: 13, marginTop: 10, lineHeight: 19 },
  btn: { backgroundColor: colors.gold, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  btnText: { fontFamily: fonts.bold, color: '#fff' },
  noteCard: { backgroundColor: '#FFFBEA', marginHorizontal: 18, marginTop: 20, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.gold },
  noteTitle: { fontFamily: fonts.bold, color: colors.ink },
  noteText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: 6 },
});
