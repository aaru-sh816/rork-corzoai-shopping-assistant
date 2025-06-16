import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Info } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface PreferenceOption {
  value: string;
  label: string;
}

interface PreferenceSelectorProps {
  title: string;
  options: PreferenceOption[];
  onSelect: (value: string) => void;
  initialValue?: string;
}

const PreferenceSelector = ({ title, options, onSelect, initialValue }: PreferenceSelectorProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(initialValue || '');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity>
          <Info size={20} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              selectedValue === option.value && styles.selectedOption,
            ]}
            onPress={() => handleSelect(option.value)}
          >
            <Text 
              style={[
                styles.optionText,
                selectedValue === option.value && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: Colors.dark.accent,
  },
  optionText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default PreferenceSelector;