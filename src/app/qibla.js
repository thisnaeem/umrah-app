import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { colors, fonts } from '../theme';

// Qibla bearing from a location to the Kaaba (21.3891, 39.8579)
function qiblaBearing(lat, lon) {
  const kaabaLat = (21.3891 * Math.PI) / 180;
  const kaabaLon = (39.8579 * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;
  const lonDiff = kaabaLon - (lon * Math.PI) / 180;
  const y = Math.sin(lonDiff);
  const x = Math.cos(latRad) * Math.tan(kaabaLat) - Math.sin(latRad) * Math.cos(lonDiff);
  let deg = (Math.atan2(y, x) * 180) / Math.PI;
  return (deg + 360) % 360;
}

export default function QiblaScreen() {
  const [heading, setHeading] = useState(0);
  const [bearing, setBearing] = useState(qiblaBearing(31.5497, 74.3436)); // default: Lahore
  const [locLabel, setLocLabel] = useState('Lahore (default)');

  useEffect(() => {
    let sub;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const pos = await Location.getCurrentPositionAsync({});
          setBearing(qiblaBearing(pos.coords.latitude, pos.coords.longitude));
          setLocLabel(`${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`);
        }
      } catch {}
    })();
    Magnetometer.setUpdateInterval(100);
    sub = Magnetometer.addListener((data) => {
      let angle = 0;
      if (data) {
        angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
        angle = angle >= 0 ? angle : 360 + angle;
      }
      setHeading(Math.round(angle));
    });
    return () => sub && sub.remove();
  }, []);

  const needle = (bearing - heading + 360) % 360;

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Qibla Compass</Text>
      <Text style={styles.sub}>Point your phone flat. The gold needle points to the Kaaba.</Text>
      <Text style={styles.loc}>Your location: {locLabel}</Text>
      <View style={styles.compass}>
        <View style={[styles.needle, { transform: [{ rotate: `${needle}deg` }] }]}>
          <Text style={styles.needleText}>▲</Text>
        </View>
        <Text style={styles.center}>🕋</Text>
      </View>
      <Text style={styles.big}>Qibla: {Math.round(bearing)}°</Text>
      <Text style={styles.small}>Your heading: {heading}° • Needle: {Math.round(needle)}° from your direction</Text>
      <Text style={styles.tip}>Tip: If the compass jumps, move your phone in a figure-8 to calibrate it. On a device without a compass sensor, use the degree above with a physical compass.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => setBearing(qiblaBearing(21.3891, 39.8579))}>
        <Text style={styles.btnText}>I am in Makkah</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream, padding: 20, alignItems: 'center' },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 6, textAlign: 'center', lineHeight: 20 },
  loc: { fontFamily: fonts.medium, fontSize: 13, color: colors.green, marginTop: 10 },
  compass: { width: 240, height: 240, borderRadius: 120, backgroundColor: '#fff', borderWidth: 2, borderColor: colors.gold, marginTop: 24, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  needle: { position: 'absolute', top: 10, height: 110, alignItems: 'center' },
  needleText: { color: colors.gold, fontSize: 28 },
  center: { fontSize: 44 },
  big: { fontFamily: fonts.bold, fontSize: 22, color: colors.ink, marginTop: 24 },
  small: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, marginTop: 6, textAlign: 'center' },
  tip: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, lineHeight: 20, marginTop: 18, textAlign: 'center' },
  btn: { backgroundColor: colors.green, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, marginTop: 18 },
  btnText: { color: '#fff', fontFamily: fonts.bold },
});
