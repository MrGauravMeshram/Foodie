import { StyleSheet } from "react-native";
import { Colors } from '../Theme/Color';


export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    upperSec: {
        height: "33%",
        justifyContent: "center",
    },
    lowerSec: {
        height: "80%",
        backgroundColor: Colors.backgroundColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 30,
    },
    title: {
        color: Colors.white,
        fontSize: 30,
        marginTop: 100,
        fontFamily: "Sen-SemiBold",
        textAlign: "center",
    },
    subtitle: {
        color: Colors.white,
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
        color: Colors.lightGrey,
    },
    forgetPassword: {
        color: Colors.btnColor,
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
        color: Colors.btnColor,
        fontSize: 16,
        fontFamily: 'Sen-Bold',
    },
    bottomtitle: {
        fontSize: 18,
        color: Colors.lightGrey,
        fontFamily: 'Sen-Regular',
    }


})