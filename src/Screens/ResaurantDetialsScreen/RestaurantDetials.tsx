import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Animated, { SharedTransition } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../../Theme/Color';
import { Fonts, fontsSize } from '../../Theme/fonts';
import { style } from '../../Styles/RestaurantDetialsStyle';
import { Spacing, Padding } from '../../Theme/Spacing';
import { FoodData } from '../../Data/FoodData';

const { width: screenWidth } = Dimensions.get('window');

const RestaurantDetials = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { restaurant } = route.params || {};
  const transition = SharedTransition.duration(550).springify();


  const currentRestaurant = restaurant || {
    id: '1',
    name: 'Paradise Biryani',
    category: 'Biryani • Hyderabadi • Mughlai',
    rating: 4.7,
    deliveryTime: '25 min',
    deliveryFee: 'Free',
    image: 'https://i.pinimg.com/1200x/55/7e/2b/557e2bc0a6b57a247264d1968f6d0d2a.jpg',
    location: 'Secunderabad',
  };

 
  const subCategories = currentRestaurant.category
    ? currentRestaurant.category.split(' • ')
    : ['Burger', 'Pizza', 'Biryani'];

  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategories[0]);

  
  const foodList = FoodData[selectedSubCategory as keyof typeof FoodData] || FoodData.Burger || [];

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      
        <View style={style.imageContainer}>
          <Animated.Image
            source={{ uri: currentRestaurant.image }}
            style={style.banner}
            resizeMode="cover"
            sharedTransitionTag={`restaurant-image-${currentRestaurant.id}`}
            sharedTransitionStyle={transition}
          />

          {/* Overlays */}
          <TouchableOpacity
            style={[style.circleButton, style.backBtn]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={24} color={Colors.black} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[style.circleButton, style.moreBtn]}
            activeOpacity={0.8}
          >
            <Feather name="more-horizontal" size={24} color={Colors.black} />
          </TouchableOpacity>

         
          </View>
      

     
        <View style={style.detailsWrapper}>
          <View style={style.infoRow}>
            <View style={style.infoItem}>
              <Feather name="star" color={Colors.btnColor} size={20} />
              <Text style={style.infoText}>{currentRestaurant.rating}</Text>
            </View>
            <View style={style.infoItem}>
              <Feather name="truck" color={Colors.btnColor} size={20} />
              <Text style={style.infoText}>{currentRestaurant.deliveryFee || 'Free'}</Text>
            </View>
            <View style={style.infoItem}>
              <Fontisto name="clock" color={Colors.btnColor} size={18} />
              <Text style={style.infoText}>{currentRestaurant.deliveryTime}</Text>
            </View>
          </View>

        
          <Animated.Text
            style={style.restaurantName}
            sharedTransitionTag={`restaurant-title-${currentRestaurant.id}`}
          
          >
            {currentRestaurant.name}
          </Animated.Text>

          <Text style={style.description}>
            Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          </Text>
        </View>

      
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.pillsContainer}
        >
          {subCategories.map((cat: string, index: number) => {
            const isSelected = selectedSubCategory === cat;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setSelectedSubCategory(cat)}
                style={[
                  style.pill,
                  {
                    backgroundColor: isSelected ? Colors.btnColor : Colors.white,
                    borderColor: isSelected ? Colors.btnColor : '#E9E9E9',
                  },
                ]}
              >
                <Text
                  style={[
                    style.pillText,
                    {
                      color: isSelected ? Colors.white : Colors.subtitleColor,
                      fontFamily: isSelected ? Fonts.senBold : Fonts.senRegular,
                    },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Food Grid Section */}
        <View style={style.foodSectionHeader}>
          <Text style={style.foodSectionTitle}>
            {selectedSubCategory} ({foodList.length})
          </Text>
        </View>

        <View style={style.gridContainer}>
          {foodList.map((item: any, index: number) => (
            <View key={item.id || index} style={style.foodCard}>
              <View style={style.foodImageWrapper}>
                <Image source={{ uri: item.image }} style={style.foodImage} />
              </View>
              <View style={style.foodDetails}>
                <Text style={style.foodTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={style.foodRestaurant} numberOfLines={1}>
                  {item.restaurant}
                </Text>
                <View style={style.priceRow}>
                  <Text style={style.foodPrice}>${item.price}</Text>
                  <TouchableOpacity style={style.addButton} activeOpacity={0.8}>
                    <Feather name="plus" size={16} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantDetials;

