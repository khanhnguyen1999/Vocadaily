import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '@/store/useStore';
import { ProgressBar } from '@/components/common/ProgressBar';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react-native';

export default function ProgressScreen() {
  const { progress, userProfile } = useStore();

  const thisWeekData = progress.weeklyProgress.slice(-7);
  const totalWordsThisWeek = thisWeekData.reduce((sum, session) => sum + session.wordsLearned, 0);
  const avgTimeThisWeek = thisWeekData.reduce((sum, session) => sum + session.timeSpent, 0) / thisWeekData.length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Keep up the great work!</Text>
      </View>

      <View style={styles.streakCard}>
        <View style={styles.streakIcon}>
          <Text style={styles.fireEmoji}>🔥</Text>
        </View>
        <View style={styles.streakInfo}>
          <Text style={styles.streakNumber}>{progress.currentStreak}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
        <View style={styles.streakRecord}>
          <Text style={styles.recordLabel}>Best: {progress.longestStreak} days</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Overall Statistics</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Target size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statNumber}>{progress.totalWordsLearned}</Text>
            <Text style={styles.statLabel}>Total Words</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Calendar size={24} color="#10B981" />
            </View>
            <Text style={styles.statNumber}>{progress.sessionsCompleted}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <TrendingUp size={24} color="#F59E0B" />
            </View>
            <Text style={styles.statNumber}>{progress.averageAccuracy}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Award size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.statNumber}>{Math.round(avgTimeThisWeek || 0)}</Text>
            <Text style={styles.statLabel}>Avg. Minutes</Text>
          </View>
        </View>
      </View>

      <View style={styles.weeklySection}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.weeklyCard}>
          <Text style={styles.weeklyNumber}>{totalWordsThisWeek}</Text>
          <Text style={styles.weeklyLabel}>Words Learned</Text>
          
          <View style={styles.weeklyProgress}>
            <ProgressBar
              current={totalWordsThisWeek}
              total={(userProfile?.dailyWordsTarget || 20) * 7}
              color="#10B981"
              showLabel={false}
            />
          </View>
        </View>
      </View>

      <View style={styles.weeklyChart}>
        <Text style={styles.sectionTitle}>Daily Activity</Text>
        <View style={styles.chartContainer}>
          {thisWeekData.map((session, index) => (
            <View key={session.id} style={styles.chartBar}>
              <View
                style={[
                  styles.bar,
                  {
                    height: Math.max((session.wordsLearned / 30) * 100, 4),
                    backgroundColor: session.wordsLearned > 0 ? '#3B82F6' : '#E5E7EB',
                  },
                ]}
              />
              <Text style={styles.chartLabel}>
                {session.date.toLocaleDateString('en', { weekday: 'short' })[0]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsList}>
          <View style={[styles.achievement, progress.currentStreak >= 7 && styles.achievementEarned]}>
            <Text style={styles.achievementEmoji}>🔥</Text>
            <Text style={styles.achievementTitle}>Week Warrior</Text>
            <Text style={styles.achievementDesc}>7-day learning streak</Text>
          </View>
          
          <View style={[styles.achievement, progress.totalWordsLearned >= 100 && styles.achievementEarned]}>
            <Text style={styles.achievementEmoji}>📚</Text>
            <Text style={styles.achievementTitle}>Word Master</Text>
            <Text style={styles.achievementDesc}>Learn 100 words</Text>
          </View>
          
          <View style={[styles.achievement, progress.averageAccuracy >= 90 && styles.achievementEarned]}>
            <Text style={styles.achievementEmoji}>🎯</Text>
            <Text style={styles.achievementTitle}>Sharp Shooter</Text>
            <Text style={styles.achievementDesc}>90% average accuracy</Text>
          </View>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  streakCard: {
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
  streakIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  fireEmoji: {
    fontSize: 32,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },
  streakLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  streakRecord: {
    alignItems: 'flex-end',
  },
  recordLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statsSection: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  weeklySection: {
    padding: 24,
    paddingTop: 0,
  },
  weeklyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  weeklyNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  weeklyLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  weeklyProgress: {
    width: '100%',
  },
  weeklyChart: {
    padding: 24,
    paddingTop: 0,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  achievementsSection: {
    padding: 24,
    paddingTop: 0,
  },
  achievementsList: {
    gap: 12,
  },
  achievement: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementEarned: {
    opacity: 1,
  },
  achievementEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#6B7280',
  },
});