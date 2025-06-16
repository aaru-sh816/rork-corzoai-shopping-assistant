import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Search, MessageCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface TabBarProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const TabBar = ({ activeTab, onChangeTab }: TabBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onChangeTab('home')}
      >
        <Home
          size={24}
          color={activeTab === 'home' ? Colors.dark.accent : Colors.dark.secondaryText}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onChangeTab('search')}
      >
        <Search
          size={24}
          color={activeTab === 'search' ? Colors.dark.accent : Colors.dark.secondaryText}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onChangeTab('chat')}
      >
        <MessageCircle
          size={24}
          color={activeTab === 'chat' ? Colors.dark.accent : Colors.dark.secondaryText}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    paddingVertical: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});

export default TabBar;