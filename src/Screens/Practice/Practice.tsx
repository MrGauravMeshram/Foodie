import { View, Text ,ScrollView,SectionList} from 'react-native'
import SearchHeader from '../Home/Components/SearchHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const Practice = () => {
const data = [
  {
    title: 'Kitchen',
    data: [
      'Rice',
      'Wheat Flour',
      'Sugar',
      'Salt',
      'Cooking Oil',
      'Tea Powder',
      'Coffee Powder',
      'Turmeric Powder',
      'Red Chilli Powder',
      'Coriander Powder',
      'Cumin Seeds',
      'Mustard Seeds',
      'Garam Masala',
      'Tomato Sauce',
      'Vinegar',
      'Honey',
      'Pasta',
      'Noodles',
      'Biscuits',
      'Snacks',
    ],
  },
  {
    title: 'Vegetables',
    data: [
      'Potato',
      'Tomato',
      'Onion',
      'Carrot',
      'Cabbage',
      'Cauliflower',
      'Spinach',
      'Brinjal',
      'Capsicum',
      'Beans',
      'Peas',
      'Cucumber',
      'Radish',
      'Beetroot',
      'Pumpkin',
    ],
  },
  {
    title: 'Fruits',
    data: [
      'Apple',
      'Banana',
      'Orange',
      'Mango',
      'Grapes',
      'Pineapple',
      'Papaya',
      'Watermelon',
      'Pomegranate',
      'Guava',
      'Kiwi',
      'Strawberry',
    ],
  },
  {
    title: 'Dairy',
    data: [
      'Milk',
      'Curd',
      'Butter',
      'Cheese',
      'Paneer',
      'Ghee',
      'Cream',
      'Yogurt',
    ],
  },
  {
    title: 'Beverages',
    data: [
      'Tea',
      'Coffee',
      'Juice',
      'Soft Drink',
      'Energy Drink',
      'Mineral Water',
      'Lemon Juice',
      'Coconut Water',
    ],
  },
  {
    title: 'Bakery',
    data: [
      'Bread',
      'Burger Bun',
      'Pizza Base',
      'Croissant',
      'Muffin',
      'Cupcake',
      'Donut',
      'Cookies',
      'Brownie',
      'Cake',
    ],
  },
  {
    title: 'Snacks',
    data: [
      'Chips',
      'Nachos',
      'Popcorn',
      'Crackers',
      'Peanuts',
      'Almonds',
      'Cashews',
      'Trail Mix',
      'Protein Bar',
      'Corn Puffs',
    ],
  },
  {
    title: 'Frozen Foods',
    data: [
      'Frozen Peas',
      'Frozen Corn',
      'Frozen Pizza',
      'Ice Cream',
      'Frozen Berries',
      'Frozen French Fries',
      'Frozen Nuggets',
      'Frozen Paneer',
    ],
  },
  {
    title: 'Personal Care',
    data: [
      'Shampoo',
      'Conditioner',
      'Soap',
      'Face Wash',
      'Toothpaste',
      'Toothbrush',
      'Body Lotion',
      'Deodorant',
      'Hair Oil',
      'Sunscreen',
    ],
  },
  {
    title: 'Cleaning Supplies',
    data: [
      'Detergent',
      'Dish Wash Liquid',
      'Floor Cleaner',
      'Glass Cleaner',
      'Toilet Cleaner',
      'Scrub Pad',
      'Garbage Bags',
      'Disinfectant Spray',
      'Cleaning Cloth',
      'Mop',
    ],
  },
  {
    title: 'Electronics',
    data: [
      'Mobile Phone',
      'Laptop',
      'Keyboard',
      'Mouse',
      'Monitor',
      'Headphones',
      'Speaker',
      'Power Bank',
      'Smart Watch',
      'Charger',
    ],
  },
  {
    title: 'Stationery',
    data: [
      'Notebook',
      'Pen',
      'Pencil',
      'Eraser',
      'Sharpener',
      'Marker',
      'Highlighter',
      'Scale',
      'Glue Stick',
      'Stapler',
    ],
  },
];
  return (
   
    <SafeAreaView>
        
    
     <SectionList
     sections={data}
      stickyHeaderIndices={[0]}
    ListHeaderComponent={
      <SearchHeader title="Practice" />
    }
     renderItem={({item}:any)=>{
        return(
            <View>
                <Text>{item}</Text>
            </View>
        )
     }}
   renderSectionHeader={({section}:any)=>{
    return(
        <View style={{backgroundColor:"grey"}}>
            <Text style={{fontSize:24}}>{section.title}</Text>
        </View>
    )

   }}
   stickySectionHeadersEnabled={true}/>
   
    </SafeAreaView>
    

  )
}

export default Practice