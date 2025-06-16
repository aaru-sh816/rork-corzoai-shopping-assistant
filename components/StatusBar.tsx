import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Battery, Wifi, Signal } from 'lucide-react-native';
import Colors from '@/constants/colors';

const StatusBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>1:38</Text>
      <View style={styles.rightIcons}>
        <Signal size={16} color={Colors.dark.text} />
        <Text style={styles.network}>5G</Text>
        <Battery size={16} color={Colors.dark.text} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
  },
  time: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  network: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default StatusBar;