import { View, Text ,Image,StyleSheet,FlatList} from 'react-native'
import React from 'react'
import {Fonts,fontsSize} from '../../../Theme/fonts'
import { Colors } from '../../../Theme/Color'
import { Padding } from '../../../Theme/Spacing'
type props ={
   Data :any
}
const FoodCardmenu = ({Data}:props) => {

const renderCarditem =({item}:any)=>{
 return (
    <View style={style.container}>
     <View style={style.ImageContainer}>
      <Image
      source={{uri:item.image}} style={{height:"100%",width:"100%"}} resizeMode='cover'/>
     </View>
     <View>
        <Text style={style.titleText}>{item.title}</Text>
        
     </View>
     <View style={style.subtitle}>
            <Text>Starting</Text>
            <Text>$ 70</Text>
        </View>
    </View>
  )
}
 return(
     <FlatList
     data = {Data}
     renderItem={renderCarditem}
     keyExtractor={(item)=>item.id}
     horizontal
     nestedScrollEnabled
     contentContainerStyle={style.flat}
     />
 )
}

export default FoodCardmenu

const style = StyleSheet.create({
    
    container:{
       height:140,
       width:150,
       alignItems:"center",
       elevation:5,
       marginBottom:10,
       padding:Padding.sPadding,
       borderRadius:15,
       backgroundColor:Colors.white,
       justifyContent:"center",
    },

    ImageContainer:{
        height:70,
        width:70,

    },
    subtitle:{
        flexDirection:"row",
        justifyContent:"space-between",
        gap:15
    },
    titleText:{
        textAlign:"left",
        marginRight:55,
        
        overflow:"hidden",
        fontFamily:Fonts.senSemiBold,
        fontSize:fontsSize.md
        
    },

    flat:{
          gap:15,
    }
})