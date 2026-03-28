import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.botContainer]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={Colors.dark.gradientPrimary}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarText}>Z</Text>
          </LinearGradient>
        </View>
      )}
      
      {isUser ? (
        <LinearGradient
          colors={Colors.dark.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bubble, styles.userBubble]}
        >
          <Text style={[styles.message, styles.userMessage]}>
            {message}
          </Text>
          {timestamp && <Text style={styles.userTimestamp}>{timestamp}</Text>}
        </LinearGradient>
      ) : (
        <BlurView intensity={10} style={[styles.bubble, styles.botBubble]}>
          <LinearGradient
            colors={Colors.dark.gradientGlass}
            style={styles.botBubbleGradient}
          >
            <Text style={[styles.message, styles.botMessage]}>
              {message}
            </Text>
            {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
          </LinearGradient>
        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  bubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: width * 0.75,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
    overflow: 'hidden',
  },
  botBubbleGradient: {
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.dark.glassBorder,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessage: {
    color: '#000000',
    fontWeight: '500',
  },
  botMessage: {
    color: Colors.dark.foreground,
    fontWeight: '400',
  },
  timestamp: {
    fontSize: 12,
    color: Colors.dark.secondaryText,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.7)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default ChatMessage;