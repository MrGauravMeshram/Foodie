import {View, Text, StyleSheet, Image, Alert, Linking} from 'react-native';
import {Colors} from '../../../Theme/Color';
import {Button} from '../../../Components/Button';
import React from 'react';
import {Spacing} from '../../../Theme/Spacing';
import {Fonts, fontsSize as FontSize} from '../../../Theme/fonts';
import Geolocation from 'react-native-geolocation-service';

import {requestLocationPermission} from '../../../Utils/LocationRequest';

const LocationPremission = ({navigation}: any) => {
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert(
        'Location Permission Required',
        'Please enable location permission in settings to continue.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
try {
  const response = await fetch(
  `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
  {
    headers: {
      'User-Agent': 'FoodieApp',
    },
  },
);

const text = await response.text();
console.log(text);

const data = JSON.parse(text);

  const area =
    data.address?.suburb ||
    data.address?.neighbourhood ||
    data.address?.village ||
    data.address?.town;

  const city = data.address?.city;
  const state = data.address?.state;

  const address = data.display_name;

  console.log('Area:', area);
  console.log('City:', city);
  console.log('Address:', address);

  navigation.navigate('BottomNavigation', {
    screen: 'Home',
    params: {
      area,
      city,
      state,
      address,
      latitude,
      longitude,
    },
  });

} catch (error) {
  console.log('Reverse Geocoding Error:', error);
}
      },
      error => {
        console.log('Location Error:', error);
        Alert.alert('Location Error', 'Unable to get your current location.');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <View style={style.Container}>
      <View style={style.imageContainer}>
        <Image
          source={require('../../../Assets/Images/3d-view-map.jpg')}
          style={{height: '100%', width: '100%', borderRadius: 200}}
          resizeMode="cover"
        />
      </View>
      <View style={style.btn}>
        <Button title="ACCESS LOCATION" onPress={getCurrentLocation} />
      </View>
      <View>
        <Text style={style.text}>
          Foodie will Access your Location while using the App
        </Text>
      </View>
    </View>
  );
};

export default LocationPremission;

const style = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 250,
    borderRadius: 150,
  },
  btn: {
    width: 380,
    marginTop: Spacing.exlr,
  },
  text: {
    fontFamily: Fonts.senSemiBold,
    fontSize: FontSize.md,
    textAlign: 'center',
    width: 300,
    marginTop: Spacing.md,
    color: Colors.gray,
  },
});