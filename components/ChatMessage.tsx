import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

interface ChatMessageProps {
  message: string | { text: string };
  isUser: boolean;
  timestamp?: string;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  // Ensure message is always a string
  const messageText = typeof message === 'string' ? message : 
                     typeof message === 'object' && message !== null && 'text' in message ? message.text :
                     JSON.stringify(message);

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.botContainer]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={[Colors.dark.accent, Colors.dark.accentDark]}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarText}>Z</Text>
          </LinearGradient>
        </View>
      )}
      
      {isUser ? (
        <LinearGradient
          colors={[Colors.dark.accent, Colors.dark.accentDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bubble, styles.userBubble]}
        >
          <Text style={[styles.message, styles.userMessage]}>
            {messageText}
          </Text>
          {timestamp && <Text style={styles.userTimestamp}>{timestamp}</Text>}
        </LinearGradient>
      ) : (
        <View style={[styles.bubble, styles.botBubble]}>
          <Text style={[styles.message, styles.botMessage]}>
            {messageText}
          </Text>
          {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
        </View>
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
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
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
    color: Colors.dark.text,
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