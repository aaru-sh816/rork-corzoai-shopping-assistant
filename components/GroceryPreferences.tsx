import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Info, ShoppingCart, Sparkles, Plus, Minus, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface GroceryPreferencesProps {
  query: string;
  onComplete: (preferences: any) => void;
}

const GroceryPreferences = ({ query, onComplete }: GroceryPreferencesProps) => {
  const [preferences, setPreferences] = useState({
    onion: { weight: '250 g', quantity: 1 },
    garlic: { weight: '100 g', quantity: 1 },
    tomato: { weight: '500 g', quantity: 1 },
  });

  const [estimatedTotal, setEstimatedTotal] = useState(61);

  const handlePreferenceChange = (type: string, field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [type]: {
        ...prev[type as keyof typeof prev],
        [field]: value,
      },
    }));
    
    // Update estimated total (simplified calculation)
    const basePrice = type === 'onion' ? 29 : type === 'garlic' ? 18 : 14;
    const weightMultiplier = value.includes('1 kg') ? 4 : value.includes('500 g') ? 2 : 1;
    // This is a simplified calculation - in real app would be more complex
  };

  const handleQuantityChange = (type: string, delta: number) => {
    setPreferences(prev => ({
      ...prev,
      [type]: {
        ...prev[type as keyof typeof prev],
        quantity: Math.max(1, prev[type as keyof typeof prev].quantity + delta),
      },
    }));
  };

  const handleComplete = () => {
    onComplete(preferences);
  };

  const weightOptions = {
    onion: ['250 g', '500 g', '1 kg', '2 kg'],
    garlic: ['100 g', '200 g', '500 g'],
    tomato: ['250 g', '500 g', '1 kg', '2 kg'],
  };

  const getItemPrice = (type: string) => {
    const basePrices = { onion: 29, garlic: 18, tomato: 14 };
    return basePrices[type as keyof typeof basePrices] || 0;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.queryContainer}>
          <Text style={styles.queryText}>{query}</Text>
        </View>
        <View style={styles.divider} />
      </View>
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>Select your preferences</Text>
        <Text style={styles.subheading}>Customize quantities and get the best prices</Text>
      </View>
      
      <ScrollView style={styles.preferencesContainer} showsVerticalScrollIndicator={false}>
        {Object.entries(preferences).map(([type, pref]) => (
          <View key={type} style={styles.preferenceSection}>
            {/* Item Header */}
            <View style={styles.itemHeader}>
              <View style={styles.itemTitleContainer}>
                <Text style={styles.itemTitle}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>₹{getItemPrice(type)}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.infoButton}>
                <Info size={16} color={Colors.dark.accent} />
              </TouchableOpacity>
            </View>
            
            {/* Weight Selection */}
            <View style={styles.weightSection}>
              <Text style={styles.sectionLabel}>Weight</Text>
              <View style={styles.optionsContainer}>
                {weightOptions[type as keyof typeof weightOptions].map((option) => (
                  <TouchableOpacity
                    key={`${type}-${option}`}
                    style={[
                      styles.optionButton,
                      pref.weight === option && styles.selectedOption
                    ]}
                    onPress={() => handlePreferenceChange(type, 'weight', option)}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        pref.weight === option && styles.selectedOptionText
                      ]}
                    >
                      {option}
                    </Text>
                    {pref.weight === option && (
                      <Check size={14} color="#000000" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Quantity Selection */}
            <View style={styles.quantitySection}>
              <Text style={styles.sectionLabel}>Quantity</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={[styles.quantityButton, pref.quantity <= 1 && styles.disabledButton]}
                  onPress={() => handleQuantityChange(type, -1)}
                  disabled={pref.quantity <= 1}
                >
                  <Minus size={16} color={pref.quantity <= 1 ? Colors.dark.secondaryText : Colors.dark.text} />
                </TouchableOpacity>
                <View style={styles.quantityDisplay}>
                  <Text style={styles.quantityText}>{pref.quantity}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(type, 1)}
                >
                  <Plus size={16} color={Colors.dark.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        
        {/* Estimated Total */}
        <View style={styles.totalSection}>
          <LinearGradient
            colors={['rgba(52, 211, 153, 0.1)', 'rgba(52, 211, 153, 0.05)']}
            style={styles.totalContainer}
          >
            <View style={styles.totalHeader}>
              <Text style={styles.totalLabel}>Estimated Total</Text>
              <Text style={styles.totalAmount}>₹{estimatedTotal}</Text>
            </View>
            <Text style={styles.totalSubtext}>Best price on Blinkit • Delivery in 10 mins</Text>
          </LinearGradient>
        </View>
        
        {/* Suggest More Button */}
        <TouchableOpacity style={styles.suggestButton}>
          <LinearGradient
            colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.04)']}
            style={styles.suggestButtonGradient}
          >
            <Sparkles size={20} color={Colors.dark.accent} />
            <Text style={styles.suggestButtonText}>Suggest more items</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <LinearGradient
            colors={[Colors.dark.accent, Colors.dark.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.completeButtonGradient}
          >
            <ShoppingCart size={20} color="#000000" />
            <Text style={styles.completeButtonText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    borderRadius: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  queryContainer: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
  },
  queryText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.accent,
    textAlign: 'center',
  },
  divider: {
    height: 4,
    width: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
    borderRadius: 2,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: Colors.dark.secondaryText,
    textAlign: 'center',
  },
  preferencesContainer: {
    maxHeight: 500,
    paddingHorizontal: 20,
  },
  preferenceSection: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  priceTag: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark.accent,
  },
  infoButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weightSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.secondaryText,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  selectedOption: {
    backgroundColor: Colors.dark.accent,
    borderColor: Colors.dark.accent,
  },
  optionText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#000000',
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 4,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityDisplay: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.accent,
    textAlign: 'center',
  },
  totalSection: {
    marginBottom: 16,
  },
  totalContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.accent,
  },
  totalSubtext: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
  suggestButton: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  suggestButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  suggestButtonText: {
    color: Colors.dark.accent,
    fontSize: 16,
    fontWeight: '500',
  },
  completeButton: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  completeButtonGradient: {
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