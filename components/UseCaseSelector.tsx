import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Headphones, Briefcase, Music, Mic, Plane, Edit3 } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

interface UseCaseSelectorProps {
  onSelectUseCase: (useCase: string) => void;
}

const UseCaseSelector = ({ onSelectUseCase }: UseCaseSelectorProps) => {
  const [selectedUseCase, setSelectedUseCase] = useState<string>('');

  const useCases = [
    {
      id: 'work',
      title: 'Work Calls',
      icon: Briefcase,
      description: 'Clear audio for meetings',
    },
    {
      id: 'music-commute',
      title: 'Music while commuting',
      icon: Music,
      description: 'Noise cancellation',
    },
    {
      id: 'music-creation',
      title: 'High quality for music creation',
      icon: Headphones,
      description: 'Studio-grade sound',
    },
    {
      id: 'travel',
      title: 'For long journey travel',
      icon: Plane,
      description: 'Comfort & battery life',
    },
    {
      id: 'other',
      title: 'Other- type it out',
      icon: Edit3,
      description: 'Custom requirements',
    },
  ];

  const handleSelect = (useCase: any) => {
    setSelectedUseCase(useCase.id);
    setTimeout(() => {
      onSelectUseCase(useCase.title);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's the ideal use case?</Text>
      
      <View style={styles.useCasesContainer}>
        {useCases.map((useCase) => {
          const IconComponent = useCase.icon;
          const isSelected = selectedUseCase === useCase.id;
          
          return (
            <TouchableOpacity
              key={useCase.id}
              style={[
                styles.useCaseCard,
                isSelected && styles.selectedCard,
              ]}
              onPress={() => handleSelect(useCase)}
            >
              {isSelected ? (
                <LinearGradient
                  colors={[Colors.dark.accent, Colors.dark.accentDark]}
                  style={styles.cardGradient}
                >
                  <IconComponent size={24} color="#000000" />
                  <Text style={[styles.useCaseTitle, styles.selectedTitle]}>
                    {useCase.title}
                  </Text>
                  <Text style={[styles.useCaseDescription, styles.selectedDescription]}>
                    {useCase.description}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.cardContent}>
                  <IconComponent size={24} color={Colors.dark.text} />
                  <Text style={styles.useCaseTitle}>{useCase.title}</Text>
                  <Text style={styles.useCaseDescription}>{useCase.description}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  useCasesContainer: {
    gap: 12,
  },
  useCaseCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedCard: {
    borderColor: Colors.dark.accent,
    borderWidth: 2,
  },
  cardGradient: {
    padding: 20,
    alignItems: 'center',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  useCaseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  selectedTitle: {
    color: '#000000',
  },
  useCaseDescription: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    textAlign: 'center',
  },
  selectedDescription: {
    color: 'rgba(0,0,0,0.7)',
  },
});