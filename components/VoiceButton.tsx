import React, { useState, useEffect } from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  View, 
  Platform,
  Text
} from 'react-native';
import { Mic } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface VoiceButtonProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isListening: boolean;
}

const VoiceButton = ({ 
  onStartRecording, 
  onStopRecording, 
  isListening 
}: VoiceButtonProps) => {
  const [animation] = useState(new Animated.Value(1));
  
  useEffect(() => {
    if (isListening) {
      // Create a pulsing animation when recording
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop the animation
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isListening]);

  const handlePress = () => {
    if (isListening) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  // Web doesn't support SpeechRecognition in the same way
  if (Platform.OS === 'web') {
    return (
      <TouchableOpacity 
        style={[styles.button, isListening ? styles.activeButton : null]} 
        onPress={handlePress}
      >
        <Mic size={24} color={isListening ? Colors.dark.background : Colors.dark.text} />
        {isListening && (
          <Text style={styles.recordingText}>Voice input not fully supported on web</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ scale: animation }],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.button, isListening ? styles.activeButton : null]}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Mic size={24} color={isListening ? Colors.dark.background : Colors.dark.text} />
        </TouchableOpacity>
      </Animated.View>
      {isListening && <View style={styles.recordingIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: Colors.dark.accent,
  },
  recordingIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.accent,
    position: 'absolute',
    bottom: -12,
  },
  recordingText: {
    color: Colors.dark.secondaryText,
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
    width: 120,
  }
});

export default VoiceButton;