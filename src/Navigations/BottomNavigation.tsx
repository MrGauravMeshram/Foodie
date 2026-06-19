
import React from 'react'
import HomeScreen from '../Screens/Home/HomeScreen'
import OfferScreen from '../Screens/Offer/Offer'
import { Colors } from '../Theme/Color'
import { Fonts } from '../Theme/fonts'
import ProfileScreen from '../Screens/Profile/ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                sceneStyle: {
                    backgroundColor: 'transparent',
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: Fonts.senRegular,
                },
                tabBarStyle: {
                    height: 60,
                    width: 320,
                    marginBottom: 20,
                    marginHorizontal: 10,
                    borderRadius: 70,
                    alignItems: 'center',
                    elevation: 0,
                    backgroundColor:"transparent",
                    justifyContent: 'center',

                },


            }}

        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color="#000" size={24} />
                ),

            }} />
            <Tab.Screen name="Offer" component={OfferScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ticket-outline" color="#000" size={24} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" color="#000" size={24} />
                ),
            }} />
        </Tab.Navigator>

    )
}

export default BottomNavigation