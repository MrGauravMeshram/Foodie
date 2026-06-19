import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../Hooks/useTheme'
import { useThemeStyles } from '../../Hooks/useThemeStyles'
import { Fonts, fontsSize } from '../../Theme/fonts'

const OfferScreen = () => {
    const { colors } = useTheme();
    const styles = useThemeStyles(getStyles);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Offer Screen</Text>
        </SafeAreaView>
    )
}

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: Fonts.senBold,
        fontSize: fontsSize.large,
        color: colors.black,
    }
});

export default OfferScreen