import { View, Text,StyleSheet ,Image,FlatList,TouchableOpacity} from 'react-native'
import { Colors } from '../../../Theme/Color'
import React,{useState} from 'react'
import { PaymentData} from '../../../Data/PaymentMethodData'
import AntDesign from 'react-native-vector-icons/AntDesign';
const PaymentCard = () => {

  const [selected,setSelected] = useState(0);
  const renderCardItem = ({ item,index }: any) => {
    const Icon = item.image;

    return (
      <TouchableOpacity style={Style.itemWrapper} onPress={()=>setSelected(index)}>
        <View style={[Style.iconContainer,{
          borderWidth:index===selected? 2:0
        },{borderColor:Colors.btnColor}]}>
          <Icon width={60} height={60} />
       {index === selected && (
  <View
    style={{
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: Colors.btnColor,
      borderRadius: 12,
      padding: 2,
    }}
  >
    <AntDesign name="check" color="#fff" size={16} />
  </View>
)}
        </View>
        <Text style={Style.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={PaymentData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCardItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={Style.listContainer}
    />
  );
};

export default PaymentCard;

const Style = StyleSheet.create({
  listContainer: {
    paddingRight: 16,
    alignItems: 'center',
  },
  itemWrapper: {
    marginRight: 20,
    alignItems: 'center',
  },
  iconContainer: {
    height: 100,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.InputBox,
    borderRadius: 16,
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
  },
  border:{
    borderWidth:2,
    borderColor:Colors.btnColor
  }
})