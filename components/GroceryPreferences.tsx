import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Info, PlusCircle, ShoppingCart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import PreferenceSelector from './PreferenceSelector';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

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
        <View style={styles.preferenceSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Onion Weight</Text>
            <TouchableOpacity style={styles.infoButton}>
              <Info size={20} color={Colors.dark.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.optionsContainer}>
            {['250 g', '500 g', '1 kg', '2 kg'].map((option) => (
              <TouchableOpacity
                key={`onion-${option}`}
                style={[
                  styles.optionButton,
                  preferences.onion === option && styles.selectedOption
                ]}
                onPress={() => handlePreferenceChange('onion', option)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    preferences.onion === option && styles.selectedOptionText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.sectionDivider} />
        
        <View style={styles.preferenceSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Garlic Weight</Text>
            <TouchableOpacity style={styles.infoButton}>
              <Info size={20} color={Colors.dark.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.optionsContainer}>
            {['100 g', '200 g', '500 g'].map((option) => (
              <TouchableOpacity
                key={`garlic-${option}`}
                style={[
                  styles.optionButton,
                  preferences.garlic === option && styles.selectedOption
                ]}
                onPress={() => handlePreferenceChange('garlic', option)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    preferences.garlic === option && styles.selectedOptionText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.sectionDivider} />
        
        <View style={styles.preferenceSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Tomato Quantity</Text>
            <TouchableOpacity style={styles.infoButton}>
              <Info size={20} color={Colors.dark.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.optionsContainer}>
            {['250 g', '500 g', '1 kg', '2 kg'].map((option) => (
              <TouchableOpacity
                key={`tomato-${option}`}
                style={[
                  styles.optionButton,
                  preferences.tomato === option && styles.selectedOption
                ]}
                onPress={() => handlePreferenceChange('tomato', option)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    preferences.tomato === option && styles.selectedOptionText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.sectionDivider} />
        
        <TouchableOpacity style={styles.suggestButton}>
          <PlusCircle size={20} color={Colors.dark.text} />
          <Text style={styles.suggestButtonText}>Suggest more preferences ✨</Text>
        </TouchableOpacity>
        
        <LinearGradient
          colors={[Colors.dark.accent, Colors.dark.accentDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.completeButton}
        >
          <TouchableOpacity 
            style={styles.completeButtonInner}
            onPress={handleComplete}
          >
            <ShoppingCart size={20} color="#000000" />
            <Text style={styles.completeButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
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
    backgroundColor: '#333',
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
  preferenceSection: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 24,
    minWidth: (width - 100) / 4,
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
  sectionDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 20,
  },
  suggestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 8,
    marginBottom: 24,
    gap: 8,
  },
  suggestButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
  },
  completeButton: {
    borderRadius: 30,
    marginBottom: 16,
    overflow: 'hidden',
  },
  completeButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  completeButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GroceryPreferences;