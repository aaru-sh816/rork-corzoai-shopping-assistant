import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import * as Speech from 'expo-speech';

// Define types for Web Speech API without conflicting with global declarations
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Initialize ElevenLabs (in a real app)
const ELEVENLABS_API_KEY = 'YOUR_ELEVENLABS_KEY';
const VOICE_ID = 'YOUR_VOICE_ID';

export const startVoiceRecognition = async (): Promise<{ isListening: boolean }> => {
  if (Platform.OS === 'web') {
    try {
      // Use a safer approach to access Web Speech API
      const webSpeechRecognition = (window as any).SpeechRecognition || 
                                  (window as any).webkitSpeechRecognition;
      if (!webSpeechRecognition) {
        throw new Error('Speech recognition not supported');
      }
      
      const recognition = new webSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.start();
      return { isListening: true };
    } catch (error) {
      console.error('Web Speech Recognition error:', error);
      return { isListening: false };
    }
  }

  // For native platforms
  try {
    // In a real app, use react-native-voice
    return { isListening: true };
  } catch (error) {
    console.error('Native voice recognition error:', error);
    return { isListening: false };
  }
};

export const stopVoiceRecognition = async (): Promise<{ text: string; isListening: boolean }> => {
  if (Platform.OS === 'web') {
    try {
      // Use a safer approach to access Web Speech API
      const webSpeechRecognition = (window as any).SpeechRecognition || 
                                  (window as any).webkitSpeechRecognition;
      if (webSpeechRecognition) {
        const recognition = new webSpeechRecognition();
        recognition.stop();
      }
    } catch (error) {
      console.error('Web Speech Recognition stop error:', error);
    }
  }

  // Simulate response for demo
  const mockResponses = [
    'Show me the best headphones under 5000 rupees',
    'I need to buy groceries like tomatoes and onions',
    'Find me a good protein bar without chemicals',
    'What are the best deals on Myntra today',
  ];
  
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  return { text: randomResponse, isListening: false };
};

export const textToSpeech = async (text: string): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      // Use Web Speech API with a safer approach
      const webSpeechSynthesis = (window as any).speechSynthesis;
      const WebSpeechSynthesisUtterance = (window as any).SpeechSynthesisUtterance;
      
      if (webSpeechSynthesis && WebSpeechSynthesisUtterance) {
        const speech = new WebSpeechSynthesisUtterance(text);
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        webSpeechSynthesis.speak(speech);
        return;
      }
      throw new Error('Speech synthesis not supported');
    }

    // Try ElevenLabs first
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('ElevenLabs API failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();

    } catch (elevenLabsError) {
      console.log('ElevenLabs failed, falling back to expo-speech:', elevenLabsError);
      
      // Fallback to expo-speech
      await Speech.speak(text, {
        language: 'en-US',
        pitch: 1,
        rate: 0.9,
      });
    }

  } catch (error) {
    console.error('Text to speech error:', error);
  }
};