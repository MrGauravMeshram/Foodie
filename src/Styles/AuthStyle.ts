import { StyleSheet } from "react-native";

export const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColorBlack,
    },
    upperSec: {
        height: "33%",
        justifyContent: "center",
    },
    lowerSec: {
        height: "80%",
        backgroundColor: colors.backgroundColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 30,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 30,
        marginTop: 100,
        fontFamily: "Sen-SemiBold",
        textAlign: "center",
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: "Sen-Regular",
        marginTop: 5,
        textAlign: "center",
    },
    ellipse: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 180,
        width: 180,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 13,
        fontFamily: 'Sen-Regular',
        color: colors.lightGrey,
    },
    forgetPassword: {
        color: colors.btnColor,
        fontSize: 14,
        textAlign: "center",
        fontFamily: 'Sen-Regular',
        marginTop: 18,
        alignSelf: 'flex-end',
    },
    bottomSec: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 35,
        gap: 8,
        justifyContent: "center",
    },
    bottomText: {
        color: colors.btnColor,
        fontSize: 16,
        fontFamily: 'Sen-Bold',
    },
    bottomtitle: {
        fontSize: 18,
        color: colors.lightGrey,
        fontFamily: 'Sen-Regular',
    }
})