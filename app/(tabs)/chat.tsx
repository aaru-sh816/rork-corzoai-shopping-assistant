import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Animated,
  Easing,
  Dimensions,
  StatusBar as RNStatusBar
} from 'react-native';
import { ArrowLeft, Send, Plus, Sparkles, Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import StatusBar from '@/components/StatusBar';
import ChatMessage from '@/components/ChatMessage';
import AIGlow from '@/components/AIGlow';
import VoiceButton from '@/components/VoiceButton';
import GroceryPreferences from '@/components/GroceryPreferences';
import HeadphoneComparison from '@/components/HeadphoneComparison';
import ProductDetailCard from '@/components/ProductDetailCard';
import UseCaseSelector from '@/components/UseCaseSelector';
import { useAppStore } from '@/store/useAppStore';
import { generateAIResponse } from '@/utils/aiService';
import { startVoiceRecognition, stopVoiceRecognition, textToSpeech } from '@/utils/voiceService';

const { width, height } = Dimensions.get('window');

export default function ChatScreen() {
  const router = useRouter();
  const { messages, addMessage } = useAppStore();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showGlow, setShowGlow] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showHeadphoneComparison, setShowHeadphoneComparison] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showUseCaseSelector, setShowUseCaseSelector] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [responseData, setResponseData] = useState<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, showPreferences, showHeadphoneComparison, showProductDetail, showUseCaseSelector]);

  useEffect(() => {
    // Enhanced pulse animation for AI thinking
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(pulseAnim, {
              toValue: 1.3,
              duration: 1200,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(glowOpacity, {
              toValue: 1,
              duration: 1200,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(pulseAnim, {
              toValue: 0.9,
              duration: 1200,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0.6,
              duration: 1200,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    } else {
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isLoading]);

  const handleSend = async () => {
    if (inputText.trim() === '') return;
    
    const userMessage = inputText.trim();
    setInputText('');
    addMessage({ text: userMessage, isUser: true });
    
    await processUserInput(userMessage);
  };

  const processUserInput = async (userMessage: string) => {
    setIsLoading(true);
    setShowGlow(true);
    setResponseData(null);
    
    // Reset all UI states
    setShowPreferences(false);
    setShowHeadphoneComparison(false);
    setShowProductDetail(false);
    setShowUseCaseSelector(false);
    
    const lowerMessage = userMessage.toLowerCase();
    
    try {
      // Call the n8n webhook
      const response = await generateAIResponse(userMessage);
      
      // Handle different types of responses
      if (response.data) {
        setResponseData(response.data);
        
        // Check for grocery items
        if (response.data.groceryItems || 
            (lowerMessage.includes('grocery') || lowerMessage.includes('onion') || 
             lowerMessage.includes('tomato') || lowerMessage.includes('garlic')) &&
            (lowerMessage.includes('order') || lowerMessage.includes('buy'))) {
          setCurrentQuery(userMessage);
          setShowPreferences(true);
          addMessage({ text: "I'll help you order groceries! Let me show you some customization options.", isUser: false });
          setIsLoading(false);
          return;
        }
        
        // Check for headphone comparison
        if (response.data.products || 
            (lowerMessage.includes('headphone') && 
             (lowerMessage.includes('compare') || lowerMessage.includes('under') || lowerMessage.includes('best')))) {
          setShowHeadphoneComparison(true);
          addMessage({ text: response.text, isUser: false });
          setIsLoading(false);
          return;
        }
        
        // Check for use case selection (headphones with budget)
        if (lowerMessage.includes('headphone') && lowerMessage.includes('10k')) {
          setShowUseCaseSelector(true);
          addMessage({ text: "What's your ideal use case for these headphones?", isUser: false });
          setIsLoading(false);
          return;
        }
      }
      
      // Default response
      addMessage({ text: response.text, isUser: false });
      
      // Speak the response using text-to-speech
      if (Platform.OS !== 'web') {
        await textToSpeech(response.text);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      addMessage({ 
        text: "I'm experiencing some technical difficulties. Let me try to help you anyway! What are you looking for?", 
        isUser: false 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartRecording = async () => {
    try {
      const result = await startVoiceRecognition();
      setIsListening(result.isListening);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      const result = await stopVoiceRecognition();
      setIsListening(result.isListening);
      
      if (result.text) {
        setInputText(result.text);
        addMessage({ text: result.text, isUser: true });
        await processUserInput(result.text);
      }
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const handlePreferencesComplete = (preferences: any) => {
    setShowPreferences(false);
    
    const preferencesText = `Selected preferences:
• Onion: ${preferences.onion}
• Garlic: ${preferences.garlic}  
• Tomato: ${preferences.tomato}`;
    
    addMessage({ text: preferencesText, isUser: true });
    
    const responseText = `Perfect! I've added these items to your cart:
• ${preferences.onion} Onions - ₹29
• ${preferences.garlic} Garlic - ₹18
• ${preferences.tomato} Tomatoes - ₹14

Total: ₹61 (Best price on Blinkit)
Delivery in 10 minutes! 🚀

Would you like to checkout now?`;
    
    addMessage({ text: responseText, isUser: false });
  };

  const handleProductSelect = (product: any) => {
    setShowHeadphoneComparison(false);
    setShowProductDetail(true);
    setResponseData({ selectedProduct: product });
    
    const productText = `I'm interested in the ${product.name}`;
    addMessage({ text: productText, isUser: true });
    
    const responseText = `Excellent choice! The ${product.name} is a fantastic option. Let me show you detailed information and where to get the best price.`;
    addMessage({ text: responseText, isUser: false });
  };

  const handleUseCaseSelect = (useCase: string) => {
    setShowUseCaseSelector(false);
    
    addMessage({ text: useCase, isUser: true });
    
    // Show headphone comparison based on use case
    setShowHeadphoneComparison(true);
    
    const responseText = `Based on your use case "${useCase}", here are the 2 best recommendations for your purpose and budget:`;
    addMessage({ text: responseText, isUser: false });
  };

  const handleNewChat = () => {
    // Reset all states
    setShowPreferences(false);
    setShowHeadphoneComparison(false);
    setShowProductDetail(false);
    setShowUseCaseSelector(false);
    setResponseData(null);
    
    addMessage({
      text: "Hi! I'm your AI shopping assistant. I can help you find products, compare prices, and get the best deals. What are you looking for today?",
      isUser: false
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <RNStatusBar barStyle="light-content" backgroundColor="#000000" />
      <StatusBar />
      
      <LinearGradient
        colors={['rgba(0,0,0,0.95)', 'rgba(0,0,0,0.9)', 'rgba(0,0,0,0.85)']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Thread</Text>
          <View style={styles.aiIndicator}>
            <Sparkles size={16} color={Colors.dark.accent} />
            <Text style={styles.aiText}>AI Assistant</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.headerButton} onPress={handleNewChat}>
          <Plus size={24} color={Colors.dark.text} />
        </TouchableOpacity>
      </LinearGradient>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {showGlow && (
          <Animated.View 
            style={[
              styles.glowContainer, 
              { 
                transform: [{ scale: pulseAnim }],
                opacity: glowOpacity,
              }
            ]}
          >
            <AIGlow isActive={isLoading} color={Colors.dark.accent} size={120} />
          </Animated.View>
        )}
        
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.welcomeContainer}>
            <LinearGradient
              colors={['rgba(52, 211, 153, 0.1)', 'rgba(52, 211, 153, 0.05)']}
              style={styles.welcomeBadge}
            >
              <Zap size={16} color={Colors.dark.accent} />
              <Text style={styles.welcomeText}>Superhuman AI Assistant</Text>
            </LinearGradient>
          </View>
          
          {messages.map((message, index) => (
            <ChatMessage
              key={`${message.id}-${index}`}
              message={message.text}
              isUser={message.isUser}
              timestamp={formatTimestamp(message.timestamp)}
            />
          ))}
          
          {showPreferences && (
            <GroceryPreferences 
              query={currentQuery}
              onComplete={handlePreferencesComplete}
            />
          )}

          {showHeadphoneComparison && (
            <HeadphoneComparison 
              onSelectProduct={handleProductSelect}
            />
          )}
          
          {showProductDetail && responseData?.selectedProduct && (
            <ProductDetailCard 
              product={responseData.selectedProduct}
            />
          )}
          
          {showUseCaseSelector && (
            <UseCaseSelector 
              onSelectUseCase={handleUseCaseSelect}
            />
          )}
          
          {isLoading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBubble}>
                <View style={styles.typingIndicator}>
                  <View style={[styles.typingDot, styles.typingDot1]} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                </View>
                <Text style={styles.loadingText}>AI is thinking...</Text>
              </View>
            </View>
          )}
          
          {isListening && (
            <View style={styles.listeningContainer}>
              <LinearGradient
                colors={[Colors.dark.accent, Colors.dark.accentDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.listeningBubble}
              >
                <Text style={styles.listeningText}>Listening...</Text>
                <View style={styles.waveContainer}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Animated.View 
                      key={`wave-${i}`} 
                      style={[
                        styles.wave, 
                        { 
                          height: Math.random() * 20 + 5,
                          backgroundColor: '#000'
                        }
                      ]} 
                    />
                  ))}
                </View>
              </LinearGradient>
            </View>
          )}
        </ScrollView>
        
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)', '#000']}
          style={styles.inputWrapper}
        >
          <View style={styles.inputContainer}>
            <View style={styles.inputBackground}>
              <TextInput
                style={styles.input}
                placeholder="Ask anything about shopping..."
                placeholderTextColor={Colors.dark.secondaryText}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                editable={!isListening && !showPreferences && !showHeadphoneComparison && !showProductDetail && !showUseCaseSelector}
                onSubmitEditing={handleSend}
                returnKeyType="send"
              />
            </View>
            
            {inputText.trim() ? (
              <TouchableOpacity 
                style={[
                  styles.sendButton, 
                  (isLoading || showPreferences || showHeadphoneComparison || showProductDetail || showUseCaseSelector) && styles.disabledButton
                ]} 
                onPress={handleSend}
                disabled={isLoading || showPreferences || showHeadphoneComparison || showProductDetail || showUseCaseSelector}
              >
                <LinearGradient
                  colors={[Colors.dark.accent, Colors.dark.accentDark]}
                  style={styles.sendButtonGradient}
                >
                  <Send size={20} color="#000000" />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <VoiceButton 
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                isListening={isListening}
              />
            )}
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  aiText: {
    fontSize: 12,
    color: Colors.dark.accent,
    fontWeight: '500',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  glowContainer: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  welcomeText: {
    color: Colors.dark.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  loadingBubble: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    marginBottom: 8,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dark.accent,
    marginHorizontal: 2,
  },
  typingDot1: {
    opacity: 0.4,
    transform: [{ scale: 0.8 }],
  },
  typingDot2: {
    opacity: 0.7,
    transform: [{ scale: 1 }],
  },
  typingDot3: {
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
  loadingText: {
    color: Colors.dark.accent,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  listeningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  listeningBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 12,
  },
  listeningText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    gap: 3,
  },
  wave: {
    width: 3,
    backgroundColor: Colors.dark.accent,
    borderRadius: 2,
  },
  inputWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputBackground: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minHeight: 48,
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: Colors.dark.text,
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
});