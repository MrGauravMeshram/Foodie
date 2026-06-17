import { View, Text, StyleSheet,Image } from 'react-native'
import {Colors} from '../../../Theme/Color'
import { Button } from '../../../Components/Button'
import React from 'react'
import { Spacing } from '../../../Theme/Spacing'
import { Fonts, fontsSize as FontSize } from '../../../Theme/fonts' 


const LocationPremission = () => {


  return (
    <View style={style.Container}>
  
      <View style={style.imageContainer}>
        <Image
        source={require("../../../Assets/Images/3d-view-map.jpg")} style={{height:"100%",width:"100%",borderRadius:200}} resizeMode='cover'/>
      </View>
      <View style={style.btn}>
      <Button title="ACCESS LOCATION" onPress={()=>{}}/>
      </View>
      <View>
        <Text style={style.text}>Foodie will Access your Location while using the App</Text>
      </View>
      <View>
      </View>
    </View>
  )
}

export default LocationPremission

const style = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:Colors.white
       
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height:250,
        width:250,
        borderRadius:150,
    },
    btn:{
        width:380,
        marginTop: Spacing.exlr
    },
    text:{
    fontFamily:Fonts.senSemiBold,
    fontSize:FontSize.md,
    textAlign:"center",
    width:300,
    marginTop:Spacing.md,
    color:Colors.gray
    }
})