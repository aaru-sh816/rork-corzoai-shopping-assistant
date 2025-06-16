import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { ShoppingCart, Search, HelpCircle } from 'lucide-react-native';

interface ActionCardProps {
  type: 'cart' | 'suggestion' | 'help';
  title: string;
  onPress: () => void;
}

const ActionCard = ({ type, title, onPress }: ActionCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'cart':
        return <ShoppingCart size={24} color="#F59E0B" />;
      case 'suggestion':
        return <Search size={24} color="#3B82F6" />;
      case 'help':
        return <HelpCircle size={24} color="#10B981" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'cart':
        return 'rgba(245, 158, 11, 0.1)';
      case 'suggestion':
        return 'rgba(59, 130, 246, 0.1)';
      case 'help':
        return 'rgba(16, 185, 129, 0.1)';
      default:
        return Colors.dark.card;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: Colors.dark.card }]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: getBackgroundColor() }]}>
        {getIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    aspectRatio: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ActionCard;