import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '@/constants/colors';

interface StoreComparisonProps {
  store: string;
  logo: string;
  total: number;
}

const StoreComparison = ({ store, logo, total }: StoreComparisonProps) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: logo }} 
        style={styles.logo} 
      />
      <Text style={styles.store}>{store}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.approxText}>Approx Amount</Text>
        <Text style={styles.total}>~₹{total.toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  store: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  priceContainer: {
    alignItems: 'center',
  },
  approxText: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
    marginBottom: 4,
  },
  total: {
    color: Colors.dark.accent,
    fontSize: 24,
    fontWeight: '700',
  },
});

export default StoreComparison;