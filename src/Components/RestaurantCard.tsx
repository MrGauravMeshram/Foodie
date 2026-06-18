import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Animated,{SharedTransition} from 'react-native-reanimated'

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

const RestaurantCard = ({ image, id }: any) => {
  const transition = SharedTransition.duration(550).springify();
  return (
    <View style={style.imageBox}>
      <Animated.Image
        source={{ uri: image }}
        style={{ height: 200, width: cardWidth, borderRadius: 15 }}
        resizeMode='cover'

        sharedTransitionTag={`restaurant-image-${id}`}
          sharedTransitionStyle={transition}
      />
    </View>
  )
}

export default RestaurantCard

const style = StyleSheet.create({
    imageBox:{
        height:200,
        width:"100%",
        alignSelf:"center",
        borderRadius:30,
    }
})