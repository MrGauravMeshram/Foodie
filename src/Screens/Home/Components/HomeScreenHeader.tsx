import { View, Text ,StyleSheet,StatusBar,TouchableOpacity} from 'react-native'
import React from 'react'
import Foundation from 'react-native-vector-icons/Foundation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Padding, Spacing } from '../../../Theme/Spacing';
import { Fonts,fontsSize as Font } from '../../../Theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../Hooks/useTheme';
import { useThemeStyles } from '../../../Hooks/useThemeStyles';

const HomeScreenHeader = ({address}:any) => {
  const navigation = useNavigation<any>()
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const styles = useThemeStyles(getStyles);

  return (
    <SafeAreaView style={styles.HeaderContainer}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.backgroundColor}/>
        <View style={{flexDirection:"row",alignItems:"center",gap:15,flex:1,marginRight:15}}>
          <View style={styles.sidebar}>
            <Foundation name="align-left" color={colors.BlackIcon} size={24} />
          </View>
          <View style={{flex:1}}>
            <Text style={styles.Deliverytitle}>DELIVERY TO</Text>
            <Text style={styles.locationSubtile} numberOfLines={1} ellipsizeMode="tail">{address || 'Select Location'}</Text>
          </View>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
          <TouchableOpacity style={styles.sidebar} onPress={toggleTheme} activeOpacity={0.8}>
            <Ionicons name={isDarkMode ? "sunny" : "moon"} color={colors.BlackIcon} size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sidebar,{backgroundColor:colors.semiBlack}]} onPress={()=>navigation.navigate('CartScreen')} activeOpacity={0.8}>
            <Feather name="shopping-bag" color={isDarkMode ? colors.white : "#FFF"} size={22} />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreenHeader

const getStyles = (colors: any) => StyleSheet.create({
    HeaderContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        height:120,
        backgroundColor:colors.backgroundColor,
        paddingTop:Spacing.md,
        alignItems:"center",
        paddingHorizontal:Padding.mPadding
    },
    sidebar:{
            height:45,
            width:45,
            backgroundColor:colors.sideBarIcon,
            borderRadius:100,
            justifyContent:"center",
            alignItems:"center",
    },
    Deliverytitle:{
       fontFamily:Fonts.senBold,
       color:colors.btnColor,
       fontSize:Font.sm
    },
    locationSubtile:{
       fontFamily:Fonts.senRegular,
       fontSize:Font.md,
       color:colors.lightGrey
    }
})

