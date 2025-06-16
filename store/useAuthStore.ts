import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { trpcClient } from '@/lib/trpc';

interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  storedOTP: string;
  error: string | null;
  
  // Actions
  login: (phoneNumber: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      storedOTP: '',
      error: null,

      login: async (phoneNumber: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Try to use the backend API first
          try {
            const result = await trpcClient.auth.login.mutate({ phoneNumber });
            
            if (result.success) {
              // Store OTP for verification (in a real app, this would be sent to the user's phone)
              set({ 
                storedOTP: result.otp || '',
                user: {
                  id: '',
                  phoneNumber: phoneNumber
                },
                isLoading: false
              });
              return;
            }
          } catch (apiError) {
            console.log('Backend API failed, falling back to direct WhatsApp API:', apiError);
          }
          
          // Generate OTP
          const otp = generateOTP();
          
          // Store OTP for verification
          set({ storedOTP: otp });
          
          // Send OTP via WhatsApp
          const response = await axios.post('https://gate.whapi.cloud/messages/text', {
            typing_time: 0,
            to: '91' + phoneNumber,
            body: `Your CorzoAI verification code is: ${otp}`,
          }, {
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Bearer XpYsHbC83eYOnwT3071Q20n7G2Md7Frh'
            }
          });

          if (response.status !== 200) {
            throw new Error('Failed to send OTP');
          }

          // Update user with phone number
          set({
            user: {
              id: '',
              phoneNumber: phoneNumber
            },
            isLoading: false
          });
        } catch (error) {
          console.error('Error sending OTP:', error);
          
          // For demo purposes, still store the OTP even if the API call fails
          const otp = generateOTP();
          set({ 
            storedOTP: otp,
            user: {
              id: '',
              phoneNumber: phoneNumber
            },
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to send OTP. For demo, use OTP: ' + otp
          });
        }
      },

      verifyOTP: async (otp: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Try to use the backend API first
          try {
            const phoneNumber = get().user?.phoneNumber || '';
            const result = await trpcClient.auth.verify.mutate({ 
              phoneNumber, 
              otp 
            });
            
            if (result.success) {
              set({ 
                isAuthenticated: true,
                user: result.user || {
                  id: Date.now().toString(),
                  phoneNumber: phoneNumber,
                },
                storedOTP: '',
                isLoading: false,
              });
              return;
            }
          } catch (apiError) {
            console.log('Backend API failed, falling back to direct verification:', apiError);
          }
          
          const { storedOTP } = get();
          
          if (otp !== storedOTP) {
            throw new Error('Invalid OTP');
          }
          
          set({ 
            isAuthenticated: true,
            user: {
              id: Date.now().toString(),
              phoneNumber: get().user?.phoneNumber || '',
            },
            storedOTP: '',
            isLoading: false,
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to verify OTP' 
          });
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          storedOTP: '',
          error: null,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },
    }),
    {
      name: 'corzo-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);