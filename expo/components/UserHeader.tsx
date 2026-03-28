import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '@/constants/colors';

interface UserHeaderProps {
  name: string;
  balance: string;
}

const UserHeader = ({ name, balance }: UserHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }} 
            style={styles.avatar} 
          />
        </View>
        <Text style={styles.greeting}>Hi {name}</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }} 
          style={styles.coinIcon} 
        />
        <Text style={styles.balance}>{balance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  avatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.dark.accent,
    overflow: 'hidden',
  },
  avatar: {
    width: 28,
    height: 28,
  },
  greeting: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  coinIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  balance: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserHeader;