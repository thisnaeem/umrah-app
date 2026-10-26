import { Tabs } from 'expo-router';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Home01Icon, Hotel01Icon, HandPrayerIcon, Compass01Icon, GroupIcon } from '../icons';
import Icon from '../components/Icon';
import { colors, fonts } from '../theme';

export default function Layout() {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.green },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: fonts.bold },
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: colors.sand, height: 64, paddingBottom: 6, paddingTop: 4 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Icon icon={Home01Icon} color={color} /> }} />
      <Tabs.Screen name="services" options={{ title: 'Services', tabBarIcon: ({ color }) => <Icon icon={Hotel01Icon} color={color} /> }} />
      <Tabs.Screen name="duas" options={{ title: 'Duas', tabBarIcon: ({ color }) => <Icon icon={HandPrayerIcon} color={color} /> }} />
      <Tabs.Screen name="guide" options={{ title: 'Guide', tabBarIcon: ({ color }) => <Icon icon={Compass01Icon} color={color} /> }} />
      <Tabs.Screen name="sathi" options={{ title: 'Sathi', tabBarIcon: ({ color }) => <Icon icon={GroupIcon} color={color} /> }} />
      <Tabs.Screen name="map" options={{ title: '3D Map', href: null }} />
      <Tabs.Screen name="learn" options={{ title: 'Seekhein', href: null }} />
      <Tabs.Screen name="budget" options={{ title: 'Budget', href: null }} />
      <Tabs.Screen name="checklist" options={{ title: 'Checklist', href: null }} />
    </Tabs>
  );
}
