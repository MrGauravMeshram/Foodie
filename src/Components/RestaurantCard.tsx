import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'

const RestaurantCard = ({image}:any) => {
  return (
    <View style={style.imageBox}>
    <Image
    source={{uri:image}} style={{height:"100%",width:"100%", borderRadius:15,}}resizeMode='cover'/>
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