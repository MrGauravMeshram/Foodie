import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    KeyboardTypeOptions,
} from 'react-native';
import { useTheme } from '../Hooks/useTheme';
import { useThemeStyles } from '../Hooks/useThemeStyles';
import { Fonts } from '../Theme/fonts';

type CardInputFieldProps = {
    label: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
};

const CardInputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    maxLength,
    containerStyle,
    inputStyle,
}: CardInputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const { colors } = useTheme();
    const styles = useThemeStyles(getStyles);

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <View style={[
                styles.inputContainer,
                isFocused && { borderColor: colors.btnColor, borderWidth: 1 }
            ]}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    style={[styles.input, inputStyle]}
                    placeholderTextColor={colors.gray || '#A0A5BA'}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoCorrect={false}
                    autoCapitalize="words"
                    autoComplete="off"
                    spellCheck={false}
                />
            </View>
        </View>
    );
};

export default CardInputField;

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        color: '#A0A5BA', // Soft grey-blue color matching design
        fontSize: 14,
        fontFamily: Fonts.senRegular || 'Sen-Regular',
        textTransform: 'uppercase',
        marginBottom: 10,
        letterSpacing: 0.8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.InputBox,
        height: 60,
        borderRadius: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        fontFamily: Fonts.senRegular || 'Sen-Regular',
        color: colors.black,
        padding: 0,
    },
});
