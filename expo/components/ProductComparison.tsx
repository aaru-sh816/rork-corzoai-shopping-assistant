import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ExternalLink, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  store: string;
  storeLogo: string;
  features: string[];
  rating: number;
  bestValue?: boolean;
}

interface ProductComparisonProps {
  products: Product[];
  title: string;
  onSelectProduct: (product: Product) => void;
}

const ProductComparison = ({ products, title, onSelectProduct }: ProductComparisonProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
        {products.map((product) => (
          <TouchableOpacity 
            key={product.id} 
            style={[styles.productCard, product.bestValue && styles.bestValueCard]}
            onPress={() => onSelectProduct(product)}
          >
            {product.bestValue && (
              <View style={styles.bestValueBadge}>
                <Text style={styles.bestValueText}>Best Value</Text>
              </View>
            )}
            
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
              
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>₹{product.price.toLocaleString()}</Text>
                <View style={styles.storeContainer}>
                  <Image source={{ uri: product.storeLogo }} style={styles.storeLogo} />
                  <Text style={styles.storeName}>{product.store}</Text>
                </View>
              </View>
              
              <View style={styles.featuresContainer}>
                {product.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Check size={16} color={Colors.dark.accent} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
                <ExternalLink size={16} color={Colors.dark.text} />
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
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  productsScroll: {
    paddingLeft: 16,
  },
  productCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    width: 280,
    marginRight: 16,
    overflow: 'hidden',
  },
  bestValueCard: {
    borderColor: Colors.dark.accent,
    borderWidth: 2,
  },
  bestValueBadge: {
    backgroundColor: Colors.dark.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  bestValueText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.accent,
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 4,
  },
  storeName: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.dark.text,
    marginLeft: 8,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.input,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
  },
});

export default ProductComparison;