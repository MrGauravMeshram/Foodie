import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
type props = {
    icon: string;
    backgroundColor: string;
    onPress: () => void;
}

const Social = ({ icon, backgroundColor, onPress }: props) => {
    return (
        <View style={[style.container, { backgroundColor: backgroundColor }]}>
            <FontAwesome name={icon} color="#FFF" size={24} />
        </View>
    )
}

export default Social;
const style = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    }
})