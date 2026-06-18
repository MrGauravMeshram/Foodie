import { View, Text, StyleSheet, FlatList } from 'react-native'
import RestaurantCard from '../../../Components/RestaurantCard'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Fonts, fontsSize } from '../../../Theme/fonts'
import { Padding } from '../../../Theme/Spacing'
import { Colors } from '../../../Theme/Color'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';

const ResaurantCardDetials = ({ Data }: any) => {

  const renderCard = ({ item }: any) => {
    return (
      <View style={Style.container}>
        <View>
          <RestaurantCard image={item.image} />
        </View>
        <View>
          <Text style={Style.title}>{item.name}</Text>
          <Text>{item.category}</Text>
        </View>
        <View style={Style.rate}>
          <View style={Style.icon}>
            <Feather name="star" color={Colors.btnColor} size={24} />
            <Text>{item.rating}</Text>
          </View>
          <View style={Style.icon}>
            <Feather name="truck" color={Colors.btnColor} size={24} />
            <Text>Free</Text>
          </View>
          <View style={Style.icon}>
            <Fontisto name="clock" color={Colors.btnColor} size={24} />
            <Text>{item.deliveryTime}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      data={Data}
      renderItem={renderCard}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}

    />
  )

}

export default ResaurantCardDetials

const Style = StyleSheet.create({
  container: {
    paddingVertical: Padding.mPadding
  },
  title: {
    fontFamily: Fonts.senBold,
    color: Colors.black,
    paddingTop: Padding.sPadding,
    fontSize: fontsSize.large
  },
  subtitle: {
    fontFamily: Fonts.senRegular,
    color: Colors.lightGrey
  },
  rate: {
    marginTop: 10,
    flexDirection: "row",
    gap: 15,
  },
  icon: {
    flexDirection: "row", gap: 10, alignItems: "center"
  }
})