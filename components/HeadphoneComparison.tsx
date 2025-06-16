import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Star, ExternalLink } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

interface HeadphoneComparisonProps {
  onSelectProduct: (product: any) => void;
}

const HeadphoneComparison = ({ onSelectProduct }: HeadphoneComparisonProps) => {
  const headphones = [
    {
      id: 'h1',
      name: 'JBL Tune 510BT Wireless On-Ear Headphones',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      store: 'Amazon',
      storeLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      features: [
        'Up to 40 Hours Battery Life',
        'Pure Bass Sound',
        'Multi-Point Connection',
        'Voice Assistant Compatible'
      ],
      rating: 4.3,
      bestValue: true,
    },
    {
      id: 'h2',
      name: 'boAt Rockerz 450 Bluetooth On-Ear Headphones',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      store: 'Flipkart',
      storeLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      features: [
        'Up to 15 Hours Playback',
        'Padded Ear Cushions',
        'Integrated Controls',
        'Foldable Design'
      ],
      rating: 4.1,
    },
    {
      id: 'h3',
      name: 'Noise Buds VS104 Truly Wireless Earbuds',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      store: 'Myntra',
      storeLogo: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      features: [
        'Up to 30 Hours Playtime',
        'Environmental Noise Cancellation',
        'Low Latency Gaming Mode',
        'IPX5 Water Resistance'
      ],
      rating: 4.0,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Headphones Under ₹5,000</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={width * 0.85 + 20}
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
                <Text style={styles.bestValueText}>Best Value</Text>
              </LinearGradient>
            )}
            
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
              
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={`star-${i}`}
                      size={16}
                      color={i < Math.floor(product.rating) ? Colors.dark.accent : '#444'}
                      fill={i < Math.floor(product.rating) ? Colors.dark.accent : 'none'}
                    />
                  ))}
                </View>
                <Text style={styles.ratingText}>{product.rating}</Text>
              </View>
              
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
                  <Text style={styles.selectButtonText}>Select Product</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
                <ExternalLink size={16} color={Colors.dark.text} />
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
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  productCard: {
    backgroundColor: '#121212',
    borderRadius: 16,
    width: width * 0.85,
    marginRight: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  bestValueCard: {
    borderColor: Colors.dark.accent,
    borderWidth: 2,
  },
  bestValueBadge: {
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
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 24,
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
    marginBottom: 20,
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
  selectButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  selectButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
  },
});

export default HeadphoneComparison;