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
import { LinearGradient } from 'expo-linear-gradient';
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
  const [rippleAnimation] = useState(new Animated.Value(0));
  
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
      
      // Create ripple effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(rippleAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(rippleAnimation, {
            toValue: 0,
            duration: 0,
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
      
      Animated.timing(rippleAnimation, {
        toValue: 0,
        duration: 0,
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

  const rippleScale = rippleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  
  const rippleOpacity = rippleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 0],
  });

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
      {isListening && (
        <Animated.View
          style={[
            styles.ripple,
            {
              transform: [{ scale: rippleScale }],
              opacity: rippleOpacity,
            },
          ]}
        />
      )}
      
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ scale: animation }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          {isListening ? (
            <LinearGradient
              colors={[Colors.dark.accent, Colors.dark.accentDark]}
              style={styles.buttonGradient}
            >
              <Mic size={24} color="#000000" />
            </LinearGradient>
          ) : (
            <View style={styles.buttonInner}>
              <Mic size={24} color={Colors.dark.text} />
            </View>
          )}
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
  ripple: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.accent,
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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