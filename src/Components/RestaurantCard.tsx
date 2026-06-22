import { View, StyleSheet } from 'react-native'
import React from 'react'
import Animated,{SharedTransition} from 'react-native-reanimated'

const RestaurantCard = ({ image, id }: any) => {
  const transition = SharedTransition.duration(550).springify();
  return (
    <View style={style.imageBox}>
      <Animated.Image
        source={{ uri: image }}
        style={style.image}
        resizeMode='cover'

        sharedTransitionTag={`restaurant-image-${id}`}
        sharedTransitionStyle={transition}
      />
    </View>
  )
}

export default RestaurantCard

const style = StyleSheet.create({
  imageBox: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: "100%",
  }
})