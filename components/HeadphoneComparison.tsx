import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, X, Star, ExternalLink, Award, TrendingUp } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

interface HeadphoneComparisonProps {
  onSelectProduct: (product: any) => void;
}

const HeadphoneComparison = ({ onSelectProduct }: HeadphoneComparisonProps) => {
  const headphones = [
    {
      id: 'h1',
      name: 'Sennheiser Accentum Wireless',
      subtitle: 'Bluetooth Over Ear Headphones',
      price: 12989,
      originalPrice: 15990,
      discount: 19,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      store: 'Amazon',
      storeLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      features: [
        'Impressive sound quality',
        'Exceptional 50hr battery life',
        'Hybrid Active Noise Cancellation',
        'Quick Charge: 10min = 5hrs',
      ],
      cons: [
        'Average microphone quality'
      ],
      rating: 4.5,
      reviewCount: 7,
      reviewSources: '7 Reviewed Sources',
      bestValue: true,
      trending: true,
    },
    {
      id: 'h2',
      name: 'Sony WH-CH720N',
      subtitle: 'Wireless Noise Canceling Headphones',
      price: 8990,
      originalPrice: 12990,
      discount: 31,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      store: 'Flipkart',
      storeLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      features: [
        'Active Noise Cancellation',
        '35 Hours Battery Life',
        'Quick Charge: 3min = 1hr',
        'Lightweight Design'
      ],
      cons: [
        'Build quality could be better',
        'Limited bass response'
      ],
      rating: 4.2,
      reviewCount: 5,
      reviewSources: '5 Reviewed Sources',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={12}
        color={index < Math.floor(rating) ? '#FFD700' : '#444'}
        fill={index < Math.floor(rating) ? '#FFD700' : 'transparent'}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Best recommendations for your budget</Text>
        <Text style={styles.subtitle}>Curated from 12+ sources • Updated 2 mins ago</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={width * 0.85 + 16}
        decelerationRate="fast"
      >
        {headphones.map((product, index) => (
          <View 
            key={product.id} 
            style={[
              styles.productCard,
              product.bestValue && styles.bestValueCard
            ]}
          >
            {/* Badges */}
            <View style={styles.badgesContainer}>
              {product.bestValue && (
                <LinearGradient
                  colors={[Colors.dark.accent, Colors.dark.accentDark]}
                  style={styles.bestValueBadge}
                >
                  <Award size={12} color="#000000" />
                  <Text style={styles.badgeText}>Best Value</Text>
                </LinearGradient>
              )}
              {product.trending && (
                <View style={styles.trendingBadge}>
                  <TrendingUp size={12} color="#FF6B6B" />
                  <Text style={styles.trendingText}>Trending</Text>
                </View>
              )}
              {product.discount > 0 && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount}% OFF</Text>
                </View>
              )}
            </View>
            
            {/* Product Image */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
            </View>
            
            <View style={styles.productInfo}>
              {/* Product Name */}
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productSubtitle}>{product.subtitle}</Text>
              
              {/* Rating & Reviews */}
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {renderStars(product.rating)}
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
                <View style={styles.reviewBadge}>
                  <Text style={styles.reviewText}>{product.reviewSources}</Text>
                </View>
              </View>
              
              {/* Features & Cons */}
              <View style={styles.featuresContainer}>
                <View style={styles.prosSection}>
                  {product.features.slice(0, 3).map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <Check size={14} color={Colors.dark.accent} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                {product.cons.length > 0 && (
                  <View style={styles.consSection}>
                    {product.cons.slice(0, 1).map((con, index) => (
                      <View key={index} style={styles.conRow}>
                        <X size={14} color="#FF6B6B" />
                        <Text style={styles.conText}>{con}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              
              {/* Price & Store */}
              <View style={styles.priceSection}>
                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>₹{product.price.toLocaleString()}</Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
                  )}
                </View>
                <View style={styles.storeContainer}>
                  <Image source={{ uri: product.storeLogo }} style={styles.storeLogo} />
                  <Text style={styles.storeName}>{product.store}</Text>
                </View>
              </View>
            </View>
            
            {/* Action Button */}
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => onSelectProduct(product)}
            >
              <LinearGradient
                colors={product.bestValue ? [Colors.dark.accent, Colors.dark.accentDark] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.selectButtonGradient}
              >
                <Text style={[styles.selectButtonText, product.bestValue && styles.bestValueButtonText]}>
                  View Details
                </Text>
                <ExternalLink size={16} color={product.bestValue ? "#000000" : Colors.dark.text} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      {/* Comparison Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Tip: Sennheiser offers better sound quality, Sony provides better value for money
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  productCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    width: width * 0.85,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  bestValueCard: {
    borderColor: Colors.dark.accent,
    borderWidth: 2,
  },
  badgesContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    gap: 6,
  },
  bestValueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '600',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendingText: {
    color: '#FF6B6B',
    fontSize: 11,
    fontWeight: '600',
  },
  discountBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#22C55E',
    fontSize: 11,
    fontWeight: '600',
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  productImage: {
    width: 160,
    height: 120,
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
    marginLeft: 4,
  },
  reviewBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reviewText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 16,
  },
  prosSection: {
    marginBottom: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: Colors.dark.text,
    fontWeight: '500',
    flex: 1,
  },
  consSection: {
    marginTop: 4,
  },
  conRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  conText: {
    fontSize: 13,
    color: Colors.dark.secondaryText,
    fontWeight: '500',
    flex: 1,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.accent,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    textDecorationLine: 'line-through',
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  storeLogo: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  storeName: {
    fontSize: 13,
    color: Colors.dark.secondaryText,
    fontWeight: '500',
  },
  selectButton: {
    margin: 20,
    marginTop: 0,
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
    color: Colors.dark.text,
  },
  bestValueButtonText: {
    color: '#000000',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HeadphoneComparison;