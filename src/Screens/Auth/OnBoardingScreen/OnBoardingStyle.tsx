import { StyleSheet } from "react-native";

export const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor || '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 32,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 6,
    },
    activeDot: {
        backgroundColor: colors.btnColor || '#FF7622',
    },
    inactiveDot: {
        backgroundColor: colors.isDarkMode ? '#3A3F50' : '#FFE1CC',
    },
    buttonContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        alignItems: 'center',
    },
    skipButton: {
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    skipText: {
        fontSize: 16,
        fontFamily: 'Sen-Regular',
        color: colors.lightGrey || '#646982',
    },
    skipPlaceholder: {
        height: 36,
        marginTop: 20,
    },
});