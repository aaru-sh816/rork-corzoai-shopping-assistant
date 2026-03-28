import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';

interface PriceComparisonCardProps {
  productName: string;
  productImage: string;
  store: string;
  storeLogo: string;
  price: number;
  onVisitStore: () => void;
}

const PriceComparisonCard = ({ 
  productName, 
  productImage, 
  store, 
  storeLogo, 
  price, 
  onVisitStore 
}: PriceComparisonCardProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: productImage }} style={styles.productImage} />
      <View style={styles.content}>
        <Text style={styles.productName} numberOfLines={2}>{productName}</Text>
        <Text style={styles.price}>₹{price.toLocaleString()}</Text>
      </View>
      <View style={styles.storeContainer}>
        <View style={styles.storeInfo}>
          <Image 
            source={{ uri: storeLogo.startsWith('http') ? storeLogo : 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }} 
            style={styles.storeLogo} 
          />
          <Text style={styles.storeName}>{store}</Text>
        </View>
        <TouchableOpacity style={styles.visitButton} onPress={onVisitStore}>
          <Text style={styles.visitButtonText}>Visit Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    marginBottom: 16,
  },
  productName: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  price: {
    color: Colors.dark.accent,
    fontSize: 20,
    fontWeight: '600',
  },
  storeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    paddingTop: 12,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  storeName: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
    fontWeight: '500',
  },
  visitButton: {
    backgroundColor: Colors.dark.input,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  visitButtonText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PriceComparisonCard;