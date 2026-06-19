import { StyleSheet } from "react-native";
import { Colors } from "../Theme/Color";
import { Padding } from "../Theme/Spacing";
import { Fonts, fontsSize } from "../Theme/fonts";

export const style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.backgroundColorBlack,
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