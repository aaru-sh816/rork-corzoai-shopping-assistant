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
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions,
  Image
} from 'react-native';
import { ArrowLeft, Send, Mic, X, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import StatusBar from '@/components/StatusBar';
import ChatMessage from '@/components/ChatMessage';
import AIGlow from '@/components/AIGlow';
import VoiceButton from '@/components/VoiceButton';
import GroceryPreferences from '@/components/GroceryPreferences';
import { useAppStore } from '@/store/useAppStore';
import { generateAIResponse } from '@/utils/aiService';
import { startVoiceRecognition, stopVoiceRecognition, textToSpeech } from '@/utils/voiceService';
import HeadphoneComparison from '@/components/HeadphoneComparison';

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
  const [currentQuery, setCurrentQuery] = useState('');
  const [responseData, setResponseData] = useState<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const inputHeight = useRef(new Animated.Value(50)).current;
  const maxInputHeight = 120;

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, showPreferences, showHeadphoneComparison]);

  useEffect(() => {
    // Pulse animation for the glow when AI is responding
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
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
    
    // Check if the message is about groceries to show preferences UI
    const lowerMessage = userMessage.toLowerCase();
    if ((lowerMessage.includes('onion') || lowerMessage.includes('garlic') || lowerMessage.includes('tomato')) && 
        (lowerMessage.includes('order') || lowerMessage.includes('buy'))) {
      setCurrentQuery(userMessage);
      setShowPreferences(true);
      setIsLoading(false);
      return;
    }

    // Check if the message is about headphones comparison
    if (lowerMessage.includes('headphone') && 
        (lowerMessage.includes('compare') || lowerMessage.includes('price') || lowerMessage.includes('under 5000'))) {
      setShowHeadphoneComparison(true);
      setIsLoading(false);
      return;
    }
    
    try {
      // Call the n8n webhook with the user's message
      const response = await generateAIResponse(userMessage);
      addMessage({ text: response.text, isUser: false });
      
      // Store structured data if available
      if (response.data) {
        setResponseData(response.data);
        
        // Handle specific response types
        if (response.data.products && Array.isArray(response.data.products)) {
          setShowHeadphoneComparison(true);
        }
      }
      
      // Speak the response using text-to-speech
      if (Platform.OS !== 'web') {
        await textToSpeech(response.text);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      addMessage({ 
        text: "I'm sorry, I couldn't process your request. Please try again.", 
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
        // Process the transcribed text
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
    
    // Add a message with the selected preferences
    const preferencesText = `Selected preferences:
- Onion: ${preferences.onion}
- Garlic: ${preferences.garlic}
- Tomato: ${preferences.tomato}`;
    
    addMessage({ text: preferencesText, isUser: true });
    
    // Generate a response based on the preferences
    const responseText = `I've added these items to your cart:
- ${preferences.onion} Onions
- ${preferences.garlic} Garlic
- ${preferences.tomato} Tomatoes

The best price for these items is on Blinkit at ₹87 total. Would you like to checkout now?`;
    
    addMessage({ text: responseText, isUser: false });
  };

  const handleProductSelect = (product: any) => {
    setShowHeadphoneComparison(false);
    
    // Add a message with the selected product
    const productText = `I'm interested in the ${product.name} for ₹${product.price}`;
    
    addMessage({ text: productText, isUser: true });
    
    // Generate a response based on the selected product
    const responseText = `Great choice! The ${product.name} is available for ₹${product.price} on ${product.store}. 
    
It features:
${product.features.map((feature: string) => `- ${feature}`).join('\n')}

Would you like me to add this to your cart or show you more options?`;
    
    addMessage({ text: responseText, isUser: false });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleGlow = () => {
    setShowGlow(!showGlow);
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    
    // Adjust input height based on content
    const numberOfLines = text.split('\n').length;
    const newHeight = Math.min(50 + (numberOfLines - 1) * 20, maxInputHeight);
    
    Animated.timing(inputHeight, {
      toValue: newHeight,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handleNewChat = () => {
    // Clear messages and start a new chat
    // This would typically reset the conversation in a real app
    addMessage({
      text: "Hi there! I'm your CorzoAI shopping assistant. How can I help you today?",
      isUser: false
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.7)']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thread</Text>
        <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
          <Plus size={20} color={Colors.dark.text} />
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
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <AIGlow isActive={isLoading} />
          </Animated.View>
        )}
        
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.tryAskingContainer}>
            <Text style={styles.tryAskingText}>Try Asking ✨ ✨</Text>
          </View>
          
          {messages.map((message, index) => (
            <ChatMessage
              key={`${message.id}:${index}`}
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
          
          {isLoading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBubble}>
                <View style={styles.typingIndicator}>
                  <View style={[styles.typingDot, styles.typingDot1]} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                </View>
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
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)', '#000']}
          style={styles.inputWrapper}
        >
          <View style={styles.inputContainer}>
            <Animated.View style={[styles.inputBackground, { height: inputHeight }]}>
              <TextInput
                style={[styles.input, { height: inputHeight }]}
                placeholder="Ask Anything Shopping"
                placeholderTextColor={Colors.dark.secondaryText}
                value={inputText}
                onChangeText={handleInputChange}
                multiline
                maxLength={500}
                editable={!isListening && !showPreferences && !showHeadphoneComparison}
              />
            </Animated.View>
            
            {inputText.trim() ? (
              <TouchableOpacity 
                style={[
                  styles.sendButton, 
                  (isLoading || showPreferences || showHeadphoneComparison) && styles.disabledButton
                ]} 
                onPress={handleSend}
                disabled={isLoading || showPreferences || showHeadphoneComparison}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  newChatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  glowContainer: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  tryAskingContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 24,
  },
  tryAskingText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  loadingBubble: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 60,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.accent,
    marginHorizontal: 3,
  },
  typingDot1: {
    opacity: 0.4,
    transform: [{ scale: 0.9 }],
  },
  typingDot2: {
    opacity: 0.7,
    transform: [{ scale: 1 }],
  },
  typingDot3: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  listeningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  listeningBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    gap: 4,
  },
  wave: {
    width: 3,
    backgroundColor: Colors.dark.accent,
    borderRadius: 2,
  },
  inputWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBackground: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 16,
    color: Colors.dark.text,
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
});