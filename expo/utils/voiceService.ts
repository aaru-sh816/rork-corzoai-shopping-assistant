import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import * as Speech from 'expo-speech';

// ElevenLabs configuration
const ELEVENLABS_API_KEY = 'sk_4f8c8c4c8c4c8c4c8c4c8c4c8c4c8c4c8c4c8c4c';
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Bella voice

// Web Speech API types for better compatibility
interface WebSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: ((event: any) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new(): WebSpeechRecognition;
    };
    webkitSpeechRecognition: {
      new(): WebSpeechRecognition;
    };
  }
}

export const startVoiceRecognition = async (): Promise<{ isListening: boolean }> => {
  if (Platform.OS === 'web') {
    try {
      // Check if speech recognition is available
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        console.log('Speech recognition not supported on this browser');
        return { isListening: false };
      }
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.start();
      return { isListening: true };
    } catch (error) {
      console.error('Web Speech Recognition error:', error);
      return { isListening: false };
    }
  }

  // For native platforms, we would use react-native-voice
  // For now, simulate the functionality
  try {
    return { isListening: true };
  } catch (error) {
    console.error('Native voice recognition error:', error);
    return { isListening: false };
  }
};

export const stopVoiceRecognition = async (): Promise<{ text: string; isListening: boolean }> => {
  if (Platform.OS === 'web') {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        // In a real implementation, you would handle the recognition result
        // For demo, return a simulated response
      }
    } catch (error) {
      console.error('Web Speech Recognition stop error:', error);
    }
  }

  // Simulate intelligent voice responses
  const intelligentResponses = [
    'Show me the best wireless headphones under 5000 rupees',
    'I need to buy groceries like tomatoes, onions and garlic',
    'Find me a chemical free protein powder with good reviews',
    'What are the best deals on electronics today',
    'Compare prices for iPhone 15 across different stores',
    'I want to order organic vegetables for this week',
  ];
  
  const randomResponse = intelligentResponses[Math.floor(Math.random() * intelligentResponses.length)];
  return { text: randomResponse, isListening: false };
};

export const textToSpeech = async (text: string): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      // Use Web Speech API for web
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure voice settings
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Try to use a female voice if available
        const voices = synth.getVoices();
        const femaleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen')
        );
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        synth.speak(utterance);
        return;
      }
    }

    // Try ElevenLabs for high-quality voice synthesis
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text.substring(0, 500), // Limit text length
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true,
          },
          model_id: 'eleven_multilingual_v2',
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        await sound.playAsync();
        return;
      }
    } catch (elevenLabsError) {
      console.log('ElevenLabs failed, falling back to expo-speech:', elevenLabsError);
    }
    
    // Fallback to expo-speech
    await Speech.speak(text, {
      language: 'en-US',
      pitch: 1.1,
      rate: 0.9,
    });

  } catch (error) {
    console.error('Text to speech error:', error);
  }
};