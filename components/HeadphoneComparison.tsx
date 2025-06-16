import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProductComparison from './ProductComparison';

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
      <ProductComparison 
        products={headphones} 
        title="Best Headphones Under ₹5,000"
        onSelectProduct={onSelectProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});

export default HeadphoneComparison;