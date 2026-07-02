import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
const Drawer = createDrawerNavigator();


import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>

                <DrawerItem
                    label="Home"
                    onPress={() => { props.navigation.navigate("Home") }}
                />
                <DrawerItem
                    label="Profile"
                    onPress={() => { props.navigation.navigate("Profile") }}
                />
            </DrawerContentScrollView>
    );
}




const DrawerNavigation = () => {
    return (
        <Drawer.Navigator

            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                drawerStyle: { width: '70%' },
            }}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation