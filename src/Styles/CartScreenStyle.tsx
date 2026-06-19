import { StyleSheet } from "react-native";
import { Padding } from "../Theme/Spacing";
import { Fonts, fontsSize } from "../Theme/fonts";

export const getStyle = (colors: any) => StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: colors.backgroundColorBlack,
        paddingHorizontal: Padding.mPadding
    },
    edit: {
        fontSize: fontsSize.smd,
        fontFamily: Fonts.senMedium,
        textDecorationLine: 'underline',
        flex: 999,
        bottom: 10,
        left: 20,
    }
})