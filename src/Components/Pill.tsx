import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../Theme/Color'
import { Padding, Spacing } from '../Theme/Spacing'
import { Fonts, fontsSize } from '../Theme/fonts'
import { useNavigation } from '@react-navigation/native';


type props = {
  Data: any,
  active: any,
  onSelect: (id: string) => void;
}

const Pill = ({ Data, active, onSelect }: props) => {
  const navigation = useNavigation<any>();
  const onPressSelect = (item: any) => {
    onSelect(item.id)
    navigation.navigate("PopularItem")
  }

  const renderPill = ({ item, index }: any) => {
    const isSelected = active === item.id;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPressSelect(item)}
        style={[
          Style.container,
          {
            backgroundColor: isSelected
              ? '#FFD27A'
              : Colors.white,
          },
        ]}>
        <View style={Style.imagecontain}>
          <Image
            source={{ uri: item.image }}
            style={{ height: "100%", width: "100%", borderRadius: 50 }}
            resizeMode='cover' />
        </View>
        <View>
          <Text style={Style.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <FlatList
      data={Data}
      renderItem={renderPill}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={Style.box}
      nestedScrollEnabled
    />
  )
}

export default Pill

const Style = StyleSheet.create({
  imagecontain: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  container: {
    height: 65,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: Spacing.md,
    flexDirection: "row",
    borderWidth: 1,
    elevation: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white

  },
  text: {
    fontFamily: Fonts.senRegular,
    fontSize: fontsSize.md,
    marginRight: 15,
  },
  box: {
    gap: 25,
  }
})
