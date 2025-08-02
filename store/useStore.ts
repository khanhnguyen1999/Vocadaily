import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserProfile, VocabularyWord, LearningSession, UserProgress } from '@/types';
import { AVAILABLE_LANGUAGES, NATIVE_LANGUAGES } from '@/constants/languages';
import { MOCK_WORDS, MOCK_SESSIONS } from '@/constants/mockData';

interface AppState {
  // User & Auth
  user: User | null;
  isFirstLaunch: boolean;
  
  // Profile
  userProfile: UserProfile | null;
  
  // Learning
  currentWords: VocabularyWord[];
  todaySession: LearningSession | null;
  progress: UserProgress;
  
  // Settings
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setFirstLaunch: (isFirst: boolean) => void;
  setUserProfile: (profile: UserProfile) => void;
  updateDailyTarget: (target: number) => void;
  updateLanguageLevel: (level: string) => void;
  markWordAsLearned: (wordId: string) => void;
  startLearningSession: () => void;
  endLearningSession: (wordsLearned: number, timeSpent: number, accuracy: number) => void;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
  resetProgress: () => void;
  logout: () => void;
}

const initialProgress: UserProgress = {
  totalWordsLearned: 45,
  currentStreak: 7,
  longestStreak: 12,
  sessionsCompleted: 23,
  averageAccuracy: 87,
  weeklyProgress: MOCK_SESSIONS,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isFirstLaunch: true,
      userProfile: null,
      currentWords: MOCK_WORDS,
      todaySession: null,
      progress: initialProgress,
      isDarkMode: false,
      notificationsEnabled: true,

      // Actions
      setUser: (user) => set({ user }),
      
      setFirstLaunch: (isFirst) => set({ isFirstLaunch: isFirst }),
      
      setUserProfile: (profile) => set({ userProfile: profile }),
      
      updateDailyTarget: (target) => set((state) => ({
        userProfile: state.userProfile ? {
          ...state.userProfile,
          dailyWordsTarget: target
        } : null
      })),
      
      updateLanguageLevel: (level) => set((state) => ({
        userProfile: state.userProfile ? {
          ...state.userProfile,
          level: level as any
        } : null
      })),
      
      markWordAsLearned: (wordId) => set((state) => ({
        currentWords: state.currentWords.map(word =>
          word.id === wordId ? { ...word, isLearned: true, reviewCount: word.reviewCount + 1 } : word
        ),
        progress: {
          ...state.progress,
          totalWordsLearned: state.progress.totalWordsLearned + 1
        }
      })),
      
      startLearningSession: () => set({
        todaySession: {
          id: Date.now().toString(),
          date: new Date(),
          wordsLearned: 0,
          timeSpent: 0,
          accuracy: 0,
        }
      }),
      
      endLearningSession: (wordsLearned, timeSpent, accuracy) => set((state) => ({
        todaySession: null,
        progress: {
          ...state.progress,
          sessionsCompleted: state.progress.sessionsCompleted + 1,
          currentStreak: state.progress.currentStreak + 1,
          averageAccuracy: Math.round((state.progress.averageAccuracy + accuracy) / 2),
          weeklyProgress: [...state.progress.weeklyProgress, {
            id: Date.now().toString(),
            date: new Date(),
            wordsLearned,
            timeSpent,
            accuracy,
          }].slice(-7),
        }
      })),
      
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      
      resetProgress: () => set({
        progress: {
          totalWordsLearned: 0,
          currentStreak: 0,
          longestStreak: 0,
          sessionsCompleted: 0,
          averageAccuracy: 0,
          weeklyProgress: [],
        },
        currentWords: MOCK_WORDS.map(word => ({ ...word, isLearned: false, reviewCount: 0 }))
      }),
      
      logout: () => set({
        user: null,
        userProfile: null,
        todaySession: null,
      }),
    }),
    {
      name: 'vocabulary-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isFirstLaunch: state.isFirstLaunch,
        userProfile: state.userProfile,
        progress: state.progress,
        isDarkMode: state.isDarkMode,
        notificationsEnabled: state.notificationsEnabled,
      }),
    }
  )
);