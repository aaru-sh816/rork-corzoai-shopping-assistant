import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';

interface Suggestion {
  id: string;
  text: string;
}

interface SuggestionChipsProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
}

const SuggestionChips = ({ suggestions, onSelect }: SuggestionChipsProps) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {suggestions.map((suggestion) => (
        <TouchableOpacity
          key={suggestion.id}
          style={styles.chip}
          onPress={() => onSelect(suggestion)}
        >
          <Text style={styles.chipText}>{suggestion.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    backgroundColor: Colors.dark.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SuggestionChips;