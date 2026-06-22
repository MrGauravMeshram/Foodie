import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import RestaurantCard from '../../../Components/RestaurantCard'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Fonts, fontsSize } from '../../../Theme/fonts'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../Hooks/useTheme';
import { useThemeStyles } from '../../../Hooks/useThemeStyles';

const ResaurantCardDetials = ({ Data }: any) => {
  const navigation = useNavigation<any>();
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
        <View style={styles.detailsContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Feather name="star" color="#FFFFFF" size={10} />
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
              {item.category}
            </Text>
            <View style={styles.deliveryInfo}>
              <Fontisto name="clock" color={colors.lightGrey} size={13} style={styles.iconMargin} />
              <Text style={styles.deliveryText}>{item.deliveryTime}</Text>
              <Text style={styles.bullet}>•</Text>
              <Feather name="truck" color={colors.lightGrey} size={13} style={styles.iconMargin} />
              <Text style={styles.deliveryText}>Free</Text>
            </View>
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
      contentContainerStyle={styles.listContainer}
    />
  )
}

export default ResaurantCardDetials

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.zomatoBg,
    borderWidth: 1,
    borderColor: colors.lightGrey + '22',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.senBold,
    color: colors.black,
    fontSize: fontsSize.large,
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#24963F',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: {
    color: '#FFFFFF',
    fontFamily: Fonts.senBold,
    fontSize: 13,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  subtitle: {
    flex: 1,
    fontFamily: Fonts.senRegular,
    color: colors.lightGrey,
    fontSize: fontsSize.md,
    marginRight: 10,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryText: {
    fontFamily: Fonts.senRegular,
    color: colors.lightGrey,
    fontSize: fontsSize.md - 1,
  },
  bullet: {
    color: colors.lightGrey,
    marginHorizontal: 2,
  },
  iconMargin: {
    marginRight: 2,
  },
  listContainer: {
    gap: 16,
  }
})