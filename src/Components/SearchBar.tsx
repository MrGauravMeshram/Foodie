import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { Spacing, Padding } from '../Theme/Spacing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../Hooks/useTheme';
import { useThemeStyles } from '../Hooks/useThemeStyles';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
};

const SearchBar = ({ value, onChangeText, placeholder, containerStyle }: Props) => {
  const [localText, setLocalText] = useState('');
  const { colors } = useTheme();
  const styles = useThemeStyles(getStyles);

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
        <Fontisto name="search" color={colors.lightGrey} size={20} />
      </View>
      <TextInput
        style={styles.input}
        value={currentText}
        onChangeText={handleTextChange}
        placeholder={placeholder || 'Search dishes, restaurant'}
        placeholderTextColor={colors.gray}
      />
      {currentText.length > 0 && (
        <TouchableOpacity onPress={handleClear} activeOpacity={0.7}>
          <Ionicons name="close-circle" color={colors.lightGrey} size={20} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBar;

const getStyles = (colors: any) => StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.InputBox,
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
    color: colors.black,
    padding: 0,
  },
})