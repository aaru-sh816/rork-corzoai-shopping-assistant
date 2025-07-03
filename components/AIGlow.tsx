import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

interface AIGlowProps {
  isActive?: boolean;
  color?: string;
  size?: number;
}

const AIGlow = ({ 
  isActive = true, 
  color = Colors.dark.primary,
  size = 150 
}: AIGlowProps) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(isActive ? 0.8 : 0.4)).current;
  const innerRotation = useRef(new Animated.Value(0)).current;
  const innerScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Outer rotation animation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Inner counter-rotation
    Animated.loop(
      Animated.timing(innerRotation, {
        toValue: -1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Inner pulsing animation (slightly out of phase)
    Animated.loop(
      Animated.sequence([
        Animated.timing(innerScale, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(innerScale, {
          toValue: 0.8,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Opacity animation based on active state
    Animated.timing(opacity, {
      toValue: isActive ? 0.8 : 0.4,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spinInner = innerRotation.interpolate({
    inputRange: [-1, 0],
    outputRange: ['-360deg', '0deg'],
  });

  return (
    <View style={[styles.container, { height: size + 30 }]}>
      <Animated.View
        style={[
          styles.glowContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ rotate: spin }, { scale }],
            opacity,
          },
        ]}
      >
        <LinearGradient
          colors={[
            color,
            'transparent',
            color,
            'transparent',
          ]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={[styles.gradient, { borderRadius: size / 2 }]}
        />
        
        <Animated.View
          style={[
            styles.innerGlow,
            {
              width: size * 0.8,
              height: size * 0.8,
              borderRadius: (size * 0.8) / 2,
              transform: [{ rotate: spinInner }, { scale: innerScale }],
            },
          ]}
        >
          <LinearGradient
            colors={[
              'transparent',
              color,
              'transparent',
              color,
            ]}
            start={{ x: 0.2, y: 0.2 }}
            end={{ x: 0.8, y: 0.8 }}
            style={[styles.gradient, { borderRadius: (size * 0.8) / 2 }]}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  innerGlow: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});

export default AIGlow;