import { Tabs } from 'expo-router';
import { Home01Icon, Hotel01Icon, HandPrayerIcon, Compass01Icon, GroupIcon, MapsGlobal01Icon } from '../../icons';
import Icon from '../../components/Icon';
import { colors, fonts } from '../../theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.green },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: fonts.bold },
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 10 },
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: colors.sand, height: 64, paddingBottom: 6, paddingTop: 4 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Icon icon={Home01Icon} color={color} /> }} />
      <Tabs.Screen name="services" options={{ title: 'Services', tabBarIcon: ({ color }) => <Icon icon={Hotel01Icon} color={color} /> }} />
      <Tabs.Screen name="duas" options={{ title: 'Duas', tabBarIcon: ({ color }) => <Icon icon={HandPrayerIcon} color={color} /> }} />
      <Tabs.Screen name="guide" options={{ title: 'Guide', tabBarIcon: ({ color }) => <Icon icon={Compass01Icon} color={color} /> }} />
      <Tabs.Screen name="sathi" options={{ title: 'Companions', tabBarIcon: ({ color }) => <Icon icon={GroupIcon} color={color} /> }} />
      <Tabs.Screen name="map" options={{ title: '3D Map', tabBarIcon: ({ color }) => <Icon icon={MapsGlobal01Icon} color={color} /> }} />
    </Tabs>
  );
}
