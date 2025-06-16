import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Star, ExternalLink, Award } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

interface HeadphoneComparisonProps {
  onSelectProduct: (product: any) => void;
}

const HeadphoneComparison = ({ onSelectProduct }: HeadphoneComparisonProps) => {
  const headphones = [
    {
      id: 'h1',
      name: 'Sennheiser Accentum Wireless Bluetooth Over Ear Headphones',
      price: 12989,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      store: 'Amazon',
      storeLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      features: [
        'Impressive sound',
        'Exceptional battery life',
        'Noise Cancellation',
      ],
      cons: [
        'Average mic quality'
      ],
      rating: 4.5,
      reviewSources: '7 Reviewed Sources',
      bestValue: true,
    },
    {
      id: 'h2',
      name: 'Sony WH-CH720N Wireless Noise Canceling Headphones',
      price: 8990,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      store: 'Flipkart',
      storeLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      features: [
        'Active Noise Cancellation',
        '35 Hours Battery Life',
        'Quick Charge',
        'Lightweight Design'
      ],
      cons: [
        'Build quality could be better'
      ],
      rating: 4.2,
      reviewSources: '5 Reviewed Sources',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Below are the 2 best recommendation for your purpose and budget.</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={width * 0.9 + 20}
        decelerationRate="fast"
      >
        {headphones.map((product) => (
          <View 
            key={product.id} 
            style={[
              styles.productCard,
              product.bestValue && styles.bestValueCard
            ]}
          >
            {product.bestValue && (
              <LinearGradient
                colors={[Colors.dark.accent, Colors.dark.accentDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bestValueBadge}
              >
                <Award size={16} color="#000000" />
                <Text style={styles.bestValueText}>Best Value</Text>
              </LinearGradient>
            )}
            
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
              
              <View style={styles.reviewContainer}>
                <View style={styles.reviewBadge}>
                  <Text style={styles.reviewText}>{product.reviewSources}</Text>
                </View>
              </View>
              
              {/* Features */}
              <View style={styles.featuresContainer}>
                {product.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Check size={16} color={Colors.dark.accent} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
                
                {/* Cons */}
                {product.cons.map((con, index) => (
                  <View key={`con-${index}`} style={styles.conRow}>
                    <View style={styles.conIcon}>
                      <Text style={styles.conX}>×</Text>
                    </View>
                    <Text style={styles.conText}>{con}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>₹{product.price.toLocaleString()}</Text>
                <View style={styles.storeContainer}>
                  <Image source={{ uri: product.storeLogo }} style={styles.storeLogo} />
                  <Text style={styles.storeName}>{product.store}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.selectButton}
                onPress={() => onSelectProduct(product)}
              >
                <LinearGradient
                  colors={[Colors.dark.accent, Colors.dark.accentDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.selectButtonGradient}
                >
                  <Text style={styles.selectButtonText}>Try It Yourself ✨</Text>
                  <ExternalLink size={16} color="#000000" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 20,
    paddingHorizontal: 16,
    lineHeight: 24,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  productCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    width: width * 0.9,
    marginRight: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  bestValueCard: {
    borderColor: Colors.dark.accent,
    borderWidth: 2,
  },
  bestValueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    gap: 4,
  },
  bestValueText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  reviewContainer: {
    marginBottom: 16,
  },
  reviewBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  reviewText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  conRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  conIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conX: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  conText: {
    fontSize: 14,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.accent,
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storeLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  storeName: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 0,
  },
  selectButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});