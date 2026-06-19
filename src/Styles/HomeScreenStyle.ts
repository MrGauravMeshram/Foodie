import { StyleSheet } from "react-native";
import { Padding, Spacing } from "../Theme/Spacing";
import { Colors } from "../Theme/Color";
import { Fonts, fontsSize as Font, } from "../Theme/fonts";

export const Style = StyleSheet.create({
    Container: {

        backgroundColor: Colors.white
    },
    nameText: {
        fontFamily: Fonts.senSemiBold,
        fontSize: Font.md,
        paddingHorizontal: Padding.mPadding,
        marginTop: Spacing.md,
        marginBottom: Spacing.md
    },
    search: {
        paddingHorizontal: Padding.lPadding
    },
    Categories: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: Spacing.lm,
        paddingHorizontal: Padding.mPadding,
        justifyContent: "space-between"
    },
    SeeAll: {
        flexDirection: "row",
        alignItems: "center",
    },
    CategoriesTitle: {
        color: Colors.subtitleColor,
        fontFamily: Fonts.senSemiBold,

        fontSize: Font.smd
    },
    CategoriesSubtitle: {
        color: Colors.gray,
        fontFamily: Fonts.senMedium,
        fontSize: Font.md,
    }
})