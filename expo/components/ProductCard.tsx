import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { ExternalLink } from 'lucide-react-native';

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  store: string;
  onPress: () => void;
}

const ProductCard = ({ name, image, price, store, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{price.toLocaleString()}</Text>
          <Text style={styles.store}>{store}</Text>
        </View>
      </View>
      <ExternalLink size={18} color={Colors.dark.accent} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: Colors.dark.accent,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  store: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
  },
  icon: {
    marginLeft: 8,
  },
});

export default ProductCard;