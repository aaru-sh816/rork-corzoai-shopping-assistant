import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import StatusBar from '@/components/StatusBar';
import PriceComparisonCard from '@/components/PriceComparisonCard';
import { useAppStore } from '@/store/useAppStore';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { products, addToCart } = useAppStore();
  
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Product not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.prices[0].price,
      quantity: 1,
      store: product.prices[0].store,
    });
    
    // Show success message or navigate to cart
    router.push('/cart');
  };
  
  const handleVisitStore = (store: string) => {
    // In a real app, this would open the store's website
    console.log(`Visiting ${store}`);
  };
  
  const lowestPrice = Math.min(...product.prices.map((p) => p.price));
  const highestPrice = Math.max(...product.prices.map((p) => p.price));
  const savings = highestPrice - lowestPrice;

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <Stack.Screen 
        options={{
          title: product.name,
          headerShown: false,
        }}
      />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thread</Text>
        <TouchableOpacity>
          <Heart size={24} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productHeader}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>₹{product.prices[0].price.toLocaleString()}</Text>
            <View style={styles.storeInfo}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }} 
                style={styles.storeLogo} 
              />
              <Text style={styles.storeName}>{product.prices[0].store}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.compareButton}>
          <Text style={styles.compareButtonText}>Compare prices across stores</Text>
        </TouchableOpacity>
        
        <View style={styles.savingsContainer}>
          <Text style={styles.savingsText}>Save ₹{savings.toLocaleString()} at another store</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Here are the prices at other stores:</Text>
        
        {product.prices.map((price, index) => (
          <PriceComparisonCard
            key={index}
            productName={product.name}
            productImage={product.image}
            store={price.store}
            storeLogo={price.logo}
            price={price.price}
            onVisitStore={() => handleVisitStore(price.store)}
          />
        ))}
        
        <TouchableOpacity style={styles.tryItButton}>
          <Text style={styles.tryItButtonText}>Try it yourself✨</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="#000000" />
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
  },
  notFoundText: {
    color: Colors.dark.text,
    fontSize: 18,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: Colors.dark.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  productHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    margin: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  productPrice: {
    color: Colors.dark.accent,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  storeName: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
  },
  compareButton: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  compareButtonText: {
    color: Colors.dark.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  savingsContainer: {
    backgroundColor: Colors.dark.success,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  savingsText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  tryItButton: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tryItButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  addToCartButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  addToCartButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: '600',
  },
});