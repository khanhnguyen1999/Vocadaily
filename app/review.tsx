import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/common/Button';
import { ArrowLeft, Shuffle, CircleCheck as CheckCircle, X } from 'lucide-react-native';

export default function ReviewScreen() {
  const { currentWords } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const learnedWords = currentWords.filter(word => word.isLearned);
  const currentWord = learnedWords[currentIndex];

  const handleNext = () => {
    if (currentIndex < learnedWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // End review session
      router.back();
    }
  };

  const handleKnowIt = () => {
    setScore(score + 1);
    handleNext();
  };

  const handleDontKnow = () => {
    handleNext();
  };

  const handleReveal = () => {
    setShowAnswer(true);
  };

  if (!currentWord) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No words to review yet!</Text>
        <Text style={styles.emptySubtitle}>Learn some words first, then come back to review them.</Text>
        <Button title="Start Learning" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Review Session</Text>
        <TouchableOpacity style={styles.shuffleButton}>
          <Shuffle size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progress}>
          {currentIndex + 1} of {learnedWords.length}
        </Text>
        <Text style={styles.score}>Score: {score}/{currentIndex + 1}</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.flashcard}>
          <View style={styles.cardFront}>
            <Text style={styles.word}>{currentWord.word}</Text>
            {currentWord.phonetic && (
              <Text style={styles.phonetic}>{currentWord.phonetic}</Text>
            )}
            <Text style={styles.example}>{currentWord.example}</Text>
          </View>

          {showAnswer && (
            <View style={styles.cardBack}>
              <View style={styles.divider} />
              <Text style={styles.translation}>{currentWord.translation}</Text>
              <Text style={styles.exampleTranslation}>{currentWord.exampleTranslation}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.actionButtons}>
        {!showAnswer ? (
          <Button
            title="Reveal Translation"
            onPress={handleReveal}
            variant="outline"
            size="large"
            style={styles.revealButton}
          />
        ) : (
          <View style={styles.reviewButtons}>
            <TouchableOpacity style={styles.dontKnowButton} onPress={handleDontKnow}>
              <X size={24} color="#FFFFFF" />
              <Text style={styles.dontKnowText}>Don't Know</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.knowItButton} onPress={handleKnowIt}>
              <CheckCircle size={24} color="#FFFFFF" />
              <Text style={styles.knowItText}>Know It!</Text>
            </TouchableOpacity>
          </View>
        )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  shuffleButton: {
    padding: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progress: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  score: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  flashcard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardFront: {
    alignItems: 'center',
  },
  word: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  phonetic: {
    fontSize: 18,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  example: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 28,
  },
  cardBack: {
    marginTop: 24,
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 24,
  },
  translation: {
    fontSize: 24,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 16,
    textAlign: 'center',
  },
  exampleTranslation: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionButtons: {
    padding: 24,
  },
  revealButton: {
    marginBottom: 24,
  },
  reviewButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  dontKnowButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dontKnowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  knowItButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  knowItText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
  },
});