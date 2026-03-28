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
import { BlurView } from 'expo-blur';
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
        <BlurView intensity={10} style={styles.webButtonBlur}>
          <LinearGradient
            colors={isListening ? Colors.dark.gradientPrimary : Colors.dark.gradientGlass}
            style={styles.webButtonGradient}
          >
            <Mic size={24} color={isListening ? '#000000' : Colors.dark.foreground} />
          </LinearGradient>
        </BlurView>
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
              colors={Colors.dark.gradientPrimary}
              style={styles.buttonGradient}
            >
              <Mic size={24} color="#000000" />
            </LinearGradient>
          ) : (
            <BlurView intensity={10} style={styles.buttonBlur}>
              <LinearGradient
                colors={Colors.dark.gradientGlass}
                style={styles.buttonInner}
              >
                <Mic size={24} color={Colors.dark.foreground} />
              </LinearGradient>
            </BlurView>
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
    backgroundColor: Colors.dark.primary,
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
  buttonBlur: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    overflow: 'hidden',
  },
  buttonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    borderRadius: 28,
  },
  webButtonBlur: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    overflow: 'hidden',
  },
  webButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
    borderRadius: 28,
  },
  activeButton: {
    backgroundColor: Colors.dark.primary,
  },
  recordingIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.primary,
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