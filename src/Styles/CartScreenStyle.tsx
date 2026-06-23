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
    },
    sheetContainer: {
    },
    contentContainer: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
        flex: 0,
    },
    sheetTitle: {
        fontFamily: Fonts.senRegular,
        fontSize: fontsSize.large,
        color: "#A0A5BA",
        marginBottom: 20,
        textAlign: 'center',
    },
    deliveryAddressContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
    summaryLabel: {
        fontFamily: Fonts.senRegular,
        fontSize: fontsSize.md,
        color: '#8c8c8c',
    },
    summaryValue: {
        fontFamily: Fonts.senMedium,
        fontSize: fontsSize.md,
        color: colors.semiBlack,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: colors.sideBarIcon,
        paddingTop: 12,
        marginTop: 8,
    },
    totalLabel: {
        fontFamily: Fonts.senBold,
        fontSize: fontsSize.smd,
        color: colors.semiBlack,
    },
    totalValue: {
        fontFamily: Fonts.senBold,
        fontSize: fontsSize.smd,
        color: colors.btnColor,
    },
    checkoutButton: {
        backgroundColor: colors.btnColor,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 24,
    },
    checkoutButtonText: {
        fontFamily: Fonts.senBold,
        fontSize: fontsSize.md,
        color: '#FFF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        gap: 8,
    },
    checkboxLabel: {
        fontFamily: Fonts.senMedium,
        fontSize: fontsSize.md,
        color: colors.white,
    },
})