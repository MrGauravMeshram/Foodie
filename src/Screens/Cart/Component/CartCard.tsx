import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Colors } from '../../../Theme/Color'
import { Padding } from '../../../Theme/Spacing'
import { fontsSize, Fonts } from '../../../Theme/fonts'
import Entypo from 'react-native-vector-icons/Entypo';

const CartCard = () => {
    return (
        <>
            <View style={style.container}>
                <View style={style.imageContainer}>
                    <Image />
                </View>
                <View style={{ gap: 8 }}>
                    <Text style={style.titleText}>Pizza  Calzone European</Text>
                    <Text style={style.priceText}>$64</Text>
                    <View>
                    </View>
                    <View style={style.counter}>
                        <View style={style.minusButton}><Text style={style.btntext}>-</Text></View>
                        <View><Text style={style.btntext}>1</Text></View>
                        <View style={style.minusButton}><Text style={style.btntext}>+</Text></View>
                    </View>
                </View>
            </View>
            <View style={style.crossIcon}>
                <Entypo name="cross" color="#FFF" size={20} />
            </View>

        </>
    )
}

export default CartCard

const style = StyleSheet.create({
    container: {
        height: 170,
        width: "97%",
        alignSelf: "center",
        justifyContent: 'space-around',
        flexDirection: "row",
        marginTop: 20,
    },
    imageContainer: {
        height: 140,
        width: 140,
        backgroundColor: 'rgba(83, 83, 93, 1)',
        borderRadius: 10,

    },
    titleText: {
        fontSize: fontsSize.large,
        color: Colors.white,
        marginRight: 10,
        width: 200,
        marginTop: 10,
        fontFamily: Fonts.senMedium,

    },
    priceText: {
        fontSize: fontsSize.smd,
        fontFamily: Fonts.senMedium,
        color: Colors.white,
    },
    crossIcon: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: Colors.cancel,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: 32,
        right: 10,
    },
    counter: {
        height: 35,
        width: 80,
        borderRadius: 15,
        gap: 15,
        alignSelf: 'flex-end',
        marginRight: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
    },
    minusButton: {
        backgroundColor: 'rgba(83, 83, 93, 1)',
        borderRadius: 20,
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.white,
        fontSize: fontsSize.smd,
        fontFamily: Fonts.senMedium,
    },
    btntext: {
        color: Colors.white,
        fontSize: fontsSize.large,
        textAlign: 'center',
        fontFamily: Fonts.senRegular,
    }

})