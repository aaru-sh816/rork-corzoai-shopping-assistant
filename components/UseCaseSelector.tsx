import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Headphones, Briefcase, Music, Plane, Edit3, Zap } from 'lucide-react-native';
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
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      id: 'music-commute',
      title: 'Music while commuting',
      icon: Music,
      description: 'Noise cancellation',
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
    {
      id: 'music-creation',
      title: 'High quality for music creation',
      icon: Headphones,
      description: 'Studio-grade sound',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      id: 'travel',
      title: 'For long journey travel',
      icon: Plane,
      description: 'Comfort & battery life',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      id: 'other',
      title: 'Other- type it out',
      icon: Edit3,
      description: 'Custom requirements',
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Zap size={24} color={Colors.dark.accent} />
        </View>
        <Text style={styles.title}>What's the ideal use case?</Text>
        <Text style={styles.subtitle}>Help us recommend the perfect headphones for you</Text>
      </View>
      
      {/* Use Cases */}
      <View style={styles.useCasesContainer}>
        {useCases.map((useCase) => {
          const IconComponent = useCase.icon;
          const isSelected = selectedUseCase === useCase.id;
          
          return (
            <TouchableOpacity
              key={useCase.id}
              style={[
                styles.useCaseCard,
                { backgroundColor: useCase.bgColor },
                isSelected && styles.selectedCard,
              ]}
              onPress={() => handleSelect(useCase)}
            >
              {isSelected ? (
                <LinearGradient
                  colors={[Colors.dark.accent, Colors.dark.accentDark]}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.iconWrapper}>
                      <IconComponent size={24} color="#000000" />
                    </View>
                    <View style={styles.textContent}>
                      <Text style={[styles.useCaseTitle, styles.selectedTitle]}>
                        {useCase.title}
                      </Text>
                      <Text style={[styles.useCaseDescription, styles.selectedDescription]}>
                        {useCase.description}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              ) : (
                <View style={styles.cardContent}>
                  <View style={[styles.iconWrapper, { backgroundColor: useCase.color + '20' }]}>
                    <IconComponent size={24} color={useCase.color} />
                  </View>
                  <View style={styles.textContent}>
                    <Text style={styles.useCaseTitle}>{useCase.title}</Text>
                    <Text style={styles.useCaseDescription}>{useCase.description}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Your selection helps us find headphones with the right features for your needs
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    borderRadius: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.secondaryText,
    textAlign: 'center',
  },
  useCasesContainer: {
    padding: 20,
    gap: 12,
  },
  useCaseCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  selectedCard: {
    borderColor: Colors.dark.accent,
    borderWidth: 2,
  },
  cardGradient: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  useCaseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  selectedTitle: {
    color: '#000000',
  },
  useCaseDescription: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
  selectedDescription: {
    color: 'rgba(0,0,0,0.7)',
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
  footerText: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default UseCaseSelector;