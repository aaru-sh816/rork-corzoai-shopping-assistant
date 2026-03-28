import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, Check, X, ExternalLink, ShoppingCart, Award, TrendingUp } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

interface ProductDetailCardProps {
  product: any;
}

const ProductDetailCard = ({ product }: ProductDetailCardProps) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'features'>('specs');

  const specs = [
    { label: 'Playback Time', value: '50 Hrs Playback' },
    { label: 'Model', value: 'ACCENTUM Wireless' },
    { label: 'Brand Warranty', value: '2 Years' },
    { label: 'Driver Size', value: '37 mm' },
    { label: 'Bluetooth Range', value: '15 m' },
    { label: 'Bluetooth Version', value: 'v5.0' },
    { label: 'Charging Time', value: '3 hours' },
    { label: 'Frequency Response', value: '5 Hz – 21 kHz' },
    { label: 'Type', value: 'Wireless Headphones' },
  ];

  const features = [
    'Hybrid Active Noise Cancellation',
    'Up to 50 hours of battery life',
    'Sennheiser Smart Control app for personalized sound',
    'Lightweight yet durable build',
    'Quick Charge: 10 mins = 5 hours of playback',
  ];

  const pros = [
    { text: 'Impressive sound', description: 'The powerful bass and detailed mids make these perfect for music lovers who enjoy immersive audio.' },
    { text: 'Exceptional battery life', description: 'Enjoy up to 50 hours of playback on a single charge, ideal for long workdays.' },
    { text: 'Noise Cancellation', description: 'Hybrid ANC effectively blocks ambient noise for focused listening.' },
  ];

  const cons = [
    { text: 'Average mic quality', description: 'Call quality could be better for professional meetings.' },
  ];

  const stores = [
    {
      name: 'Amazon',
      price: 12989,
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      delivery: 'Free delivery',
      rating: 4.5,
    },
    {
      name: 'Sennheiser',
      price: 12990,
      logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      delivery: '2-3 days',
      rating: 4.8,
    },
    {
      name: 'Vijay Sales',
      price: 12990,
      logo: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      delivery: 'Same day',
      rating: 4.3,
    },
    {
      name: 'Flipkart',
      price: 12990,
      logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      delivery: 'Next day',
      rating: 4.4,
    },
  ];

  const sources = [
    { 
      name: 'SoundGuys', 
      review: 'Sennheiser ACCENTUM Wireless delivers impressive audio quality with excellent battery life.',
      rating: 4.5,
      icon: 'S'
    },
    { 
      name: 'Times of India', 
      review: 'Sennheiser Accentum wireless headphones offer great value for money with premium features.',
      rating: 4.3,
      icon: 'T'
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
      {/* Product Header */}
      <View style={styles.productHeader}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA']}
          style={styles.imageBackground}
        >
          <View style={styles.badgesContainer}>
            <View style={styles.bestValueBadge}>
              <Award size={12} color="#000000" />
              <Text style={styles.badgeText}>Best Value</Text>
            </View>
            <View style={styles.trendingBadge}>
              <TrendingUp size={12} color="#FF6B6B" />
              <Text style={styles.trendingText}>Trending</Text>
            </View>
          </View>
          <Image 
            source={{ uri: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }} 
            style={styles.productImage} 
          />
        </LinearGradient>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>
            Sennheiser Accentum Wireless Bluetooth Over Ear Headphones
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceRange}>₹12,989 - ₹12,990</Text>
            <View style={styles.savingsTag}>
              <Text style={styles.savingsText}>Save ₹3,001</Text>
            </View>
          </View>
        </View>

        {/* What Sources Say */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Sources Say</Text>
          <Text style={styles.sourcesSummary}>
            Buy this if you want better sound quality and comfort. Few reviewers found microphone performance an issue.
          </Text>

          <View style={styles.prosConsContainer}>
            <View style={styles.prosContainer}>
              {pros.map((pro, index) => (
                <View key={index} style={styles.proItem}>
                  <View style={styles.proHeader}>
                    <Check size={16} color={Colors.dark.accent} />
                    <Text style={styles.proTitle}>{pro.text}</Text>
                  </View>
                  <Text style={styles.proDescription}>{pro.description}</Text>
                </View>
              ))}
            </View>

            <View style={styles.consContainer}>
              {cons.map((con, index) => (
                <View key={index} style={styles.conItem}>
                  <View style={styles.conHeader}>
                    <X size={16} color="#FF6B6B" />
                    <Text style={styles.conTitle}>{con.text}</Text>
                  </View>
                  <Text style={styles.conDescription}>{con.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Reviewed Sources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviewed Sources</Text>
          <View style={styles.sourcesContainer}>
            {sources.map((source, index) => (
              <TouchableOpacity key={index} style={styles.sourceCard}>
                <View style={styles.sourceHeader}>
                  <View style={styles.sourceIcon}>
                    <Text style={styles.sourceInitial}>{source.icon}</Text>
                  </View>
                  <View style={styles.sourceInfo}>
                    <Text style={styles.sourceName}>{source.name}</Text>
                    <View style={styles.sourceRating}>
                      {renderStars(source.rating)}
                      <Text style={styles.ratingText}>{source.rating}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.sourceReview}>{source.review}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Product */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Product</Text>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'specs' && styles.activeTab]}
              onPress={() => setActiveTab('specs')}
            >
              <Text style={[styles.tabText, activeTab === 'specs' && styles.activeTabText]}>
                Specs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'features' && styles.activeTab]}
              onPress={() => setActiveTab('features')}
            >
              <Text style={[styles.tabText, activeTab === 'features' && styles.activeTabText]}>
                Features
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'specs' ? (
            <View style={styles.specsContainer}>
              {specs.map((spec, index) => (
                <View key={index} style={styles.specRow}>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.featuresContainer}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color={Colors.dark.accent} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Availability at other stores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability at other stores</Text>
          {stores.map((store, index) => (
            <View key={index} style={styles.storeCard}>
              <View style={styles.storeHeader}>
                <Image source={{ uri: store.logo }} style={styles.storeLogo} />
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <View style={styles.storeRating}>
                    {renderStars(store.rating)}
                    <Text style={styles.storeRatingText}>{store.rating}</Text>
                  </View>
                </View>
                <View style={styles.storePricing}>
                  <Text style={styles.storePrice}>₹{store.price.toLocaleString()}</Text>
                  <Text style={styles.storeDelivery}>{store.delivery}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.visitButton}>
                <Text style={styles.visitButtonText}>Visit Store</Text>
                <ExternalLink size={16} color={Colors.dark.text} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Try It Yourself Button */}
        <TouchableOpacity style={styles.tryButton}>
          <LinearGradient
            colors={[Colors.dark.accent, Colors.dark.accentDark]}
            style={styles.tryButtonGradient}
          >
            <Text style={styles.tryButtonText}>Try It Yourself ✨</Text>
            <ExternalLink size={20} color="#000000" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    borderRadius: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    maxHeight: 600,
  },
  productHeader: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  imageBackground: {
    paddingVertical: 32,
    alignItems: 'center',
    position: 'relative',
  },
  badgesContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    gap: 8,
    zIndex: 1,
  },
  bestValueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.accent,
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
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  productImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  scrollContainer: {
    flex: 1,
  },
  productInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 12,
    lineHeight: 26,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRange: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.accent,
  },
  savingsTag: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  sourcesSummary: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
    marginBottom: 20,
  },
  prosConsContainer: {
    gap: 16,
  },
  prosContainer: {
    gap: 12,
  },
  consContainer: {
    gap: 12,
  },
  proItem: {
    backgroundColor: 'rgba(52, 211, 153, 0.08)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.accent,
  },
  proHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  proTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  proDescription: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    lineHeight: 20,
  },
  conItem: {
    backgroundColor: 'rgba(255, 107, 107, 0.08)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  conHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  conTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  conDescription: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    lineHeight: 20,
  },
  sourcesContainer: {
    gap: 12,
  },
  sourceCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  sourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceInitial: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  sourceInfo: {
    flex: 1,
  },
  sourceName: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sourceRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: Colors.dark.secondaryText,
    fontSize: 12,
    fontWeight: '500',
  },
  sourceReview: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.dark.accent,
  },
  tabText: {
    color: Colors.dark.secondaryText,
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },
  specsContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  specLabel: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  specValue: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  featureText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  storeCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  storeLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  storeRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeRatingText: {
    color: Colors.dark.secondaryText,
    fontSize: 12,
    fontWeight: '500',
  },
  storePricing: {
    alignItems: 'flex-end',
  },
  storePrice: {
    color: Colors.dark.accent,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  storeDelivery: {
    color: Colors.dark.secondaryText,
    fontSize: 12,
  },
  visitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  visitButtonText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '600',
  },
  tryButton: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  tryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailCard;