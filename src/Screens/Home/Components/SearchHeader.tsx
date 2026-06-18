import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import LeftArrow from '../../../Components/LeftArrow';
import { Colors } from '../../../Theme/Color';
import { Fonts, fontsSize } from '../../../Theme/fonts';
import { Padding } from '../../../Theme/Spacing';

const SearchHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
        <LeftArrow containerStyle={styles.backButton} />
      </TouchableOpacity>

      <Text style={styles.title}>Search</Text>

      <TouchableOpacity style={styles.cartContainer} activeOpacity={0.8}>
        <Feather name="shopping-bag" color={Colors.whiteIcon} size={22} />

      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   
    paddingVertical: 15,
    backgroundColor: Colors.backgroundColor,
  },
  backButton: {
    backgroundColor: Colors.sideBarIcon,
    height: 45,
    width: 45,
    borderRadius: 22.5,
  },
  title: {
    fontSize: fontsSize.smd,
    fontFamily: Fonts.senMedium,
    color: Colors.semiBlack,
    flex: 1,
    marginLeft: 20,
  },
  cartContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.semiBlack,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: Colors.btnColor,
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.whiteIcon,
    fontSize: 10,
    fontFamily: Fonts.senBold,
  },
});
