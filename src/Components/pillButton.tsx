import { View, Text ,StyleSheet} from 'react-native'
import { Colors } from '../Theme/Color'
import React from 'react'

const pillButton = ({ title }: { title: string }) => {
  return (
    <View style={Style.container}>
     <Text style={Style.text}>{title}</Text>
    </View>
  )
}

export default pillButton

const Style  = StyleSheet.create({
    container:{
        borderColor:"grey",
        alignItems:"center",
        borderRadius:50,
        justifyContent:"center",
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:"#FFF",
        borderWidth:1,
    },
    text:{
        fontSize:18,
        color:Colors.btnColor,
        fontFamily:"Sen-Regular"
    }
})