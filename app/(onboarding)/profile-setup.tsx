import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/common/Button';
import { AVAILABLE_LANGUAGES, NATIVE_LANGUAGES, LANGUAGE_LEVELS, DAILY_WORDS_OPTIONS } from '@/constants/languages';

export default function ProfileSetupScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState(AVAILABLE_LANGUAGES[0]);
  const [nativeLanguage, setNativeLanguage] = useState(NATIVE_LANGUAGES[0]);
  const [level, setLevel] = useState('A1');
  const [dailyTarget, setDailyTarget] = useState(20);
  const { setUserProfile } = useStore();

  const handleComplete = () => {
    const profile = {
      selectedLanguage,
      level: level as any,
      dailyWordsTarget: dailyTarget,
      nativeLanguage,
    };
    
    setUserProfile(profile);
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Set Up Your Profile</Text>
        <Text style={styles.subtitle}>Customize your learning experience</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What language do you want to learn?</Text>
        <View style={styles.languageGrid}>
          {AVAILABLE_LANGUAGES.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageCard,
                selectedLanguage.code === language.code && styles.languageCardSelected
              ]}
              onPress={() => setSelectedLanguage(language)}
            >
              <Text style={styles.languageFlag}>{language.flag}</Text>
              <Text style={[
                styles.languageName,
                selectedLanguage.code === language.code && styles.languageNameSelected
              ]}>
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What's your current level?</Text>
        <View style={styles.levelGrid}>
          {LANGUAGE_LEVELS.map((lvl) => (
            <TouchableOpacity
              key={lvl}
              style={[
                styles.levelCard,
                level === lvl && styles.levelCardSelected
              ]}
              onPress={() => setLevel(lvl)}
            >
              <Text style={[
                styles.levelText,
                level === lvl && styles.levelTextSelected
              ]}>
                {lvl}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How many words per day?</Text>
        <View style={styles.targetGrid}>
          {DAILY_WORDS_OPTIONS.map((target) => (
            <TouchableOpacity
              key={target}
              style={[
                styles.targetCard,
                dailyTarget === target && styles.targetCardSelected
              ]}
              onPress={() => setDailyTarget(target)}
            >
              <Text style={[
                styles.targetText,
                dailyTarget === target && styles.targetTextSelected
              ]}>
                {target}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What's your native language?</Text>
        <View style={styles.languageGrid}>
          {NATIVE_LANGUAGES.slice(0, 6).map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageCard,
                nativeLanguage.code === language.code && styles.languageCardSelected
              ]}
              onPress={() => setNativeLanguage(language)}
            >
              <Text style={styles.languageFlag}>{language.flag}</Text>
              <Text style={[
                styles.languageName,
                nativeLanguage.code === language.code && styles.languageNameSelected
              ]}>
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Complete Setup"
          onPress={handleComplete}
          size="large"
          style={styles.completeButton}
        />
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
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
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  languageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: '30%',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  languageCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  languageFlag: {
    fontSize: 24,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  languageNameSelected: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  levelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  levelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 60,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  levelCardSelected: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  levelTextSelected: {
    color: '#10B981',
  },
  targetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  targetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  targetCardSelected: {
    borderColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  targetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  targetTextSelected: {
    color: '#F59E0B',
  },
  buttonContainer: {
    padding: 24,
  },
  completeButton: {
    marginBottom: 24,
  },
});