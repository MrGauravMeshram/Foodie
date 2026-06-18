import { View, Text, Animated, LayoutChangeEvent } from 'react-native'
import React ,{useState,useEffect,useRef}from 'react'
import {Style} from '../../Styles/HomeScreenStyle'
import SearchBar from '../../Components/SearchBar'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CategoriesData } from '../../Data/CategoriesData'
import { Colors } from '../../Theme/Color';
import ResaurantCardDetials from './Components/ResaurantCardDetials';
import Pill from '../../Components/Pill';
import { RestaurantData } from '../../Data/RestaurantData';
import CouponModal from './Components/CoupenModal';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import HomeScreenHeader from './Components/HomeScreenHeader';
import {FoodCardData} from '../../Data/FoodCardData'
import FoodCardmenu from './Components/FoodCardmenu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({route}:any) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('1');
  const navigation = useNavigation<any>();
  const { city, state, address } = route.params;

  const insets = useSafeAreaInsets();
  const topInset = insets.top;

  const scrollY = useRef(new Animated.Value(0)).current;

  const [searchBarY, setSearchBarY] = useState(0);
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [pillY, setPillY] = useState(0);

  const handleSearchBarLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setSearchBarY(y);
    setSearchBarHeight(height);
  };

  const handlePillLayout = (event: LayoutChangeEvent) => {
    const { y } = event.nativeEvent.layout;
    setPillY(y);
  };

  console.log(city);
  console.log(state);
  console.log(address);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const searchBarLimit = searchBarY - topInset;
  const searchBarTranslateY = (searchBarY > 0 && searchBarLimit > 0)
    ? scrollY.interpolate({
        inputRange: [0, searchBarLimit, searchBarLimit + 1],
        outputRange: [0, 0, 1],
        extrapolateLeft: 'clamp',
      })
    : 0;

  const pillLimit = pillY - (searchBarHeight + topInset);
  const pillTranslateY = (pillY > 0 && searchBarHeight > 0 && pillLimit > 0)
    ? scrollY.interpolate({
        inputRange: [0, pillLimit, pillLimit + 1],
        outputRange: [0, 0, 1],
        extrapolateLeft: 'clamp',
      })
    : 0;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: topInset,
          backgroundColor: Colors.white,
          zIndex: 11,
        }}
      />

      <Animated.ScrollView
        style={Style.Container}
        overScrollMode='never'
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View>
          <HomeScreenHeader address={address} />
          <CouponModal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
          />
          <Text style={Style.nameText}>Hey Hero Good Afternoon</Text>
        </View>

        <Animated.View
          style={{
            transform: [{ translateY: searchBarTranslateY }],
            zIndex: 10,
            backgroundColor: Colors.white,
          }}
          onLayout={handleSearchBarLayout}
        >
          <TouchableOpacity
            style={Style.search}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <View pointerEvents="none">
              <SearchBar />
            </View>
          </TouchableOpacity>
        </Animated.View>

        <View style={Style.Categories}>
          <Text style={Style.CategoriesTitle}>All Categories</Text>
          <View style={Style.SeeAll}>
            <Text style={Style.CategoriesSubtitle}>See All</Text>
            <MaterialIcons name="keyboard-arrow-right" color={Colors.lightGrey} size={26} />
          </View>
        </View>

        <Animated.View
          style={{
            transform: [{ translateY: pillTranslateY }],
            zIndex: 9,
            backgroundColor: Colors.white,
          }}
          onLayout={handlePillLayout}
        >
          
            <Pill
              Data={CategoriesData}
              active={selectedCategory}
              onSelect={setSelectedCategory}
            />
        
        </Animated.View>

        <View style={{ marginTop: 15 }}>
          <FoodCardmenu Data={FoodCardData} />
        </View>

        <View style={Style.Categories}>
          <Text style={Style.CategoriesTitle}>Open Restaurants</Text>
          <View style={Style.SeeAll}>
            <Text style={Style.CategoriesSubtitle}>See All</Text>
            <MaterialIcons name="keyboard-arrow-right" color={Colors.lightGrey} size={26} />
          </View>
        </View>

        <View>
          <ResaurantCardDetials Data={RestaurantData} />
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default HomeScreen;

