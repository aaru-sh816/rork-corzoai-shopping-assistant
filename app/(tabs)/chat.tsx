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
  Dimensions
} from 'react-native';
import { ArrowLeft, Send, Mic } from 'lucide-react-native';
import { useRouter } from 'expo-router';
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

const { width } = Dimensions.get('window');

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
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
      addMessage({ text: response, isUser: false });
      
      // Speak the response using text-to-speech
      if (Platform.OS !== 'web') {
        await textToSpeech(response);
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

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thread</Text>
        <TouchableOpacity style={styles.newChatButton} onPress={toggleGlow}>
          <Text style={styles.newChatButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {showGlow && (
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
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
              <ActivityIndicator color={Colors.dark.accent} size="small" />
              <Text style={styles.loadingText}>Thinking...</Text>
            </View>
          )}
          
          {isListening && (
            <View style={styles.listeningContainer}>
              <Text style={styles.listeningText}>Listening...</Text>
              <View style={styles.waveContainer}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <View key={`wave-${i}`} style={[styles.wave, { height: Math.random() * 20 + 5 }]} />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask Anything Shopping"
            placeholderTextColor={Colors.dark.secondaryText}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={!isListening && !showPreferences && !showHeadphoneComparison}
          />
          
          {inputText.trim() ? (
            <TouchableOpacity 
              style={[styles.sendButton, (isLoading || showPreferences || showHeadphoneComparison) && styles.disabledButton]} 
              onPress={handleSend}
              disabled={isLoading || showPreferences || showHeadphoneComparison}
            >
              <Send size={20} color={Colors.dark.text} />
            </TouchableOpacity>
          ) : (
            <VoiceButton 
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              isListening={isListening}
            />
          )}
        </View>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
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
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newChatButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  tryAskingContainer: {
    backgroundColor: Colors.dark.card,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 8,
  },
  loadingText: {
    color: Colors.dark.secondaryText,
    fontSize: 14,
  },
  listeningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  listeningText: {
    color: Colors.dark.accent,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    backgroundColor: Colors.dark.background,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.dark.input,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.dark.text,
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: Colors.dark.card,
    opacity: 0.7,
  },
});