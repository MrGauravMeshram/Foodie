import { StyleSheet } from "react-native";
import { Padding, Spacing } from "../Theme/Spacing";
import { Fonts, fontsSize as Font, } from "../Theme/fonts";

export const getStyle = (colors: any) => StyleSheet.create({
    Container: {
        backgroundColor: colors.backgroundColor
    },
    nameText: {
        fontFamily: Fonts.senSemiBold,
        fontSize: Font.md,
        paddingHorizontal: Padding.mPadding,
        marginTop: Spacing.md,
        marginBottom: Spacing.md,
        color: colors.black
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
        color: colors.semiBlack,
        fontFamily: Fonts.senSemiBold,
        fontSize: Font.smd
    },
    CategoriesSubtitle: {
        color: colors.gray,
        fontFamily: Fonts.senMedium,
        fontSize: Font.md,
    }
})