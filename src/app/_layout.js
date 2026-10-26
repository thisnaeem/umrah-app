import { Stack } from 'expo-router';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { requestNotificationPermission } from '../notifications';
import { colors, fonts } from '../theme';

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    // Ask once for notification permission; user can change it in the
    // Notifications screen. This never blocks the app if declined.
    requestNotificationPermission().catch(() => {});
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.green },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: fonts.bold },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="learn" options={{ title: 'Learn Umrah' }} />
        <Stack.Screen name="budget" options={{ title: 'Budget Calculator' }} />
        <Stack.Screen name="checklist" options={{ title: 'Checklist' }} />
        <Stack.Screen name="prayer" options={{ title: 'Prayer Times' }} />
        <Stack.Screen name="qibla" options={{ title: 'Qibla Compass' }} />
        <Stack.Screen name="tasbih" options={{ title: 'Digital Tasbih' }} />
        <Stack.Screen name="ziyarat" options={{ title: 'Ziyarat Places' }} />
        <Stack.Screen name="currency" options={{ title: 'Currency Converter' }} />
        <Stack.Screen name="emergency" options={{ title: 'Emergency & Help' }} />
        <Stack.Screen name="auth" options={{ title: 'Sign In / Create Account' }} />
        <Stack.Screen name="location" options={{ title: 'Live Location Sharing' }} />
        <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      </Stack>
    </AuthProvider>
  );
}
