import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useStore } from '@/store/useStore';
import { WordCard } from '@/components/vocabulary/WordCard';
import { Search, Filter, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';

export default function WordsScreen() {
  const { currentWords } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'learned' | 'unlearned'>('all');

  const filteredWords = currentWords.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         word.translation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'learned' && word.isLearned) ||
                         (filterType === 'unlearned' && !word.isLearned);
    
    return matchesSearch && matchesFilter;
  });

  const renderWord = ({ item }: { item: any }) => (
    <WordCard word={item} showTranslation={true} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Word Library</Text>
        <Text style={styles.subtitle}>{filteredWords.length} words</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search words..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'all' && styles.filterButtonActive]}
          onPress={() => setFilterType('all')}
        >
          <Text style={[styles.filterButtonText, filterType === 'all' && styles.filterButtonTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'learned' && styles.filterButtonActive]}
          onPress={() => setFilterType('learned')}
        >
          <CheckCircle size={16} color={filterType === 'learned' ? '#FFFFFF' : '#6B7280'} />
          <Text style={[styles.filterButtonText, filterType === 'learned' && styles.filterButtonTextActive]}>
            Learned
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'unlearned' && styles.filterButtonActive]}
          onPress={() => setFilterType('unlearned')}
        >
          <Clock size={16} color={filterType === 'unlearned' ? '#FFFFFF' : '#6B7280'} />
          <Text style={[styles.filterButtonText, filterType === 'unlearned' && styles.filterButtonTextActive]}>
            Learning
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredWords}
        renderItem={renderWord}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.wordsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  wordsList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
});