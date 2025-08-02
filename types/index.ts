export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  isAuthenticated: boolean;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface UserProfile {
  selectedLanguage: Language;
  level: LanguageLevel;
  dailyWordsTarget: number;
  nativeLanguage: Language;
}

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  phonetic?: string;
  audioUrl?: string;
  imageUrl?: string;
  example: string;
  exampleTranslation: string;
  level: LanguageLevel;
  language: string;
  dateAdded: Date;
  isLearned: boolean;
  reviewCount: number;
  lastReviewed?: Date;
}

export interface LearningSession {
  id: string;
  date: Date;
  wordsLearned: number;
  timeSpent: number;
  accuracy: number;
}

export interface UserProgress {
  totalWordsLearned: number;
  currentStreak: number;
  longestStreak: number;
  sessionsCompleted: number;
  averageAccuracy: number;
  weeklyProgress: LearningSession[];
}

export interface QuizQuestion {
  id: string;
  word: VocabularyWord;
  question: string;
  options: string[];
  correctAnswer: number;
  type: 'multiple-choice' | 'spelling' | 'audio';
}