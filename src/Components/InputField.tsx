import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../Hooks/useTheme';
import { useThemeStyles } from '../Hooks/useThemeStyles';

type InputFieldProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    returnKeyType?: ReturnKeyTypeOptions;
    onSubmitEditing?: () => void;
    blurOnSubmit?: boolean;
    style?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle>;
    placeholderTextColor?: string;
};

const EyeIcon = () => (
    <Feather name="eye" size={20} color="#A0A5BA" />
);

const EyeOffIcon = () => (
    <Feather name="eye-off" size={20} color="#A0A5BA" />
);

const InputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    returnKeyType,
    onSubmitEditing,
    blurOnSubmit,
    style,
    containerStyle,
    labelStyle,
    inputStyle,
    placeholderTextColor,
}: InputFieldProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordType = secureTextEntry === true;
    const { colors } = useTheme();
    const styles = useThemeStyles(getStyles);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            <View style={[styles.inputContainer, style]}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPasswordType ? !isPasswordVisible : false}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    blurOnSubmit={blurOnSubmit}
                    style={[styles.input, inputStyle]}
                    placeholderTextColor={placeholderTextColor || colors.gray}
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoComplete="off"
                    spellCheck={false}
                />
                {isPasswordType && (
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.eyeButton}
                        activeOpacity={0.7}
                    >
                        {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InputField;

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 24,
    },
    label: {
        color: colors.black,
        fontSize: 14,
        fontFamily: 'Sen-Regular',
        textTransform: 'uppercase',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.InputBox,
        height: 62,
        justifyContent:"center",
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        fontFamily: 'Sen-Regular',
        color: colors.black,
        padding: 0,
    },
    eyeButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


