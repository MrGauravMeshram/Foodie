import { View, Text ,StyleSheet} from 'react-native'
import { Colors } from '../Theme/Color'
import React from 'react'

const pillButton = ({ title, active }: { title: string; active: boolean }) => {
  return (
    <View style={[Style.container, active && Style.activeContainer]}>
     <Text style={[Style.text,active && Style.activeText]}>{title}</Text>
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
    },
    activeContainer:{
        backgroundColor:Colors.btnColor,
        borderColor:Colors.btnColor,
    },
    activeText:{
        color:"#FFF",
    }
})