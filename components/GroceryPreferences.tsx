import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Info, PlusCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import PreferenceSelector from './PreferenceSelector';

interface GroceryPreferencesProps {
  query: string;
  onComplete: (preferences: any) => void;
}

const GroceryPreferences = ({ query, onComplete }: GroceryPreferencesProps) => {
  const [preferences, setPreferences] = useState({
    onion: '250 g',
    garlic: '100 g',
    tomato: '500 g',
  });

  const handlePreferenceChange = (type: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleComplete = () => {
    onComplete(preferences);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.queryText}>{query}</Text>
      
      <View style={styles.divider} />
      
      <Text style={styles.heading}>Select your preferences</Text>
      
      <ScrollView style={styles.preferencesContainer} showsVerticalScrollIndicator={false}>
        <PreferenceSelector
          title="Onion Weight"
          options={[
            { value: '250 g', label: '250 g' },
            { value: '500 g', label: '500 g' },
            { value: '1 kg', label: '1 kg' },
            { value: '2 kg', label: '2 kg' },
          ]}
          onSelect={(value) => handlePreferenceChange('onion', value)}
          initialValue={preferences.onion}
        />
        
        <View style={styles.sectionDivider} />
        
        <PreferenceSelector
          title="Garlic Weight"
          options={[
            { value: '100 g', label: '100 g' },
            { value: '200 g', label: '200 g' },
            { value: '500 g', label: '500 g' },
          ]}
          onSelect={(value) => handlePreferenceChange('garlic', value)}
          initialValue={preferences.garlic}
        />
        
        <View style={styles.sectionDivider} />
        
        <PreferenceSelector
          title="Tomato Quantity"
          options={[
            { value: '250 g', label: '250 g' },
            { value: '500 g', label: '500 g' },
            { value: '1 kg', label: '1 kg' },
            { value: '2 kg', label: '2 kg' },
          ]}
          onSelect={(value) => handlePreferenceChange('tomato', value)}
          initialValue={preferences.tomato}
        />
        
        <View style={styles.sectionDivider} />
        
        <TouchableOpacity style={styles.suggestButton}>
          <PlusCircle size={20} color={Colors.dark.text} />
          <Text style={styles.suggestButtonText}>Suggest more preferences ✨</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  queryText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 4,
    width: 40,
    backgroundColor: '#444',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  preferencesContainer: {
    maxHeight: 500,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 16,
  },
  suggestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 16,
    marginBottom: 24,
    gap: 8,
  },
  suggestButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: Colors.dark.accent,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  completeButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GroceryPreferences;