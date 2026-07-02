import { View, Text, StyleSheet, Animated, ActivityIndicator ,Image} from 'react-native'
import React, { useState, useEffect, useRef,useMemo } from 'react'
import SearchHeader from '../Home/Components/SearchHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getApiKey } from '../../helpers/ApiKey'
import GeoLocation from 'react-native-geolocation-service'
import { Map as Maps, Camera, CameraRef, MapRef } from "@maplibre/maplibre-react-native";
import { requestLocationPermission } from '../../Utils/LocationRequest'
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Fonts } from '../../Theme/fonts'
const Map = () => {
  const [location, setlocation] = useState({ longitude: 0, latitude: 0 });
  const [loading, setLoading] = useState(true);
  const cameraRef = useRef<CameraRef>(null);
  const mapRef = useRef<MapRef>(null);
   const bottomSheetRef = useRef<BottomSheet>(null);
  const liftAnim = useRef(new Animated.Value(0)).current;


  const snapPoints = useMemo(() => ['20%'], []);
  const shadowScale = liftAnim.interpolate({
    inputRange: [-15, 0],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });

  const shadowOpacity = liftAnim.interpolate({
    inputRange: [-15, 0],
    outputRange: [0.2, 0.5],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
          GeoLocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setlocation({ latitude, longitude });
              setLoading(false);
            },
            error => {
              console.log('Location error:', error);
            
              setlocation({ latitude: 28.6139, longitude: 77.2090 });
              setLoading(false);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            },
          );
        } else {
         
          setlocation({ latitude: 28.6139, longitude: 77.2090 });
          setLoading(false);
        }
      } catch (err) {
        console.log('Permission/Location error:', err);
        setlocation({ latitude: 28.6139, longitude: 77.2090 });
        setLoading(false);
      }
    };
    getLocation();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="red" />
        <Text style={{ marginTop: 10, color: '#666' }}>Fetching current location...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={Style.headerBlock}>
        <SearchHeader title={"Track Order"} />
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Maps
          mapStyle={`https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${getApiKey}`}
          ref={mapRef}
          onRegionWillChange={() => {
            Animated.spring(liftAnim, {
              toValue: -15,
              friction: 5,
              useNativeDriver: true,
            }).start();
          }}
          onRegionDidChange={async () => {
            Animated.spring(liftAnim, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true,
            }).start();

            if (mapRef.current) {
              try {
                const centerCoord = await mapRef.current.getCenter();
                const [longitude, latitude] = centerCoord;
                setlocation({ latitude, longitude });
              } catch (e) {
                console.log('Error getting center coordinate:', e);
              }
            }
          }}
        >
          <Camera
            ref={cameraRef}
            initialViewState={{
              center: [location.longitude, location.latitude],
              zoom: 15,
            }}
          />
        </Maps>

      
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={Style.pinContainer}>
            <Animated.View style={[Style.pinWrapper, { transform: [{ translateY: liftAnim }] }]}>
              <Ionicons name="location" size={35} color="red" />
            </Animated.View>
            <Animated.View style={[Style.pinShadow, { transform: [{ scale: shadowScale }], opacity: shadowOpacity }]} />
          </View>
        </View>
      </View>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={1} enablePanDownToClose={false} animateOnMount={false} enableOverDrag={false} enableHandlePanningGesture={false}>
        <BottomSheetView style={{ flex: 1, padding: 16 ,}}>
          <View style={Style.sheetContainer}>
        <View style={Style.imageContainer}>
                <Image source={{uri:"https://i.pinimg.com/736x/aa/a5/7c/aaa57c9d164220307e678e17b84c8fe8.jpg"}} style={{height:"100%",width:"100%",borderRadius:10}} resizeMode="cover"/>
        </View>
        <View >
          <Text style={Style.title}>Paradise Biryani</Text>
          <Text style={Style.subtitle}>Ordered at: 02 July, 06:00 PM</Text>
          <Text style={Style.itemname}>2x Burger</Text>
          <Text style={Style.itemname}>1x Fries</Text>
        </View>
        </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default Map

const Style = StyleSheet.create({
  headerBlock: {
    paddingHorizontal: 16,
  },
  pinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinShadow: {
    width: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#000000',
    marginTop: -2,
  },
  imageContainer:{
       height:100,
       width:100,
  },
  sheetContainer:{
    flexDirection:"row",
    alignItems:"center",
    gap:10,
  },
  title:{
    fontSize:22,
    fontFamily:Fonts.senBold,
  },
  subtitle:{
    fontSize:14,
    color:"grey",
    fontFamily:Fonts.senRegular,
    
  },
  itemname:{
    fontSize:14,
    fontFamily:Fonts.senRegular,
  }
})