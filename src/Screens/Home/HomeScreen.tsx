import { View, Text,ScrollView } from 'react-native'
import React ,{useState,useEffect}from 'react'
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
const HomeScreen = ({route}:any) => {
    const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('1');
  const navigation = useNavigation<any>();
const { city, state, address } = route.params;

console.log(city);
console.log(state);
console.log(address);
  useEffect(() => {
    setShowModal(true);
  }, []);

return(
    <ScrollView style={Style.Container}
    overScrollMode='never'>
    <View>
<HomeScreenHeader address = {address}/>
       <CouponModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
      <Text style={Style.nameText}>Hey Hero Good Afternoon</Text>
       <TouchableOpacity
        style={Style.search}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('SearchScreen')}
       >
         <View pointerEvents="none">
           <SearchBar/>
         </View>
       </TouchableOpacity>
    </View>
    <View style={Style.Categories}>
      <Text style={Style.CategoriesTitle}>All Categories</Text>
      <View style={Style.SeeAll}>
        <Text style={Style.CategoriesSubtitle}>See All</Text>
           <MaterialIcons name="keyboard-arrow-right" color={Colors.lightGrey} size={26} />
      </View>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate("PopularItem")}>
 <Pill Data = {CategoriesData} active={selectedCategory}
  onSelect={setSelectedCategory}/>
    </TouchableOpacity>
     <View style={{marginTop:15}}>
    <FoodCardmenu Data ={FoodCardData}/>
    </View>
     <View style={Style.Categories}>
      <Text style={Style.CategoriesTitle}>Open Restaurants</Text>
      <View style={Style.SeeAll}>
        <Text style={Style.CategoriesSubtitle}>See All</Text>
           <MaterialIcons name="keyboard-arrow-right" color={Colors.lightGrey} size={26} />
      </View>
    </View>

   
<View>
  <ResaurantCardDetials Data = {RestaurantData}/>
</View>
   </ScrollView>
  )
}

export default HomeScreen;
