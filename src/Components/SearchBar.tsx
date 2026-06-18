import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../Theme/Color';
import { Spacing, Padding } from '../Theme/Spacing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
};

const SearchBar = ({ value, onChangeText, placeholder, containerStyle }: Props) => {
  const [localText, setLocalText] = useState('');

  const isControlled = value !== undefined;
  const currentText = isControlled ? value : localText;

  const handleTextChange = (text: string) => {
    if (!isControlled) {
      setLocalText(text);
    }
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleClear = () => {
    handleTextChange('');
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <View>
        <Fontisto name="search" color="#7E8389" size={20} />
      </View>
      <TextInput
        style={styles.input}
        value={currentText}
        onChangeText={handleTextChange}
        placeholder={placeholder || 'Search dishes, restaurant'}
        placeholderTextColor={Colors.gray}
      />
      {currentText.length > 0 && (
        <TouchableOpacity onPress={handleClear} activeOpacity={0.7}>
          <Ionicons name="close-circle" color="#A0A5AB" size={20} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.InputBox,
    height: 55,
    gap: 15,
    borderRadius: 10,
    paddingHorizontal: Padding.mPadding,
    flex: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Sen-Regular',
    color: Colors.black,
    padding: 0,
  },
})