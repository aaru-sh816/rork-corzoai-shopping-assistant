import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface CartItemProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
  priceRange?: string;
  onRemove: () => void;
}

const CartItem = ({ name, image, price, quantity, priceRange, onRemove }: CartItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>
          {priceRange || `₹${price.toLocaleString()}`}
        </Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Trash2 size={24} color={Colors.dark.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
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
  price: {
    color: Colors.dark.secondaryText,
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
  },
});

export default CartItem;