import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface SearchBarProps {
  placeholder: string;
  onSearch: (text: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const [text, setText] = React.useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.dark.secondaryText}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        selectionColor={Colors.dark.accent}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <ArrowRight size={20} color={Colors.dark.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.input,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: Colors.dark.text,
    fontSize: 16,
  },
  button: {
    padding: 8,
  },
});

export default SearchBar;