import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../Theme/Color';
import { Fonts, fontsSize } from '../../../Theme/fonts';
import { Spacing } from '../../../Theme/Spacing';

type RestaurantItem = {
  id: string;
  name: string;
  rating: number;
  image: string;
};

type Props = {
  data: RestaurantItem[];
  onPressRestaurant?: (id: string) => void;
};

const SuggestedRestaurants = ({ data, onPressRestaurant }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Restaurants</Text>
      <View style={styles.list}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemWrapper}
            activeOpacity={0.8}
            onPress={() => onPressRestaurant && onPressRestaurant(item.id)}
          >
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.ratingRow}>
                  <MaterialIcons name="star" color={Colors.btnColor} size={18} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
            </View>
            {index < data.length - 1 && <View style={styles.divider} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SuggestedRestaurants;

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.lm,
   
  },
  title: {
    fontSize: fontsSize.smd,
    fontFamily: Fonts.senBold,
    color: Colors.subtitleColor,
    marginBottom: Spacing.sm,
  },
  list: {
    backgroundColor: Colors.white,
  },
  itemWrapper: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  image: {
    width: 60,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.sideBarIcon,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: fontsSize.sm + 3,
    fontFamily: Fonts.senRegular,
    color: Colors.black,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: fontsSize.sm+2,
    fontFamily: Fonts.senRegular,
    color: Colors.lightGrey,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F2F4',
    width: '100%',
  },
});
