import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'
import { Fonts,fontsSize } from '../Theme/fonts'
type props ={
    image:any,
    name:string,
    No:number,
    price:any,
    date:any,
    time:any,
    item:string,
}


const orderCard = ({image,name,No,price,date,time,item}:props) => {
  return (
    <View style={Style.container}>
     <View style={Style.boxContainer}>
        <Image source={{uri: image}} style={{height:"100%",width:"100%",resizeMode:"cover",borderRadius:10,}} />
     </View>
     <View>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%",padding:16,paddingBottom:6}}>
                <Text style={Style.name}>{name}</Text>
                <Text>{No}</Text>
            </View>
            <View style={{paddingHorizontal:16}}>
                <Text style={Style.price}>{`$${price}`} <Text>{`| ${date} ${time} * ${item} items`}</Text></Text>
                
            </View>
     </View>
    </View>
  )
}

export default orderCard

const Style = StyleSheet.create({
    container:{
           flexDirection:"row",
           padding:16,
        
    },
    boxContainer:{
        height:80,
        width:80,
    },
    price:{
        fontFamily:Fonts.senMedium,
        fontSize:fontsSize.sm
    },
    name:{
        fontFamily:Fonts.senBold,
        fontSize:fontsSize.smd
    }
})