import { View, Text ,StyleSheet,StatusBar,TouchableOpacity} from 'react-native'
import React from 'react'
import Foundation from 'react-native-vector-icons/Foundation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { Padding, Spacing } from '../../../Theme/Spacing';
import { Fonts,fontsSize as Font } from '../../../Theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../Theme/Color';
const HomeScreenHeader = ({address}:any) => {
  const navigation = useNavigation<any>()
  return (
    <SafeAreaView style={style.HeaderContainer}>
        <StatusBar barStyle={'dark-content'}/>
        <View style={{flexDirection:"row",alignItems:"center",gap:15,flex:1,marginRight:15}}>
        <View style={style.sidebar}>
    <Foundation name="align-left" color="#000" size={24} />
        </View>
        <View style={{flex:1}}>
      <Text style={style.Deliverytitle}>DELIVERY TO</Text>
      <Text style={style.locationSubtile} numberOfLines={1} ellipsizeMode="tail">{address || 'Select Location'}</Text>
      </View>
      </View>
      <TouchableOpacity style={[style.sidebar,{backgroundColor:Colors.semiBlack}]} onPress={()=>navigation.navigate('CartScreen')}>
          <Feather name="shopping-bag" color="#FFF" size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreenHeader

const style = StyleSheet.create({
    HeaderContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        height:120,
        backgroundColor:Colors.white,
        paddingTop:Spacing.md
,        alignItems:"center",
        paddingHorizontal:Padding.mPadding
    },
    sidebar:{
            height:45,
            width:45,
            backgroundColor:Colors.sideBarIcon,
            borderRadius:100,
            justifyContent:"center",
            alignItems:"center",
    },
    Deliverytitle:{
       fontFamily:Fonts.senBold,
       color:Colors.btnColor,
       fontSize:Font.sm
    },
    locationSubtile:{
       fontFamily:Fonts.senRegular,
       fontSize:Font.md,
       color:Colors.lightGrey

    }

})
