import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'
import { Fonts, fontsSize } from '../Theme/fonts'
import { useTheme } from '../Hooks/useTheme';
import { useThemeStyles } from '../Hooks/useThemeStyles';

type FoodCardProps = {
  image: any;
  title: string;
  restaurant: string;
  price: number;
};

const FoodCard = ({
  image,
  title,
  restaurant,
  price,
}: FoodCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const { colors } = useTheme();
  const styles = useThemeStyles(getStyles);

  const animatedWidth = useSharedValue(34);

  useEffect(() => {
    if (quantity > 0) {
      animatedWidth.value = withTiming(85, { duration: 250, easing: Easing.bezier(0.25, 1, 0.5, 1) });
    } else {
      animatedWidth.value = withTiming(34, { duration: 250, easing: Easing.bezier(0.25, 1, 0.5, 1) });
    }
  }, [quantity]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value,
    };
  });

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode='contain' />

      <Text style={styles.title} numberOfLines={1}>{title}</Text>

      <Text style={styles.subtitle} numberOfLines={1}>{restaurant}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>${price}</Text>

        <Animated.View style={[styles.counterContainer, containerStyle]}>
          {/* Minus button */}
          <TouchableOpacity 
            style={styles.counterButton} 
            onPress={handleDecrease}
            activeOpacity={0.7}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>

          {/* Quantity text */}
          <View style={styles.quantityWrapper}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>

          {/* Plus button */}
          <TouchableOpacity 
            style={styles.plusButton} 
            onPress={handleIncrease}
            activeOpacity={0.7}
          >
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default FoodCard

const getStyles = (colors: any) => StyleSheet.create({
  card: {
    width: 180,
    alignSelf: "center",
    backgroundColor: colors.lightWhite,
    borderRadius: 24,
    padding: 12,
    margin: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.lightWhite === '#1C1C1E' ? '#2C2C2E' : 'transparent',
  },

  image: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
  },

  title: {
    fontFamily: Fonts.senBold,
    fontSize: fontsSize.md,
    color: colors.semiBlack,
    marginTop: 8,
  },

  subtitle: {
    fontFamily: Fonts.senRegular,
    fontSize: fontsSize.sm,
    color: colors.lightGrey,
    marginTop: 4,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },

  price: {
    fontFamily: Fonts.senBold,
    fontSize: fontsSize.smd,
    color: colors.semiBlack,
  },

  counterContainer: {
    height: 34,
    backgroundColor: colors.btnColor,
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 5,
    overflow: 'hidden',
  },

  counterButton: {
    width: 24,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterButtonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.senBold,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: Platform.OS === 'ios' ? 18 : 22,
  },

  quantityWrapper: {
    width: 27,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityText: {
    color: '#FFFFFF',
    fontFamily: Fonts.senBold,
    fontSize: 16,
    textAlign: 'center',
  },

  plusButton: {
    width: 24,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },

  plusButtonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.senBold,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: Platform.OS === 'ios' ? 18 : 22,
  },
});

