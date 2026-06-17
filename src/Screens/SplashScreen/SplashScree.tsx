import { View, StyleSheet, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'

const SplashScree = ({ navigation }: any) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("OnBoarding")
        }, 2000)
        return () => clearTimeout(timer);
    }, [navigation])
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Image source={require('../../Assets/Images/EllipseTop.png')} style={styles.EllipseTop} resizeMode='contain' />
            <Image source={require('../../Assets/Images/Logo.png')} style={styles.logo} resizeMode='contain' />
            <Image source={require('../../Assets/Images/EllipseBottom.png')} style={styles.EllipseBottom} resizeMode='cover' />

        </View>
    )
}

export default SplashScree

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    EllipseBottom: {
        width: 250,
        height: 300,

        position: 'absolute',
        bottom: -40,

        right: -0,
        zIndex: 1
    },
    EllipseTop: {
        width: 250,
        height: 300,

        position: 'absolute',
        top: -100,
        left: -40,
        zIndex: 1
    }
})