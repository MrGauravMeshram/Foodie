
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from 'react-native';
import SplashScree from '../Screens/SplashScreen/SplashScree';
import OnBoarding from '../Screens/Auth/OnBoardingScreen/OnBoarding';
import Login from '../Screens/Auth/AuthenticationScreen/Login';
import LeftArrow from '../Components/LeftArrow';
import SignUp from '../Screens/Auth/AuthenticationScreen/SignUp'
import VerificationScreen from '../Screens/Auth/AuthenticationScreen/VerificationScreen';
import ForgotPassword from '../Screens/Auth/AuthenticationScreen/ForgotPassword';
import HomeScreen from "../Screens/Home/HomeScreen";
import LocationPremission from "../Screens/Auth/LocationPremission/LocationPremission";
import HomeScreenHeader from "../Screens/Home/Components/HomeScreenHeader";
import SearchScreen from "../Screens/Home/SearchScreen";
import RestaurantDetials from "../Screens/ResaurantDetialsScreen/RestaurantDetials";
import PopularItemScreen from "../Screens/Home/PopularItemScreen";

import React from 'react'


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" >
                <Stack.Screen name="SplashScreen" component={SplashScree} options={{ headerShown: false }} />
                <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: 16 }}
                        >
                            <LeftArrow />
                        </TouchableOpacity>
                    ),
                })} />
                <Stack.Screen name="Verification" component={VerificationScreen} options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: 16 }}
                        >
                            <LeftArrow />
                        </TouchableOpacity>
                    ),
                })} />
                <Stack.Screen name="SignUp" component={SignUp} options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: 16 }}
                        >
                            <LeftArrow />
                        </TouchableOpacity>
                    ),
                })} />
                <Stack.Screen name="LocationPremission" component={LocationPremission} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PopularItem" component={PopularItemScreen} options={{ headerShown: false }} />
                <Stack.Screen name="RestaurantDetials" component={RestaurantDetials} options={{ headerShown: false, animation: 'fade', }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation