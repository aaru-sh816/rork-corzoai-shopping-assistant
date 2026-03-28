import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { brands } from '@/mocks/brands';
import { suggestions } from '@/mocks/suggestions';
import { products } from '@/mocks/products';
import { cartItems, storeComparisons } from '@/mocks/cart';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  store: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface AppState {
  // User
  userName: string;
  balance: string;
  
  // UI
  activeTab: string;
  
  // Data
  brands: typeof brands;
  suggestions: typeof suggestions;
  products: typeof products;
  cartItems: typeof cartItems;
  storeComparisons: typeof storeComparisons;
  messages: Message[];
  
  // Actions
  setActiveTab: (tab: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // User
      userName: 'Aarush',
      balance: '₹0.00',
      
      // UI
      activeTab: 'home',
      
      // Data
      brands,
      suggestions,
      products,
      cartItems,
      storeComparisons,
      messages: [
        {
          id: '1',
          text: 'Hi there! I\'m your CorzoAI shopping assistant. How can I help you today?',
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ],
      
      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      addToCart: (item) => set((state) => {
        const existingItem = state.cartItems.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { cartItems: [...state.cartItems, item] };
      }),
      
      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
      })),
      
      clearCart: () => set({ cartItems: [] }),
      
      addMessage: (message) => set((state) => ({
        messages: [
          ...state.messages,
          {
            id: Date.now().toString(),
            ...message,
            timestamp: new Date().toISOString(),
          },
        ],
      })),
    }),
    {
      name: 'corzo-ai-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);