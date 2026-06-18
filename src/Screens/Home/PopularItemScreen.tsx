import { View, Text, StyleSheet, FlatList ,ScrollView} from 'react-native'
import SearchHeader from './Components/SearchHeader'
import { Colors } from '../../Theme/Color'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Padding, Spacing } from '../../Theme/Spacing'
import { Fonts, fontsSize } from '../../Theme/fonts'
import { FoodData } from '../../Data/FoodData'
import { RestaurantData } from '../../Data/RestaurantData'
import ResaurantCardDetials from './Components/ResaurantCardDetials'
import FoodCard from '../../Components/FoodCard'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../State/store'
import { setSelectedCategory } from '../../State/PopularSlice'
import { CategoriesData } from '../../Data/CategoriesData'

const PopularItemScreen = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.popular.selectedCategory);

  const categories = CategoriesData;

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
      <SearchHeader
        icon="search"
        title="Burger"
        data={categories}
        selectedValue={selectedCategory}
        onSelect={(item: any) => dispatch(setSelectedCategory(item.title))}
        showFilter={true}
        onFilterPress={() => console.log('Filter pressed')}
      />

      <Text style={style.popularText}>Popular {selectedCategory}</Text>
<View style={style.Popular}>
      <FlatList
        data={FoodData[selectedCategory as keyof typeof FoodData] || []}
        renderItem={({ item }) => (
          <FoodCard
            image={item.image}
            title={item.name}
            restaurant={item.restaurant}
            price={item.price}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={style.columnWrapper}
        contentContainerStyle={style.listContent}
        scrollEnabled={false}
      />
      </View>
      <View>
         <Text style={style.CategoriesTitle}>Open Restaurants</Text>
      </View>
      <View>
  <ResaurantCardDetials Data = {RestaurantData}/>
</View>
</ScrollView>
    </SafeAreaView>
  );
};

export default PopularItemScreen

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Padding.mPadding
  },
  popularText: {
    fontSize: fontsSize.smd,
    fontFamily: Fonts.senMedium,
    color: Colors.semiBlack,
    marginTop: 15,
    marginBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  Popular:{
      height:550
  },
   CategoriesTitle:{
       color:Colors.subtitleColor,
       fontFamily:Fonts.senSemiBold,
       fontSize:fontsSize.smd,
       marginTop:Spacing.md
    },
})