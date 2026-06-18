import { StyleSheet } from "react-native"
import { Colors } from "../Theme/Color"
import { Fonts, fontsSize } from "../Theme/fonts"
import { Spacing } from "../Theme/Spacing"
import { Dimensions } from "react-native"
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        backgroundColor: Colors.backgroundColor,
        zIndex: 10,

    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: Colors.sideBarIcon,
        height: 45,
        width: 45,
        borderRadius: 22.5,
    },
    title: {
        fontSize: fontsSize.smd,
        fontFamily: Fonts.senMedium,
        color: Colors.semiBlack,
        flex: 1,
        marginLeft: 20,
    },
    cartContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: Colors.semiBlack,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    dropdownWrapper: {
        position: 'relative',
        zIndex: 1000,
    },
    pillButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.sideBarIcon,
        borderRadius: 22.5,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginLeft: 15,
    },
    pillText: {
        fontSize: fontsSize.sm,
        fontFamily: Fonts.senBold,
        color: Colors.semiBlack,
    },
    pillChevron: {
        marginLeft: 8,
    },
    overlay: {
        position: 'absolute',
        top: -screenHeight,
        left: -screenWidth,
        width: screenWidth * 2,
        height: screenHeight * 2,
        zIndex: 9998,
        backgroundColor: 'transparent',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 50,
        left: 15,
        backgroundColor: Colors.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.sideBarIcon,
        minWidth: 140,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 9999,
    },
    dropdownScroll: {
        maxHeight: 200,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    dropdownItemText: {
        fontSize: fontsSize.sm,
        fontFamily: Fonts.senRegular,
        color: Colors.semiBlack,
    },
    selectedItemText: {
        fontFamily: Fonts.senBold,
        color: Colors.btnColor,
    },
    filterButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: Colors.sideBarIcon,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});

