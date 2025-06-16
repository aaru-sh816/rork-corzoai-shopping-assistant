import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, Check, X, ExternalLink, ShoppingCart } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

interface ProductDetailCardProps {
  product: any;
}

const ProductDetailCard = ({ product }: ProductDetailCardProps) => {
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
    { text: 'Hybrid Active Noise Cancellation', positive: true },
    { text: 'Up to 50 hours of battery life', positive: true },
    { text: 'Sennheiser Smart Control app for personalized sound', positive: true },
    { text: 'Lightweight yet durable build', positive: true },
    { text: 'Quick Charge: 10 mins = 5 hours of playback', positive: true },
  ];

  const pros = [
    'Impressive sound',
    'Exceptional battery life',
    'Noise Cancellation',
  ];

  const cons = [
    'Average mic quality',
  ];

  const stores = [
    {
      name: 'Amazon',
      price: 12989,
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Sennheiser',
      price: 12990,
      logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Vijay Sales',
      price: 12990,
      logo: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Flipkart',
      price: 12990,
      logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
  ];

  const sources = [
    { name: 'SoundGuys', review: 'Sennheiser ACCENTUM Wireless...' },
    { name: 'Times of India', review: 'Sennheiser Accentum w...' },
  ];

  return (
    <View style={styles.container}>
      {/* Product Header */}
      <View style={styles.productHeader}>
        <Image 
          source={{ uri: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }} 
          style={styles.productImage} 
        />
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>
          Sennheiser Accentum Wireless Bluetooth Over Ear Headphones
        </Text>
        <Text style={styles.priceRange}>₹12,989 - ₹12,990</Text>
      </View>

      {/* What Sources Say */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Sources Say</Text>
        <Text style={styles.sourcesSummary}>
          Buy this if you want a better sound quality and comfort. Few reviewers found microphone performance an issue.
        </Text>

        <View style={styles.prosConsContainer}>
          <View style={styles.prosContainer}>
            {pros.map((pro, index) => (
              <View key={index} style={styles.proItem}>
                <Check size={16} color={Colors.dark.accent} />
                <Text style={styles.proText}>{pro}</Text>
              </View>
            ))}
          </View>

          <View style={styles.consContainer}>
            {cons.map((con, index) => (
              <View key={index} style={styles.conItem}>
                <X size={16} color="#EF4444" />
                <Text style={styles.conText}>{con}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.prosDescription}>
          The powerful bass and detailed mids make these perfect for music lovers who enjoy immersive audio.
        </Text>

        <Text style={styles.consDescription}>
          Enjoy up to 50 hours of playback on a single charge, ideal for long workdays.
        </Text>
      </View>

      {/* Reviewed Sources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviewed Sources</Text>
        <View style={styles.sourcesContainer}>
          {sources.map((source, index) => (
            <TouchableOpacity key={index} style={styles.sourceCard}>
              <View style={styles.sourceIcon}>
                <Text style={styles.sourceInitial}>{source.name.charAt(0)}</Text>
              </View>
              <View style={styles.sourceInfo}>
                <Text style={styles.sourceName}>{source.name}</Text>
                <Text style={styles.sourceReview}>{source.review}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* About Product */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Product</Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Specs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Features</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.specsContainer}>
          {specs.map((spec, index) => (
            <View key={index} style={styles.specRow}>
              <Text style={styles.specLabel}>{spec.label}</Text>
              <Text style={styles.specValue}>{spec.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Availability at other stores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Availability at other stores</Text>
        {stores.map((store, index) => (
          <View key={index} style={styles.storeCard}>
            <Image source={{ uri: store.logo }} style={styles.storeLogo} />
            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storePrice}>₹{store.price.toLocaleString()}</Text>
            </View>
            <TouchableOpacity style={styles.visitButton}>
              <Text style={styles.visitButtonText}>Visit Store</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Try It Yourself Button */}
      <TouchableOpacity style={styles.tryButton}>
        <LinearGradient
          colors={['rgba(52, 211, 153, 0.1)', 'rgba(52, 211, 153, 0.05)']}
          style={styles.tryButtonGradient}
        >
          <Text style={styles.tryButtonText}>Try It Yourself ✨</Text>
          <ExternalLink size={20} color={Colors.dark.accent} />
        </LinearGradient>
      </TouchableOpacity>
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
  },
  productHeader: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 40,
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  productImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  priceRange: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.accent,
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
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
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  prosContainer: {
    flex: 1,
  },
  consContainer: {
    flex: 1,
  },
  proItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 8,
  },
  proText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
  conItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 8,
  },
  conText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
  prosDescription: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    lineHeight: 20,
    marginBottom: 12,
  },
  consDescription: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    lineHeight: 20,
  },
  sourcesContainer: {
    gap: 12,
  },
  sourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
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
  sourceReview: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activeTab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark.accent,
  },
  activeTabText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  inactiveTab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  inactiveTabText: {
    color: Colors.dark.secondaryText,
    fontSize: 16,
    fontWeight: '500',
  },
  specsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
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
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  specLabel: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
    fontWeight: '500',
  },
  specValue: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '600',
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
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
  storePrice: {
    color: Colors.dark.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  visitButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
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
    color: Colors.dark.accent,
    fontSize: 16,
    fontWeight: '600',
  },
});