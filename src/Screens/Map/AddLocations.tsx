import { View, Text, StyleSheet, Animated, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import SearchHeader from '../Home/Components/SearchHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getApiKey } from '../../helpers/ApiKey'
import GeoLocation from 'react-native-geolocation-service'
import { Map as Maps, Camera, CameraRef, MapRef } from "@maplibre/maplibre-react-native";
import { requestLocationPermission } from '../../Utils/LocationRequest'
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '../../Theme/fonts'
import Inputfield from '../Profile/Component/Inputfield'
import { Button } from '../../Components/Button'
const Map = ({ navigation }: { navigation: any }) => {
    const [location, setlocation] = useState({ longitude: 0, latitude: 0 });
    const [loading, setLoading] = useState(true);
    const cameraRef = useRef<CameraRef>(null);
    const mapRef = useRef<MapRef>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const liftAnim = useRef(new Animated.Value(0)).current;
    const [isSheet, setisSheet] = useState(false);
    const [CurrentAddress, setCurrentAddress] = useState("");
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [street, setStreet] = useState("");
    const [postcode, setPostcode] = useState("");
    const [apartment, setApartment] = useState("");
    const [label, setLabel] = useState("Home");
    const [isExpanded, setIsExpanded] = useState(false);
    const [errors, setErrors] = useState({
        street: '',
        postcode: '',
        apartment: ''
    });
    const snapPoints = useMemo(() => ['28%', '60%'], []);

    const handleStreetChange = (text: string) => {
        setStreet(text);
        if (errors.street) setErrors(prev => ({ ...prev, street: '' }));
    };
    const handlePostcodeChange = (text: string) => {
        setPostcode(text);
        if (errors.postcode) setErrors(prev => ({ ...prev, postcode: '' }));
    };
    const handleApartmentChange = (text: string) => {
        setApartment(text);
        if (errors.apartment) setErrors(prev => ({ ...prev, apartment: '' }));
    };

    const handleSaveAddress = async () => {
        const newErrors = { street: '', postcode: '', apartment: '' };
        let hasError = false;

        if (!street.trim()) {
            newErrors.street = 'Street is required';
            hasError = true;
        }
        if (!postcode.trim()) {
            newErrors.postcode = 'Postcode is required';
            hasError = true;
        }
        if (!apartment.trim()) {
            newErrors.apartment = 'Apartment is required';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            bottomSheetRef.current?.snapToIndex(1);
            return;
        }

        try {
            const newAddress = {
                id: Date.now().toString(),
                label,
                address: CurrentAddress,
                street,
                postcode,
                apartment
            };

            const existingAddressesJson = await AsyncStorage.getItem('savedAddresses');
            const existingAddresses = existingAddressesJson ? JSON.parse(existingAddressesJson) : [];
            const updatedAddresses = [...existingAddresses, newAddress];

            await AsyncStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
            navigation.goBack();
        } catch (error) {
            console.log('Error saving address:', error);
        }
    };

    const moveToCurrentLocation = () => {
        GeoLocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setlocation({ latitude, longitude });
                cameraRef.current?.flyTo({
                    center: [longitude, latitude],
                    zoom: 15,
                    duration: 1000,
                });
            },
            error => {
                console.log('Error getting current location:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            },
        );
    };

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
    const getLocationApi = async () => {
        try {
            const Data = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=${getApiKey}`);
            const response = await Data.json();
            console.log("response", response);
            if (response?.features?.[0]?.properties?.formatted) {
                setCurrentAddress(response.features[0].properties.formatted);
            }
        }
        catch (err) {
            console.log("Error", err);
        }
    };

    useEffect(() => {
        if (location.latitude !== 0 && location.longitude !== 0) {
            getLocationApi();
        }
    }, [location.latitude, location.longitude]);

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
                <SearchHeader title="Add Address" />
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

                <TouchableOpacity 
                    onPress={moveToCurrentLocation}
                    style={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: '#FFFFFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 5,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}
                >
                    <Ionicons name="locate" size={24} color="#FF7622" />
                </TouchableOpacity>


                <View style={StyleSheet.absoluteFill} pointerEvents="none">
                    <View style={Style.pinContainer}>
                        <Animated.View style={[Style.pinWrapper, { transform: [{ translateY: liftAnim }] }]}>
                            <Ionicons name="location" size={35} color="red" />
                        </Animated.View>
                        <Animated.View style={[Style.pinShadow, { transform: [{ scale: shadowScale }], opacity: shadowOpacity }]} />
                    </View>
                </View>
            </View>

            <BottomSheet 
                ref={bottomSheetRef} 
                snapPoints={snapPoints} 
                index={0} 
                enablePanDownToClose={false} 
                animateOnMount={true} 
                enableOverDrag={true} 
                enableHandlePanningGesture={true}
                onChange={(index) => {
                    if (index === 0) {
                        setIsExpanded(false);
                    } else if (index === 1) {
                        setIsExpanded(true);
                    }
                }}
            >
                <BottomSheetScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <View style={{ flex: 1 }}>
                                <Inputfield 
                                    label="Address" 
                                    type="text" 
                                    length={255} 
                                    value={CurrentAddress} 
                                    onChangeText={setCurrentAddress} 
                                    editable={!isReadOnly} 
                                    onFocus={() => bottomSheetRef.current?.snapToIndex(1)}
                                />
                            </View>
                            <TouchableOpacity 
                                onPress={() => {
                                    setIsReadOnly(!isReadOnly);
                                    if (isReadOnly) {
                                        bottomSheetRef.current?.snapToIndex(1);
                                    }
                                }} 
                                style={{ 
                                    marginLeft: 12, 
                                    marginTop: 12,
                                    width: 44,
                                    height: 44,
                                    borderRadius: 22,
                                    backgroundColor: isReadOnly ? '#F3F4F6' : '#FF7622',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Feather 
                                    name={isReadOnly ? "edit-2" : "lock"} 
                                    color={isReadOnly ? "#4B5563" : "#FFFFFF"} 
                                    size={18} 
                                />
                            </TouchableOpacity>
                        </View>

                        {isExpanded && (
                            <>
                                <Inputfield 
                                    label="Street" 
                                    type="text" 
                                    length={255} 
                                    value={street} 
                                    onChangeText={handleStreetChange}
                                    error={errors.street}
                                />
                                
                                <View style={{ flexDirection: 'row', gap: 16 }}>
                                    <View style={{ flex: 1 }}>
                                        <Inputfield 
                                            label="Postcode" 
                                            type="numeric" 
                                            length={10} 
                                            value={postcode} 
                                            onChangeText={handlePostcodeChange}
                                            error={errors.postcode}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Inputfield 
                                            label="Apartment" 
                                            type="text" 
                                            length={255} 
                                            value={apartment} 
                                            onChangeText={handleApartmentChange}
                                            error={errors.apartment}
                                        />
                                    </View>
                                </View>

                                <Text style={{ fontFamily: Fonts.senMedium, fontSize: 14, color: '#32343E', marginBottom: 8, marginTop: 8 }}>
                                    Label As
                                </Text>
                                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
                                    {['Home', 'Work', 'Other'].map((item) => {
                                        const isSelected = label === item;
                                        return (
                                            <TouchableOpacity 
                                                key={item} 
                                                onPress={() => setLabel(item)}
                                                style={{
                                                    paddingVertical: 8,
                                                    paddingHorizontal: 20,
                                                    borderRadius: 20,
                                                    backgroundColor: isSelected ? '#FF7622' : '#F3F4F6',
                                                    borderWidth: 1,
                                                    borderColor: isSelected ? '#FF7622' : '#E5E7EB'
                                                }}
                                            >
                                                <Text style={{ color: isSelected ? '#FFFFFF' : '#4B5563', fontFamily: Fonts.senMedium, fontSize: 14 }}>
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </>
                        )}

                        <Button title="Save Address" onPress={handleSaveAddress} />
                    </View>
                </BottomSheetScrollView>
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
    imageContainer: {
        height: 100,
        width: 100,
    },
    sheetContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: Fonts.senBold,
    },
    subtitle: {
        fontSize: 14,
        color: "grey",
        fontFamily: Fonts.senRegular,

    },
    itemname: {
        fontSize: 14,
        fontFamily: Fonts.senRegular,
    },
    SubmitBox: {
        paddingVertical: 10,
        paddingHorizontal: 16,

    }
})