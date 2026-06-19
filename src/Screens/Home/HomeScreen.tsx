import { View, Text, Animated, LayoutChangeEvent } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { getStyle } from '../../Styles/HomeScreenStyle'
import SearchBar from '../../Components/SearchBar'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CategoriesData } from '../../Data/CategoriesData'
import ResaurantCardDetials from './Components/ResaurantCardDetials';
import Pill from '../../Components/Pill';
import { RestaurantData } from '../../Data/RestaurantData';
import { Padding } from '../../Theme/Spacing'
import CouponModal from './Components/CoupenModal';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import HomeScreenHeader from './Components/HomeScreenHeader';
import { FoodCardData } from '../../Data/FoodCardData'
import FoodCardmenu from './Components/FoodCardmenu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Easing, withTiming, withSpring } from 'react-native-reanimated';
import { useTabBar } from '../../Utils/TabBarContext';
import { useTheme } from '../../Hooks/useTheme';
import { useThemeStyles } from '../../Hooks/useThemeStyles';

const HomeScreen = ({ route }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('1');
  const navigation = useNavigation<any>();
  const { city, state, address } = route.params || {};

  const { colors, isDarkMode } = useTheme();
  const Style = useThemeStyles(getStyle);

  const insets = useSafeAreaInsets();
  const topInset = insets.top;

  const scrollY = useRef(new Animated.Value(0)).current;
  const { tabBarTranslateY } = useTabBar();
  const lastScrollY = useRef(0);
  const tabBarState = useRef(0);
  const layoutHeight = useRef(0);
  const contentHeight = useRef(0);

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

  const springConfig = useRef({
    damping: 18,
    stiffness: 90,
    mass: 0.8,
  }).current;

  const handleScroll = (value: number) => {
    const diff = value - lastScrollY.current;
    lastScrollY.current = value;

    const limit = searchBarY - topInset;


    if (value < limit) {
      if (tabBarState.current !== 0) {
        tabBarState.current = 0;
        tabBarTranslateY.value = withSpring(0, springConfig);
      }
      return;
    }


    if (layoutHeight.current > 0 && contentHeight.current > 0 && (value + layoutHeight.current >= contentHeight.current - 50)) {
      if (tabBarState.current !== 0) {
        tabBarState.current = 0;
        tabBarTranslateY.value = withSpring(0, springConfig);
      }
      return;
    }


    if (diff > 0.05) {
      if (tabBarState.current !== 150) {
        tabBarState.current = 150;
        tabBarTranslateY.value = withSpring(150, springConfig);
      }
    } else if (diff < -0.05) {
      if (tabBarState.current !== 0) {
        tabBarState.current = 0;
        tabBarTranslateY.value = withSpring(0, springConfig);
      }
    }
  };

  const handleScrollEnd = () => {
    if (tabBarState.current !== 0) {
      tabBarState.current = 0;
      tabBarTranslateY.value = withSpring(0, springConfig);
    }
  };

  useEffect(() => {
    setShowModal(true);

    const listenerId = scrollY.addListener(({ value }) => {
      handleScroll(value);
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [searchBarY, topInset]);

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
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: topInset,
          backgroundColor: colors.backgroundColor,
          zIndex: 11,
        }}
      />

      <Animated.ScrollView
        style={Style.Container}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onScrollEndDrag={(event) => {
          handleScroll(event.nativeEvent.contentOffset.y);
          const velocityY = event.nativeEvent.velocity?.y ?? 0;
          if (velocityY === 0) {
            handleScrollEnd();
          }
        }}
        onMomentumScrollEnd={(event) => {
          handleScroll(event.nativeEvent.contentOffset.y);
          handleScrollEnd();
        }}
        onLayout={(event) => {
          layoutHeight.current = event.nativeEvent.layout.height;
        }}
        onContentSizeChange={(width, height) => {
          contentHeight.current = height;
        }}
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
            backgroundColor: colors.backgroundColor,
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
            <MaterialIcons name="keyboard-arrow-right" color={colors.lightGrey} size={26} />
          </View>
        </View>

        <Animated.View
          style={{
            transform: [{ translateY: pillTranslateY }],
            zIndex: 9,
            backgroundColor: colors.backgroundColor,
            paddingLeft: Padding.mPadding
          }}
          onLayout={handlePillLayout}
        >

          <Pill
            Data={CategoriesData}
            active={selectedCategory}
            onSelect={setSelectedCategory}
          />

        </Animated.View>

        <View style={{ marginTop: 15, paddingLeft: Padding.mPadding }}>
          <FoodCardmenu Data={FoodCardData} />
        </View>

        <View style={Style.Categories}>
          <Text style={Style.CategoriesTitle}>Open Restaurants</Text>
          <View style={Style.SeeAll}>
            <Text style={Style.CategoriesSubtitle}>See All</Text>
            <MaterialIcons name="keyboard-arrow-right" color={colors.lightGrey} size={26} />
          </View>
        </View>

        <View style={{ paddingHorizontal: Padding.mPadding }}>
          <ResaurantCardDetials Data={RestaurantData} />
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default HomeScreen;


