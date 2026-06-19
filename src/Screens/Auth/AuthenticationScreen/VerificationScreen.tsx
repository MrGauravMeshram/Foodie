import { View, Text, TextInput, StatusBar, Image, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import { Button } from '../../../Components/Button'
import { getStyles as getAuthStyles } from '../../../Styles/AuthStyle'
import { useTheme } from '../../../Hooks/useTheme'
import { useThemeStyles } from '../../../Hooks/useThemeStyles'

const VerificationScreen = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const inputs = useRef<any>([]);
    const { colors } = useTheme();
    const AuthStyles = useThemeStyles(getAuthStyles);
    const styles = useThemeStyles(getStyles);

    const handleChangeText = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={AuthStyles.container}>
            <StatusBar barStyle="light-content" />
            <Image source={require('../../../Assets/Images/Ellipse.png')} style={AuthStyles.ellipse} />

            <View style={AuthStyles.upperSec}>
                <Text style={AuthStyles.title}>Verification</Text>
                <Text style={[AuthStyles.subtitle, { marginTop: 15 }]}>We have sent a code to your email</Text>
                <Text style={[AuthStyles.subtitle, { fontFamily: 'Sen-Bold' }]}>example@gmail.com</Text>
            </View>

            <View style={AuthStyles.lowerSec}>
                <View style={styles.labelRow}>
                    <Text style={styles.codeLabel}>CODE</Text>
                    <Text style={styles.resendText}>
                        <Text style={styles.resendBtn}>Resend</Text>
                    </Text>
                </View>

                <View style={styles.otpContainer}>
                    {code.map((value, index) => (
                        <TextInput
                            key={index}
                            ref={el => { inputs.current[index] = el; }}
                            style={styles.otpInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={value}
                            onChangeText={text => handleChangeText(text, index)}
                            onKeyPress={e => handleKeyPress(e, index)}
                        />
                    ))}
                </View>

                <View style={{ marginTop: 30 }}>
                    <Button title="VERIFY" onPress={() => { }} />
                </View>
            </View>
        </View>
    )
}

export default VerificationScreen

const getStyles = (colors: any) => StyleSheet.create({
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    codeLabel: {
        fontSize: 14,
        fontFamily: 'Sen-Bold',
        color: colors.black,
        textTransform: 'uppercase'
    },
    resendText: {
        fontSize: 14,
        fontFamily: 'Sen-Regular',
        color: colors.lightGrey,
    },
    resendBtn: {
        textDecorationLine: 'underline',
        fontFamily: 'Sen-Bold',
        color: colors.black,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingHorizontal: 10
    },
    otpInput: {
        width: 62,
        height: 62,
        borderRadius: 12,
        backgroundColor: colors.InputBox,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Sen-Bold',
        color: colors.black
    }
})