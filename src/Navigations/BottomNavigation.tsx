import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import HomeScreen from '../Screens/Home/HomeScreen'
import OfferScreen from '../Screens/Offer/Offer'
import { Colors } from '../Theme/Color'
import { Fonts } from '../Theme/fonts'
import ProfileScreen from '../Screens/Profile/ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useTabBar } from '../Utils/TabBarContext';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const { tabBarTranslateY } = useTabBar();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: tabBarTranslateY.value },
            ],
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const IconComponent = options.tabBarIcon;

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[
                            styles.tabButton,
                            isFocused && styles.tabButtonActive
                        ]}
                        activeOpacity={0.8}
                    >
                        {IconComponent && IconComponent({
                            focused: isFocused,
                            color: isFocused ? Colors.zomatoRed : Colors.zomatoInactive,
                            size: 20
                        })}
                        {isFocused && (
                            <Text style={styles.tabLabelActive}>
                                {label}
                            </Text>
                        )}
                        {!isFocused && (
                            <Text style={styles.tabLabelInactive}>
                                {label}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </Animated.View>
    );
};

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                sceneStyle: {
                    backgroundColor: 'transparent',
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home-outline" color={color} size={22} />
                ),
            }} />
            <Tab.Screen name="Offer" component={OfferScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="ticket-outline" color={color} size={22} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="person-outline" color={color} size={22} />
                ),
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        height: 60,
        width: 330,
        alignSelf: 'center',
        backgroundColor: Colors.zomatoBg,
        borderRadius: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 46,
        borderRadius: 23,
        marginHorizontal: 4,
        backgroundColor: 'transparent',
    },
    tabButtonActive: {
        backgroundColor: Colors.zomatoRedLight,
    },
    tabLabelActive: {
        fontSize: 13,
        fontFamily: Fonts.senBold,
        marginLeft: 6,
        color: Colors.zomatoRed,
    },
    tabLabelInactive: {
        fontSize: 13,
        fontFamily: Fonts.senRegular,
        marginLeft: 6,
        color: Colors.zomatoInactive,
    },
});

export default BottomNavigation;