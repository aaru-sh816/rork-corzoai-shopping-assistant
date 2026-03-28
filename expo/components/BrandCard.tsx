import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';

interface BrandCardProps {
  name: string;
  discount: string;
  color: string;
  image: string;
  onPress: () => void;
}

const BrandCard = ({ name, discount, color, image, onPress }: BrandCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.card, { backgroundColor: color }]}>
        <Image source={{ uri: image }} style={styles.logo} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.discount}>{discount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
    marginBottom: 16,
  },
  card: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  name: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  discount: {
    color: Colors.dark.accent,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default BrandCard;