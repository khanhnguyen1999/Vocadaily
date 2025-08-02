import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '@/store/useStore';

export default function IndexScreen() {
  const { user, isFirstLaunch, userProfile } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFirstLaunch) {
        router.replace('/(onboarding)/welcome');
      } else if (!user) {
        router.replace('/(onboarding)/login');
      } else if (!userProfile) {
        router.replace('/(onboarding)/profile-setup');
      } else {
        router.replace('/(tabs)');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, isFirstLaunch, userProfile]);

  return (
    <View style={styles.container}>
      {/* Splash screen content could go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});