import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Padding, Spacing } from '../Theme/Spacing'
import { Fonts, fontsSize } from '../Theme/fonts'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../State/PopularSlice';
import { useTheme } from '../Hooks/useTheme';
import { useThemeStyles } from '../Hooks/useThemeStyles';

type props = {
  Data: any,
  active: any,
  onSelect: (id: string) => void;
}

const Pill = ({ Data, active, onSelect }: props) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const styles = useThemeStyles(getStyles);

  const onPressSelect = (item: any) => {
    onSelect(item.id)
    dispatch(setSelectedCategory(item.title))
    navigation.navigate("PopularItem")
  }

  const renderPill = ({ item, index }: any) => {
    const isSelected = active === item.id;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPressSelect(item)}
        style={[
          styles.container,
          {
            backgroundColor: isSelected
              ? '#FFD27A'
              : colors.lightWhite,
          },
        ]}>
        <View style={styles.imagecontain}>
          <Image
            source={{ uri: item.image }}
            style={{ height: "100%", width: "100%", borderRadius: 50 }}
            resizeMode='cover' />
        </View>
        <View>
          <Text style={[styles.text, { color: isSelected ? '#000000' : colors.black }]}>{item.title}</Text>
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
      contentContainerStyle={styles.box}
      nestedScrollEnabled
    />
  )
}

export default Pill

const getStyles = (colors: any) => StyleSheet.create({
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

