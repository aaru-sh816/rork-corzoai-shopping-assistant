import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ShoppingCart, Star } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  store: string;
  rating: number;
  originalPrice?: number;
}

interface ProductSelectionGridProps {
  products?: Product[];
  title?: string;
  onSelectProduct: (product: Product) => void;
}

const ProductSelectionGrid = ({ 
  products = [], 
  title = "Select a Product",
  onSelectProduct 
}: ProductSelectionGridProps) => {
  // Default products if none provided
  const defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Sony WH-CH720N Wireless Headphones',
      price: 4999,
      originalPrice: 6999,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      store: 'Amazon',
      rating: 4.3
    },
    {
      id: '2',
      name: 'JBL Tune 760NC Wireless Headphones',
      price: 4499,
      originalPrice: 5999,
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop',
      store: 'Flipkart',
      rating: 4.1
    },
    {
      id: '3',
      name: 'Audio-Technica ATH-M40x',
      price: 4800,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop',
      store: 'Croma',
      rating: 4.5
    },
    {
      id: '4',
      name: 'Sennheiser HD 450BT',
      price: 4999,
      originalPrice: 7999,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop',
      store: 'Amazon',
      rating: 4.2
    }
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {displayProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => onSelectProduct(product)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              {product.originalPrice && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              
              <View style={styles.ratingContainer}>
                <Star size={14} color={Colors.dark.accent} fill={Colors.dark.accent} />
                <Text style={styles.rating}>{product.rating}</Text>
              </View>
              
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
                )}
              </View>
              
              <Text style={styles.store}>{product.store}</Text>
              
              <TouchableOpacity style={styles.selectButton}>
                <ShoppingCart size={16} color="#000" />
                <Text style={styles.selectButtonText}>Select</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  productCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    width: 200,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.dark.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.accent,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    textDecorationLine: 'line-through',
  },
  store: {
    fontSize: 12,
    color: Colors.dark.secondaryText,
    marginBottom: 12,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.accent,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  selectButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProductSelectionGrid;