import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { VocabularyWord } from '@/types';
import { Volume2, BookOpen } from 'lucide-react-native';

interface WordCardProps {
  word: VocabularyWord;
  onPress?: () => void;
  showTranslation?: boolean;
  style?: any;
}

export function WordCard({ word, onPress, showTranslation = false, style }: WordCardProps) {
  const handleAudioPress = () => {
    // Audio playback functionality would be implemented here
    console.log('Playing audio for:', word.word);
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View style={styles.wordInfo}>
          <Text style={styles.word}>{word.word}</Text>
          {word.phonetic && (
            <Text style={styles.phonetic}>{word.phonetic}</Text>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleAudioPress} style={styles.audioButton}>
            <Volume2 size={20} color="#3B82F6" />
          </TouchableOpacity>
          <View style={[styles.levelBadge, styles[`level${word.level}`]]}>
            <Text style={styles.levelText}>{word.level}</Text>
          </View>
        </View>
      </View>

      {showTranslation && (
        <Text style={styles.translation}>{word.translation}</Text>
      )}

      <View style={styles.exampleContainer}>
        <BookOpen size={16} color="#6B7280" />
        <Text style={styles.example}>{word.example}</Text>
      </View>

      {showTranslation && word.exampleTranslation && (
        <Text style={styles.exampleTranslation}>{word.exampleTranslation}</Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.reviewCount}>
          {word.reviewCount} reviews
        </Text>
        {word.isLearned && (
          <View style={styles.learnedBadge}>
            <Text style={styles.learnedText}>✓ Learned</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  wordInfo: {
    flex: 1,
  },
  word: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  phonetic: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  audioButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelA1: { backgroundColor: '#DBEAFE' },
  levelA2: { backgroundColor: '#E0F2FE' },
  levelB1: { backgroundColor: '#F0FDF4' },
  levelB2: { backgroundColor: '#FEF3C7' },
  levelC1: { backgroundColor: '#FED7AA' },
  levelC2: { backgroundColor: '#FECACA' },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  translation: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: '600',
    marginBottom: 12,
  },
  exampleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  example: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    flex: 1,
  },
  exampleTranslation: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  reviewCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  learnedBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  learnedText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
  },
});