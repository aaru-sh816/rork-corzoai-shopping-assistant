import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, ShoppingCart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import StatusBar from '@/components/StatusBar';
import CartItem from '@/components/CartItem';
import StoreComparison from '@/components/StoreComparison';
import { useAppStore } from '@/store/useAppStore';

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, storeComparisons, removeFromCart, clearCart } = useAppStore();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const handleCheckout = () => {
    // In a real app, this would navigate to checkout
    alert('Checkout functionality would be implemented here');
    // Clear cart after checkout
    clearCart();
    router.push('/');
  };
  
  return (
    <View style={styles.container}>
      <StatusBar />
      
      <Stack.Screen 
        options={{
          title: 'Shopping Cart',
          headerShown: false,
        }}
      />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={{ width: 24 }} />
      </View>
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <ShoppingCart size={64} color={Colors.dark.secondaryText} />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cartContainer}>
              <Text style={styles.cartTitle}>
                Check all the items, feel free to change product or remove the items.
              </Text>
              
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  quantity={item.quantity}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
              
              <View style={styles.storeComparisonContainer}>
                {storeComparisons.map((store, index) => (
                  <StoreComparison
                    key={index}
                    store={store.store}
                    logo={store.logo}
                    total={store.total}
                  />
                ))}
              </View>
              
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Items ({totalItems})</Text>
                  <Text style={styles.summaryValue}>₹{totalAmount.toLocaleString()}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery</Text>
                  <Text style={styles.summaryValue}>₹40.00</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>₹{(totalAmount + 40).toLocaleString()}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  emptyCartText: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 24,
  },
  continueShoppingButton: {
    backgroundColor: Colors.dark.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  continueShoppingButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: '600',
  },
  cartContainer: {
    padding: 16,
  },
  cartTitle: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  storeComparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  summaryContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 100,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: Colors.dark.secondaryText,
    fontSize: 16,
  },
  summaryValue: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: 12,
  },
  totalLabel: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    color: Colors.dark.accent,
    fontSize: 20,
    fontWeight: '700',
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
  checkoutButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: '600',
  },
});