import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { colors, fonts } from '../theme';

function TabIcon({ label }) {
  return <Text style={{ fontSize: 20 }}>{label}</Text>;
}

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
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: colors.sand, height: 62, paddingBottom: 6 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Plan', tabBarIcon: () => <TabIcon label="🕋" /> }} />
      <Tabs.Screen name="map" options={{ title: '3D Map', tabBarIcon: () => <TabIcon label="🗺️" /> }} />
      <Tabs.Screen name="budget" options={{ title: 'Budget', tabBarIcon: () => <TabIcon label="💰" /> }} />
      <Tabs.Screen name="learn" options={{ title: 'Seekhein', tabBarIcon: () => <TabIcon label="📖" /> }} />
      <Tabs.Screen name="checklist" options={{ title: 'Checklist', tabBarIcon: () => <TabIcon label="✅" /> }} />
    </Tabs>
  );
}
