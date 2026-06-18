import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'

const FoodCardmenu = () => {
  return (
    <View>
     <View style={style.ImageContainer}>
      <Image
      source={{uri:"https://i.pinimg.com/736x/37/56/8d/37568db9323595000d70fa59e05399a7.jpg"}} style={{height:"100%",width:"100%"}} resizeMode='cover'/>
     </View>
    </View>
  )
}

export default FoodCardmenu

const style = StyleSheet.create({
    ImageContainer:{
        height:70,
        width:70,

    }
})