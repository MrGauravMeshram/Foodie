import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../Theme/Color'
import Fontisto from 'react-native-vector-icons/Fontisto';

type Props = {
    containerStyle?: ViewStyle;
};

const LeftArrow = ({ containerStyle }: Props) => {
    return (
        <View style={[style.container, containerStyle]}>
            <Fontisto name="angle-left" color="#000" size={16} />
        </View>
    )
}

export default LeftArrow

const style = StyleSheet.create({
    container: {
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
