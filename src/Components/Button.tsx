import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors } from '../Theme/Color';

interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
}

export const Button = ({ title, onPress, style, textStyle, disabled }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, style, disabled && { opacity: 0.5 }]}
            onPress={onPress}
            activeOpacity={disabled ? 1 : 0.8}
            disabled={disabled}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.btnColor,
        height: 62,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Sen-Bold',
        letterSpacing: 0.5,
    },
});
