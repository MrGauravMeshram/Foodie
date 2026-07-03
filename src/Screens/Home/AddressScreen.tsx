import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './Components/SearchHeader'
import AddressBox from '../../Components/AddressBox'
import { Colors } from '../../Theme/Color'
import { fontsSize, Fonts } from '../../Theme/fonts'
import { Button } from '../../Components/Button'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddressScreen = ({ navigation }: { navigation: any }) => {
    const isFocused = useIsFocused();
    const [addresses, setAddresses] = useState<any[]>([]);

    const loadAddresses = async () => {
        try {
            const stored = await AsyncStorage.getItem('savedAddresses');
            if (stored) {
                setAddresses(JSON.parse(stored));
            } else {
                setAddresses([]);
            }
        } catch (error) {
            console.log('Error loading addresses:', error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            loadAddresses();
        }
    }, [isFocused]);

    const handleDelete = async (id: string) => {
        try {
            const updated = addresses.filter(item => item.id !== id);
            setAddresses(updated);
            await AsyncStorage.setItem('savedAddresses', JSON.stringify(updated));
        } catch (error) {
            console.log('Error deleting address:', error);
        }
    };

    const formatAddressText = (item: any) => {
        const parts = [];
        if (item.apartment) parts.push(item.apartment);
        if (item.street) parts.push(item.street);
        if (item.address) parts.push(item.address);
        if (item.postcode) parts.push(item.postcode);
        return parts.join(', ');
    };

    return (
        <SafeAreaView style={style.Container}>
            <Header title="Address" />

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 80 }}>
                <View style={{ marginTop: 8 }}>
                    {addresses.length === 0 ? (
                        <View style={{ paddingVertical: 40, justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                            <Text style={style.Text}>No addresses saved yet</Text>
                        </View>
                    ) : (
                        addresses.map((item) => {
                            let iconName = "home-outline";
                            let iconColor = "#2B78E4";
                            if (item.label === "Work") {
                                iconName = "briefcase-outline";
                                iconColor = "#FF7622";
                            } else if (item.label === "Other") {
                                iconName = "location-outline";
                                iconColor = "#10B981";
                            }
                            
                            return (
                                <AddressBox
                                    key={item.id}
                                    title={item.label}
                                    address={formatAddressText(item)}
                                    iconName={iconName}
                                    iconColor={iconColor}
                                    onEdit={() => console.log('Edit', item.id)}
                                    onDelete={() => handleDelete(item.id)}
                                />
                            );
                        })
                    )}
                </View>
            </ScrollView>

            <View style={style.SubmitBox}>
                <Button title="Add Address" onPress={() => navigation.navigate('AddLocations')} />
            </View>
        </SafeAreaView>
    )
}

export default AddressScreen

const style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal: 16,
        gap: 16

    },
    Text: {
        fontFamily: Fonts.senMedium,
        fontSize: fontsSize.smd,
    },
    SubmitBox: {
        justifyContent: "flex-end",
        position: "absolute",
        bottom: 16,
        width: '100%',
        alignSelf: "center",
        marginBottom: 16,
    }
})