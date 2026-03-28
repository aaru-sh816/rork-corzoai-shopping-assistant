import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/colors';
import StatusBar from '@/components/StatusBar';
import SearchBar from '@/components/SearchBar';
import SuggestionChips from '@/components/SuggestionChips';
import ProductCard from '@/components/ProductCard';
import { useAppStore } from '@/store/useAppStore';
import { generateAIResponse } from '@/utils/aiService';

export default function SearchScreen() {
  const router = useRouter();
  const { suggestions, products, addMessage, setActiveTab } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(products);

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    setIsSearching(true);
    
    // In a real app, this would search for products
    // For now, we'll just filter the mock products
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase()) ||
      product.category.toLowerCase().includes(text.toLowerCase())
    );
    
    // Generate AI response
    const aiResponse = await generateAIResponse(text);
    
    // Add messages to chat
    addMessage({ text, isUser: true });
    addMessage({ text: aiResponse, isUser: false });
    
    setSearchResults(filtered.length > 0 ? filtered : products);
    setIsSearching(false);
  };

  const handleSuggestionSelect = (suggestion: { id: string; text: string }) => {
    handleSearch(suggestion.text);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const navigateToChat = () => {
    setActiveTab('chat');
    router.push('/chat');
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <SearchBar 
        placeholder="Search for products, brands, or stores" 
        onSearch={handleSearch} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {!searchQuery ? (
          <>
            <Text style={styles.sectionTitle}>Try Asking</Text>
            <SuggestionChips 
              suggestions={suggestions} 
              onSelect={handleSuggestionSelect} 
            />
          </>
        ) : isSearching ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>
                Results for "{searchQuery}"
              </Text>
              <TouchableOpacity onPress={navigateToChat}>
                <Text style={styles.askAiButton}>Ask AI</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.resultsContainer}>
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.prices[0].price}
                  store={product.prices[0].store}
                  onPress={() => handleProductPress(product.id)}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  loadingText: {
    color: Colors.dark.secondaryText,
    fontSize: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  askAiButton: {
    color: Colors.dark.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
});