
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from 'react-native';
import SplashScree from '../Screens/SplashScreen/SplashScree';
import OnBoarding from '../Screens/Auth/OnBoardingScreen/OnBoarding';
import Login from '../Screens/Auth/AuthenticationScreen.tsx/Login';
import LeftArrow from '../Components/LeftArrow';
import SignUp from '../Screens/Auth/AuthenticationScreen.tsx/SignUp'
import VerificationScreen from '../Screens/Auth/AuthenticationScreen.tsx/VerificationScreen';
import ForgotPassword from '../Screens/Auth/AuthenticationScreen.tsx/ForgotPassword';



import React from 'react'


const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation