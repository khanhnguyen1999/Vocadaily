import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import { WordCard } from '@/components/vocabulary/WordCard';
import { Button } from '@/components/common/Button';
import { ArrowRight, RotateCcw, Volume2, Eye, EyeOff } from 'lucide-react-native';

export default function LearnScreen() {
  const { currentWords, markWordAsLearned } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [sessionWordsLearned, setSessionWordsLearned] = useState(0);

  const unlearnedWords = currentWords.filter(word => !word.isLearned);
  const currentWord = unlearnedWords[currentIndex];

  const handleNext = () => {
    if (currentIndex < unlearnedWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
    }
  };

  const handleMarkAsLearned = () => {
    if (currentWord) {
      markWordAsLearned(currentWord.id);
      setSessionWordsLearned(sessionWordsLearned + 1);
      handleNext();
    }
  };

  const handleRevealTranslation = () => {
    setShowTranslation(true);
  };

  const handlePlayAudio = () => {
    // Audio playback would be implemented here
    console.log('Playing audio for:', currentWord?.word);
  };

  if (!currentWord) {
    return (
      <View style={styles.completedContainer}>
        <Text style={styles.completedTitle}>🎉 Session Complete!</Text>
        <Text style={styles.completedSubtitle}>
          You've learned {sessionWordsLearned} new words today
        </Text>
        <Button
          title="Continue Learning"
          onPress={() => setCurrentIndex(0)}
          size="large"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Session</Text>
        <Text style={styles.progress}>
          {currentIndex + 1} of {unlearnedWords.length}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${((currentIndex + 1) / unlearnedWords.length) * 100}%` }
          ]} 
        />
      </View>

      <View style={styles.wordContainer}>
        <WordCard
          word={currentWord}
          showTranslation={showTranslation}
          style={styles.wordCard}
        />
      </View>

      <View style={styles.audioSection}>
        <TouchableOpacity onPress={handlePlayAudio} style={styles.audioButton}>
          <Volume2 size={24} color="#FFFFFF" />
          <Text style={styles.audioButtonText}>Listen</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        {!showTranslation ? (
          <Button
            title="Reveal Translation"
            onPress={handleRevealTranslation}
            variant="outline"
            size="large"
            style={styles.revealButton}
          />
        ) : (
          <View style={styles.learningButtons}>
            <Button
              title="Need More Practice"
              onPress={handleNext}
              variant="outline"
              style={styles.practiceButton}
            />
            <Button
              title="I Know This!"
              onPress={handleMarkAsLearned}
              style={styles.learnedButton}
            />
          </View>
        )}
      </View>

      <View style={styles.sessionStats}>
        <View style={styles.sessionStat}>
          <Text style={styles.sessionStatNumber}>{sessionWordsLearned}</Text>
          <Text style={styles.sessionStatLabel}>Words Learned</Text>
        </View>
        <View style={styles.sessionStat}>
          <Text style={styles.sessionStatNumber}>{unlearnedWords.length - currentIndex - 1}</Text>
          <Text style={styles.sessionStatLabel}>Remaining</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  progress: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 24,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  wordContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  wordCard: {
    marginVertical: 0,
  },
  audioSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  audioButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  audioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    padding: 24,
    gap: 12,
  },
  revealButton: {
    marginBottom: 12,
  },
  learningButtons: {
    gap: 12,
  },
  practiceButton: {
    flex: 1,
  },
  learnedButton: {
    backgroundColor: '#10B981',
  },
  sessionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  sessionStat: {
    alignItems: 'center',
  },
  sessionStatNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  sessionStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  completedTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  completedSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
  },
});