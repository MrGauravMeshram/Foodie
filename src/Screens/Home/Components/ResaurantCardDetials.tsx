import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import RestaurantCard from '../../../Components/RestaurantCard'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Fonts, fontsSize } from '../../../Theme/fonts'
import { Padding } from '../../../Theme/Spacing'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Animated, { SharedTransition } from 'react-native-reanimated';
import { useTheme } from '../../../Hooks/useTheme';
import { useThemeStyles } from '../../../Hooks/useThemeStyles';

const ResaurantCardDetials = ({ Data }: any) => {
  const navigation = useNavigation<any>();
  const transition = SharedTransition.duration(550).springify();
  const { colors } = useTheme();
  const styles = useThemeStyles(getStyles);

  const renderCard = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('RestaurantDetials', { restaurant: item })}
        style={styles.container}
      >
        <View>
          <RestaurantCard image={item.image} id={item.id} />
        </View>
        <View>
          <Text
            style={styles.title}
          >
            {item.name}
          </Text>
          <Text style={styles.subtitle}>{item.category}</Text>
        </View>
        <View style={styles.rate}>
          <View style={styles.icon}>
            <Feather name="star" color={colors.btnColor} size={24} />
            <Text style={styles.rateText}>{item.rating}</Text>
          </View>
          <View style={styles.icon}>
            <Feather name="truck" color={colors.btnColor} size={24} />
            <Text style={styles.rateText}>Free</Text>
          </View>
          <View style={styles.icon}>
            <Fontisto name="clock" color={colors.btnColor} size={24} />
            <Text style={styles.rateText}>{item.deliveryTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
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

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingVertical: Padding.sPadding
  },
  title: {
    fontFamily: Fonts.senBold,
    color: colors.black,
    paddingTop: Padding.sPadding,
    fontSize: fontsSize.large
  },
  subtitle: {
    fontFamily: Fonts.senRegular,
    color: colors.lightGrey
  },
  rate: {
    marginTop: 10,
    flexDirection: "row",
    gap: 15,
  },
  icon: {
    flexDirection: "row", gap: 10, alignItems: "center"
  },
  rateText: {
    fontFamily: Fonts.senRegular,
    color: colors.black,
    fontSize: fontsSize.md,
  }
})