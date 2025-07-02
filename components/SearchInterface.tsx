import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Search, Mic, Camera, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  onSuggestionSelect: (suggestion: string) => void;
}

const SearchInterface = ({ onSearch, onSuggestionSelect }: SearchInterfaceProps) => {
  const [searchText, setSearchText] = useState('');

  const suggestions = [
    "Best wireless headphones under ₹5000",
    "Compare iPhone 15 vs Samsung Galaxy S24",
    "Cheapest grocery delivery near me",
    "Gaming laptop under ₹80000",
    "Air fryer best deals today",
    "Protein powder for muscle gain",
    "Smart TV 55 inch best price",
    "Running shoes for marathon"
  ];

  const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Groceries", icon: "🛒" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Sports", icon: "⚽" },
    { name: "Beauty", icon: "💄" }
  ];

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText.trim());
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    onSuggestionSelect(suggestion);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(52, 211, 153, 0.1)', 'rgba(52, 211, 153, 0.05)']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Sparkles size={20} color={Colors.dark.accent} />
          <Text style={styles.headerTitle}>What are you shopping for?</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          I can help you find products, compare prices, and get the best deals
        </Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.dark.secondaryText} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products, brands, or categories..."
            placeholderTextColor={Colors.dark.secondaryText}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            multiline={false}
          />
          <TouchableOpacity style={styles.voiceButton}>
            <Mic size={18} color={Colors.dark.accent} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={18} color={Colors.dark.accent} />
          </TouchableOpacity>
        </View>

        {searchText.trim() && (
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <LinearGradient
              colors={[Colors.dark.accent, Colors.dark.accentDark]}
              style={styles.searchButtonGradient}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => onSuggestionSelect(`Show me ${category.name.toLowerCase()} products`)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.suggestionsSection}>
        <Text style={styles.sectionTitle}>Popular Searches</Text>
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => onSuggestionSelect("Compare prices for the last product I viewed")}
          >
            <Text style={styles.actionIcon}>🔍</Text>
            <Text style={styles.actionText}>Price Compare</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => onSuggestionSelect("Show me today's best deals")}
          >
            <Text style={styles.actionIcon}>🔥</Text>
            <Text style={styles.actionText}>Hot Deals</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => onSuggestionSelect("Track price for my wishlist items")}
          >
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>Price Tracker</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => onSuggestionSelect("Find coupons and discount codes")}
          >
            <Text style={styles.actionIcon}>🎫</Text>
            <Text style={styles.actionText}>Coupons</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    textAlign: 'center',
    lineHeight: 20,
  },
  searchContainer: {
    padding: 16,
    gap: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.input,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: 16,
    height: 24,
  },
  voiceButton: {
    padding: 4,
  },
  cameraButton: {
    padding: 4,
  },
  searchButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  searchButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: Colors.dark.input,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  suggestionsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: Colors.dark.input,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  suggestionText: {
    fontSize: 14,
    color: Colors.dark.text,
  },
  quickActions: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: Colors.dark.input,
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: Colors.dark.text,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SearchInterface;