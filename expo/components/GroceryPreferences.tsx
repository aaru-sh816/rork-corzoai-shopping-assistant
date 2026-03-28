import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Info, ShoppingCart, Sparkles, Plus, Minus, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

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
    <BlurView intensity={20} style={styles.container}>
      <LinearGradient
        colors={Colors.dark.gradientGlass}
        style={styles.containerGradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={Colors.dark.gradientPrimary}
            style={styles.queryContainer}
          >
            <Text style={styles.queryText}>{query}</Text>
          </LinearGradient>
          <View style={styles.divider} />
        </View>
        
        {/* Title */}
        <View style={styles.titleContainer}>
          <LinearGradient
            colors={Colors.dark.gradientPrimary}
            style={styles.titleGradient}
          >
            <Text style={styles.heading}>Select your preferences</Text>
          </LinearGradient>
          <Text style={styles.subheading}>Customize quantities and get the best prices</Text>
        </View>
        
        <ScrollView style={styles.preferencesContainer} showsVerticalScrollIndicator={false}>
          {Object.entries(preferences).map(([type, pref]) => (
            <BlurView key={type} intensity={10} style={styles.preferenceSection}>
              <LinearGradient
                colors={Colors.dark.gradientGlass}
                style={styles.sectionGradient}
              >
                {/* Item Header */}
                <View style={styles.itemHeader}>
                  <View style={styles.itemTitleContainer}>
                    <Text style={styles.itemTitle}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                    <LinearGradient
                      colors={Colors.dark.gradientGreen}
                      style={styles.priceTag}
                    >
                      <Text style={styles.priceText}>₹{getItemPrice(type)}</Text>
                    </LinearGradient>
                  </View>
                  <TouchableOpacity style={styles.infoButton}>
                    <Info size={16} color={Colors.dark.primary} />
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
                        {pref.weight === option ? (
                          <LinearGradient
                            colors={Colors.dark.gradientPrimary}
                            style={styles.selectedOptionGradient}
                          >
                            <Text style={styles.selectedOptionText}>{option}</Text>
                            <Check size={14} color="#000000" style={styles.checkIcon} />
                          </LinearGradient>
                        ) : (
                          <>
                            <Text style={styles.optionText}>{option}</Text>
                          </>
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
                      <Minus size={16} color={pref.quantity <= 1 ? Colors.dark.secondaryText : Colors.dark.foreground} />
                    </TouchableOpacity>
                    <LinearGradient
                      colors={Colors.dark.gradientPrimary}
                      style={styles.quantityDisplay}
                    >
                      <Text style={styles.quantityText}>{pref.quantity}</Text>
                    </LinearGradient>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(type, 1)}
                    >
                      <Plus size={16} color={Colors.dark.foreground} />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </BlurView>
          ))}
          
          {/* Estimated Total */}
          <BlurView intensity={15} style={styles.totalSection}>
            <LinearGradient
              colors={Colors.dark.gradientGreen}
              style={styles.totalContainer}
            >
              <View style={styles.totalHeader}>
                <Text style={styles.totalLabel}>Estimated Total</Text>
                <Text style={styles.totalAmount}>₹{estimatedTotal}</Text>
              </View>
              <Text style={styles.totalSubtext}>Best price on Blinkit • Delivery in 10 mins</Text>
            </LinearGradient>
          </BlurView>
          
          {/* Suggest More Button */}
          <TouchableOpacity style={styles.suggestButton}>
            <BlurView intensity={10} style={styles.suggestButtonBlur}>
              <LinearGradient
                colors={Colors.dark.gradientGlass}
                style={styles.suggestButtonGradient}
              >
                <Sparkles size={20} color={Colors.dark.primary} />
                <Text style={styles.suggestButtonText}>Suggest more items</Text>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
          
          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <LinearGradient
              colors={Colors.dark.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.completeButtonGradient}
            >
              <ShoppingCart size={20} color="#000000" />
              <Text style={styles.completeButtonText}>Add to Cart</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  containerGradient: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  queryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 16,
  },
  queryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  divider: {
    height: 4,
    width: 40,
    backgroundColor: Colors.dark.glassBorder,
    borderRadius: 2,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  titleGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
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
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    borderRadius: 16,
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
    color: Colors.dark.foreground,
  },
  priceTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  infoButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.dark.glass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
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
    backgroundColor: Colors.dark.glass,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    overflow: 'hidden',
  },
  selectedOption: {
    borderColor: Colors.dark.primary,
  },
  selectedOptionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: -16,
    marginVertical: -10,
  },
  optionText: {
    color: Colors.dark.foreground,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
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
    backgroundColor: Colors.dark.glass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityDisplay: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  totalSection: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  totalContainer: {
    padding: 16,
    borderRadius: 16,
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
    color: '#000000',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  totalSubtext: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
  },
  suggestButton: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  suggestButtonBlur: {
    borderRadius: 16,
  },
  suggestButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    borderRadius: 16,
  },
  suggestButtonText: {
    color: Colors.dark.primary,
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