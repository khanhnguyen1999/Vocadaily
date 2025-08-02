import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/common/Button';
import { 
  Settings, 
  Globe, 
  Target, 
  Bell, 
  Moon, 
  LogOut, 
  User as UserIcon,
  ChevronRight 
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { 
    user, 
    userProfile, 
    isDarkMode, 
    notificationsEnabled, 
    toggleDarkMode, 
    toggleNotifications, 
    logout 
  } = useStore();

  const handleLanguageSettings = () => {
    router.push('/language-settings');
  };

  const handleDailyGoalSettings = () => {
    router.push('/daily-goal-settings');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <UserIcon size={32} color="#FFFFFF" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name || user?.email || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Settings</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleLanguageSettings}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Globe size={20} color="#3B82F6" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Language & Level</Text>
              <Text style={styles.settingSubtitle}>
                {userProfile?.selectedLanguage.name} • {userProfile?.level}
              </Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleDailyGoalSettings}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Target size={20} color="#10B981" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Daily Goal</Text>
              <Text style={styles.settingSubtitle}>
                {userProfile?.dailyWordsTarget || 20} words per day
              </Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={toggleNotifications}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Bell size={20} color="#F59E0B" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingSubtitle}>
                Daily learning reminders
              </Text>
            </View>
          </View>
          <View style={[styles.toggle, notificationsEnabled && styles.toggleActive]}>
            <View style={[styles.toggleThumb, notificationsEnabled && styles.toggleThumbActive]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={toggleDarkMode}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Moon size={20} color="#8B5CF6" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingSubtitle}>
                Toggle app appearance
              </Text>
            </View>
          </View>
          <View style={[styles.toggle, isDarkMode && styles.toggleActive]}>
            <View style={[styles.toggleThumb, isDarkMode && styles.toggleThumbActive]} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, styles.logoutIcon]}>
              <LogOut size={20} color="#EF4444" />
            </View>
            <Text style={[styles.settingTitle, styles.logoutText]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoutIcon: {
    backgroundColor: '#FEE2E2',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  logoutText: {
    color: '#EF4444',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
});