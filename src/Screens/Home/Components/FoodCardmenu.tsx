import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Fonts, fontsSize } from '../../../Theme/fonts'
import { Padding } from '../../../Theme/Spacing'
import { useTheme } from '../../../Hooks/useTheme';
import { useThemeStyles } from '../../../Hooks/useThemeStyles';

type props = {
    Data: any
}

const FoodCardmenu = ({ Data }: props) => {
    const { colors } = useTheme();
    const styles = useThemeStyles(getStyles);

    const renderCarditem = ({ item }: any) => {
        return (
            <View style={styles.container}>
                <View style={styles.ImageContainer}>
                    <Image
                        source={{ uri: item.image }} style={{ height: "100%", width: "100%" }} resizeMode='cover' />
                </View>
                <View>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
                <View style={styles.subtitle}>
                    <Text style={styles.subtitleText}>Starting</Text>
                    <Text style={styles.priceText}>$ 70</Text>
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={Data}
            renderItem={renderCarditem}
            keyExtractor={(item) => item.id}
            horizontal
            nestedScrollEnabled
            contentContainerStyle={styles.flat}
        />
    )
}

export default FoodCardmenu

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 10,
        padding: Padding.sPadding,
        borderRadius: 15,
        backgroundColor: colors.lightWhite,
        justifyContent: "center",
    },
    ImageContainer: {
        height: 70,
        width: 70,
    },
    subtitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15
    },
    titleText: {
        textAlign: "left",
        marginRight: 55,
        overflow: "hidden",
        fontFamily: Fonts.senSemiBold,
        fontSize: fontsSize.md,
        color: colors.black,
    },
    subtitleText: {
        fontFamily: Fonts.senRegular,
        fontSize: fontsSize.sm,
        color: colors.lightGrey,
    },
    priceText: {
        fontFamily: Fonts.senBold,
        fontSize: fontsSize.sm,
        color: colors.black,
    },
    flat: {
        gap: 15,
    }
})