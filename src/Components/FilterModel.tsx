import { View, Text, StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Model from 'react-native-modal'
import { Fonts, fontsSize } from '../Theme/fonts'
import Entypo from 'react-native-vector-icons/Entypo';
import PillButton from './pillButton';
import { OfferBtnData } from '../Data/OfferBtnData';
import { TimingData } from '../Data/TimingData';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Toast from 'react-native-toast-message';
import { Button } from './Button';
type Props = {
  openModel: boolean;
  onClose: () => void;
};

const FilterModel = ({ openModel, onClose }: Props) => {
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [Selected, setSelect] = useState(-1);
  const [SelectedTiming, setSelectedTiming] = useState(-1);
  const [filterPressed, setFilterPressed] = useState(false);
  const toggleStar = (star: number) => {
    if (selectedStars.indexOf(star) !== -1) {
      setSelectedStars(selectedStars.filter(item => item !== star));
    } else {
      setSelectedStars([...selectedStars, star]);
    }
  };
  return (
    <Model
      isVisible={openModel}
      animationIn="zoomIn"

      animationOut="zoomOut"
      onBackdropPress={onClose}
      onModalHide={() => {
        console.log('onModalHide called. filterPressed status:', filterPressed);
        if (filterPressed) {
          console.log('Showing Filter Applied Toast');
          Toast.show({
            type: 'success',
            text1: 'Filter Applied',
            text2: 'Your filters have been applied.',
          });
        }
      }}
      onModalWillShow={() => {
        console.log('onModalWillShow called. Resetting filterPressed to false');
        setFilterPressed(false);
      }}
    >
      <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, gap: 10, }}>
        <View style={Style.headerContainer}>
          <Text style={Style.headerTitle}>Filter your Search</Text>

          <TouchableOpacity onPress={onClose}>
            <View style={{ borderRadius: 50, backgroundColor: "#E5E5E5" }}>
              <Entypo name="cross" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View ><Text style={Style.text}>Offers</Text></View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, }}>
          {OfferBtnData.map((btn, index) => (
            <TouchableOpacity key={btn.id} onPress={() => setSelect(index)}>
              <PillButton title={btn.title} active={index === Selected} />
            </TouchableOpacity>
          ))}
          <View><Text style={[Style.text, { width: 250 }]}>Delivery Time</Text></View>
          {TimingData.map((btn, index) => (
            <TouchableOpacity key={btn.id} onPress={() => setSelectedTiming(index)}>
              <PillButton key={btn.id} title={btn.title} active={index === SelectedTiming} />
            </TouchableOpacity>
          ))}
          <View><Text style={[Style.text, { width: 350 }]}>Rating</Text></View>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => toggleStar(star)}
              style={{
                height: 50,
                width: 50,
                backgroundColor: "#E5E5E5",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedStars.indexOf(star) !== -1 ? (
                <Entypo name="star" size={24} color="#FFAC1C" />
              ) : (
                <EvilIcons name="star" size={24} color="#000" />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginTop: 20 }}>
          <Button title='Filter' onPress={() => {
            console.log('Filter button pressed. Setting filterPressed = true and calling onClose()');
            setFilterPressed(true);
            onClose();
          }} />
        </View>
      </View>
    </Model>
  );
};

export default FilterModel

const Style = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  headerTitle: {
    fontFamily: Fonts.senBold,
    fontSize: fontsSize.smd,
  },
  text: {
    fontFamily: Fonts.senRegular,
    fontSize: fontsSize.smd,
  }
})
