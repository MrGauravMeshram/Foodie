import { View, Text ,StyleSheet} from 'react-native'
import { Fonts,fontsSize } from '../../../Theme/fonts'
import FoodCard from '../../../Components/FoodCard'
import React from 'react'

const PopularFastFood = ({ data }: any) => {
  return (
    <View>
    <View>
      <Text style={style.title}>PopularFastFood</Text>
    </View>
    <View style={style.cardContainer}>
    <FoodCard
      id="ff1"
      image={"https://i.pinimg.com/736x/ca/a8/50/caa85028e403ce2914534928e98a8263.jpg"}
      title="Burger Bistro"
      restaurant="Rose Garden"
      price={40}
    />
     <FoodCard
      id="ff2"
      image={"https://i.pinimg.com/736x/ca/a8/50/caa85028e403ce2914534928e98a8263.jpg"}
      title="Buffalo Pizza"
      restaurant="Cafenio Coffee Club"
      price={50}
    />
</View>
    </View>
  )
}

export default PopularFastFood

const style = StyleSheet.create({
    cardContainer:{
      alignItems:"center",
      justifyContent:"center",
flexDirection:"row"
    },

  title:{
    fontFamily:Fonts.senBold,
    fontSize:fontsSize.smd
  }
})