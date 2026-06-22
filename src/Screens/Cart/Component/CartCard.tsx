import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import { Colors } from '../../../Theme/Color'
import { fontsSize, Fonts } from '../../../Theme/fonts'
import { addToCart, removeFromCart, removeItem } from '../../../State/CartSlice'

type CartCardProps = {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

const CartCard = ({ id, title, price, image, quantity }: CartCardProps) => {
    const dispatch = useDispatch()
    const itemTotal = (Number(price) || 0) * (Number(quantity) || 0)

    const handleIncrease = () => {
        dispatch(addToCart({ id, title, price, image, restaurant: '' }))
    }

    const handleDecrease = () => {
        dispatch(removeFromCart(id))
    }

    const handleRemove = () => {
        dispatch(removeItem(id))
    }

    return (
        <View style={style.wrapper}>
            <View style={style.container}>
                <View style={style.imageContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 10 }} resizeMode="cover" />
                    ) : null}
                </View>
                <View style={style.contentContainer}>
                    <Text style={style.titleText} numberOfLines={1}>{title}</Text>
                    <Text style={style.priceText}>${itemTotal}</Text>
                    <View style={style.counter}>
                        <TouchableOpacity style={style.minusButton} onPress={handleDecrease}>
                            <Text style={style.btntext}>-</Text>
                        </TouchableOpacity>
                        <View><Text style={style.btntext}>{quantity}</Text></View>
                        <TouchableOpacity style={style.minusButton} onPress={handleIncrease}>
                            <Text style={style.btntext}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={style.crossIcon} onPress={handleRemove}>
                <Entypo name="cross" color="#FFF" size={20} />
            </TouchableOpacity>
        </View>
    )
}

export default CartCard

const style = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    container: {
        height: 170,
        width: "97%",
        alignSelf: "center",
        justifyContent: 'space-around',
        flexDirection: "row",
        marginTop: 20,
    },
    contentContainer: {
        flex: 1,
        gap: 8,
        paddingRight: 40,
        justifyContent: 'center',
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
        width: '100%',
        marginTop: 10,
        marginLeft:15,
        fontFamily: Fonts.senMedium,

    },
    priceText: {
        fontSize: fontsSize.smd,
        fontFamily: Fonts.senMedium,
        marginLeft:15,
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