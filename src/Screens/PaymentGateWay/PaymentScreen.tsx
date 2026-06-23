import { View, Text ,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import SearchHeader from '../Home/Components/SearchHeader'
import { Colors } from '../../Theme/Color'
import { Fonts,fontsSize } from '../../Theme/fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo';
import PaymentCard from './Component/PaymentCard'

const PaymentScreen = () => {
  const [isCard,setCard] = useState(false)
  return (
    <SafeAreaView style={Style.Container}>
    
        <View style={Style.headerStyle}>
      <SearchHeader title={"Payment"}/>
      </View>
    <View style={{paddingLeft:32,marginTop:20}}>
    <PaymentCard/>
    </View>
    
    {isCard?(
      <>
    <View style={Style.image}>
       <Image source={require("../../Assets/Images/MasterCard.jpg")} style={{height:"100%",width:"100%"}}/>
    </View>
    <View>
      <Text style={Style.title}>No master card added</Text>
      <Text style={Style.subtitle}>Your can add a mastercard and {"\n"} Save it for Later</Text>
    </View>
    </>):(<View style={Style.Iscard}>
      <Text style={Style.CardText}>Master Card</Text>
      <View style={{flexDirection:"row",alignItems:"center"}}>
        <View style={Style.img}>
          <Image source={require('../../Assets/Images/mastericon.png')} style={{height:"100%",width:"100%"}} resizeMode='contain'/>
        </View>
        <View style={Style.innerText}>
        <Text>**********436</Text>
        </View>
      </View>
    </View>)
}

    <View style={Style.Addnew}>
      <Entypo name="plus" color={Colors.btnColor} size={24} />
      <Text style={Style.addText}>ADD NEW</Text>
    </View>
  <View style={Style.bottomContainer}>
    <View style={Style.total}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Total <Text style={{fontSize:20}}>$96</Text> 
      </Text>
    </View>

    <TouchableOpacity style={Style.payButton}>
      <Text style={Style.payText}>Pay & Confirm</Text>
    </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default PaymentScreen;

const Style = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:Colors.backgroundColor
        // backgroundColor:"black",
    },
    headerStyle:{
        paddingHorizontal:16,
    },
    image:{
      height:200,
      marginTop:25,
      width:460,
      alignSelf:"center",
      justifyContent:"center",
      alignItems:"center",
      marginRight:0,
    },
    subtitle:{
      textAlign:"center",
      fontFamily:Fonts.senRegular,
      fontSize:fontsSize.smd
      
    },

    title:{
      textAlign:"center",
      marginBottom:10,
      fontFamily:Fonts.senBold,
      fontSize:fontsSize.large
    },
    Addnew:{
      flexDirection:"row",
      alignItems:"center",
      height:60,
      gap:10,
      borderWidth:1,
      width:400,
      alignSelf:"center",
      borderRadius:10,
      justifyContent:"center",
      marginTop:40,
      borderColor:"grey"
    },
    addText:{
      color:Colors.btnColor,
      fontFamily:Fonts.senBold,
      fontSize:fontsSize.smd
    },
    total:{
        paddingHorizontal:16,
        alignItems:"flex-end",
        flexDirection:"row",
        marginBottom: 15,
    },
    bottomContainer: {
  marginTop: "auto",
  paddingHorizontal: 16,
  paddingBottom: 20,
},

payButton: {
  height: 55,
  backgroundColor: Colors.btnColor,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
},

payText: {
  color: "#fff",
  fontSize: 16,
  fontFamily: Fonts.senBold,
},
   Iscard:{
    height:100,
    borderRadius:15,
    width:400,
    padding:16,
    alignSelf:"center",
    marginTop:16,
    backgroundColor:Colors.InputBox,
  
   },
   CardText:{
    fontFamily:Fonts.senBold,
    fontSize:fontsSize.smd,
   },
   img:{
    height:55,
    width:50,
    justifyContent:"center",
    alignItems:"center",
   },
   innerText:{
    textAlign:"center"
   }
})