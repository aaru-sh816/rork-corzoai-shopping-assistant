import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import StatusBar from '@/components/StatusBar';
import UserHeader from '@/components/UserHeader';
import SearchBar from '@/components/SearchBar';
import BrandCard from '@/components/BrandCard';
import ActionCard from '@/components/ActionCard';
import { useAppStore } from '@/store/useAppStore';

export default function HomeScreen() {
  const router = useRouter();
  const { userName, balance, brands, setActiveTab } = useAppStore();

  const handleSearch = (text: string) => {
    // In a real app, this would navigate to search results
    setActiveTab('search');
    router.push('/search');
  };

  const handleBrandPress = (brandId: string) => {
    // In a real app, this would navigate to brand page
    router.push(`/brand/${brandId}`);
  };

  const handleActionPress = (action: string) => {
    switch (action) {
      case 'cart':
        router.push('/cart');
        break;
      case 'suggestion':
        setActiveTab('search');
        router.push('/search');
        break;
      case 'chat':
        setActiveTab('chat');
        router.push('/chat');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <UserHeader name={userName} balance={balance} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Ask your shopping assistant!</Text>
        
        <SearchBar 
          placeholder="Best chemical free protein bar" 
          onSearch={handleSearch} 
        />
        
        <View style={styles.actionsContainer}>
          <ActionCard 
            type="cart" 
            title="Grocery cart & comparison" 
            onPress={() => handleActionPress('cart')} 
          />
          <ActionCard 
            type="suggestion" 
            title="Find a better suggestion" 
            onPress={() => handleActionPress('suggestion')} 
          />
          <ActionCard 
            type="help" 
            title="Ask anything about products" 
            onPress={() => handleActionPress('chat')} 
          />
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Discount on 300+ Brands</Text>
        </View>
        
        <FlatList
          data={brands}
          renderItem={({ item }) => (
            <BrandCard
              name={item.name}
              discount={item.discount}
              color={item.color}
              image={item.image}
              onPress={() => handleBrandPress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal={false}
          numColumns={4}
          contentContainerStyle={styles.brandsContainer}
          scrollEnabled={false}
        />
        
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>Explore 300+ Brands</Text>
          <ArrowRight size={18} color={Colors.dark.text} />
        </TouchableOpacity>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Play and Win Everyday!</Text>
        </View>
        
        <View style={styles.promotionsContainer}>
          <TouchableOpacity style={[styles.promotionCard, { backgroundColor: '#FF3F6C' }]}>
            <Text style={styles.promotionTitle}>Play & Win Cash</Text>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Play</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.promotionCard, { backgroundColor: '#8863F1' }]}>
            <Text style={styles.promotionTitle}>Invite friends & earn cash.</Text>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Invite & Earn</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>ABOUT US</Text>
          <Text style={styles.aboutText}>
            CorzoAI is on a mission to provide you most informed and fast shopping experience.
          </Text>
          <Text style={styles.madeWithLove}>Made with ♥ in India</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  brandsContainer: {
    paddingHorizontal: 16,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.card,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 24,
    gap: 8,
  },
  exploreButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  promotionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  promotionCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
  },
  promotionTitle: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  promotionButton: {
    backgroundColor: Colors.dark.text,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  promotionButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: '600',
  },
  aboutContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 40,
  },
  aboutTitle: {
    color: Colors.dark.accent,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutText: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  madeWithLove: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
  },
});