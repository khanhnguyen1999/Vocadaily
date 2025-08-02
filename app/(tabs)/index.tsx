import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '@/store/useStore';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Button } from '@/components/common/Button';
import { Target, Calendar, Flame, Trophy } from 'lucide-react-native';

export default function HomeScreen() {
  const { userProfile, progress, currentWords } = useStore();
  
  const todayWordsLearned = currentWords.filter(word => 
    word.isLearned && 
    new Date(word.dateAdded).toDateString() === new Date().toDateString()
  ).length;
  
  const dailyTarget = userProfile?.dailyWordsTarget || 20;

  const handleStartLearning = () => {
    router.push('/learn');
  };

  const handleReview = () => {
    router.push('/review');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning! 👋</Text>
        <Text style={styles.subtitle}>Ready to learn some new words?</Text>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.progressCard}>
          <ProgressBar
            current={todayWordsLearned}
            total={dailyTarget}
            color="#10B981"
          />
          <Text style={styles.progressText}>
            Keep going! You're {dailyTarget - todayWordsLearned} words away from your daily goal.
          </Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Flame size={24} color="#F59E0B" />
          </View>
          <Text style={styles.statNumber}>{progress.currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Trophy size={24} color="#3B82F6" />
          </View>
          <Text style={styles.statNumber}>{progress.totalWordsLearned}</Text>
          <Text style={styles.statLabel}>Words Learned</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Target size={24} color="#10B981" />
          </View>
          <Text style={styles.statNumber}>{progress.averageAccuracy}%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Calendar size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.statNumber}>{progress.sessionsCompleted}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
      </View>

      <View style={styles.actionSection}>
        <Button
          title="Start Learning"
          onPress={handleStartLearning}
          size="large"
          style={styles.primaryButton}
        />
        
        <Button
          title="Review Words"
          onPress={handleReview}
          variant="outline"
          size="large"
          style={styles.secondaryButton}
        />
      </View>

      <View style={styles.quickStats}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.quickStatsCard}>
          <Text style={styles.quickStatsText}>
            Learning: {userProfile?.selectedLanguage.name || 'English'}
          </Text>
          <Text style={styles.quickStatsText}>
            Level: {userProfile?.level || 'B1'}
          </Text>
          <Text style={styles.quickStatsText}>
            Daily Goal: {dailyTarget} words
          </Text>
        </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  progressSection: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 24,
    paddingTop: 0,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionSection: {
    padding: 24,
    gap: 12,
  },
  primaryButton: {
    marginBottom: 8,
  },
  secondaryButton: {
    marginTop: 8,
  },
  quickStats: {
    padding: 24,
    paddingTop: 0,
  },
  quickStatsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickStatsText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
  },
});