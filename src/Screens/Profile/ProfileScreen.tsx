import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Fonts, fontsSize } from '../../Theme/fonts'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from '../../Hooks/useTheme'
import { useThemeStyles } from '../../Hooks/useThemeStyles'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const Style = useThemeStyles(getStyles);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('Vishal Rangari');
  const [bio, setBio] = useState<string>('I Love Fast Food');

  useFocusEffect(
    useCallback(() => {
      const loadProfileData = async () => {
        try {
          const profileDataJson = await AsyncStorage.getItem('userProfile');
          if (profileDataJson) {
            const profileData = JSON.parse(profileDataJson);
            setProfileImage(profileData.profileImage || null);
            setFullName(profileData.fullName || 'Vishal Rangari');
            setBio(profileData.bio || 'I Love Fast Food');
          } else {
            const savedImage = await AsyncStorage.getItem('profileImage');
            const savedName = await AsyncStorage.getItem('fullName');
            const savedBio = await AsyncStorage.getItem('bio');
            
            setProfileImage(savedImage);
            if (savedName) setFullName(savedName);
            if (savedBio) setBio(savedBio);
          }
        } catch (error) {
          console.log('Error loading profile data:', error);
        }
      };
      loadProfileData();
    }, [])
  );

  const menuGroups = [
    {
      id: 'group1',
      items: [
        {
          id: 'personal_info',
          label: 'Edit Profile',
          icon: 'user',
          iconColor: '#FF7622',
          onPress: () => {
           navigation.navigate("EditProfile")
          }
        },
        {
          id: 'addresses',
          label: 'Addresses',
          icon: 'map',
          iconColor: '#5C61F2',
          onPress: () => {
            navigation.navigate('Map');
          }
        }
      ]
    },
    {
      id: 'group2',
      items: [
        {
          id: 'cart',
          label: 'Cart',
          icon: 'shopping-bag',
          iconColor: '#0EA5E9',
          onPress: () => {
            navigation.navigate('CartScreen');
          }
        },
        {
          id: 'favourite',
          label: 'Favourite',
          icon: 'heart',
          iconColor: '#F43F5E',
          onPress: () => {
            Toast.show({
              type: 'info',
              text1: 'Favourite',
              text2: 'Your favourite food items details coming soon.',
            });
          }
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: 'bell',
          iconColor: '#F59E0B',
          onPress: () => {
            Toast.show({
              type: 'info',
              text1: 'Notifications',
              text2: 'Notifications settings and history coming soon.',
            });
          }
        },
        {
          id: 'payment_method',
          label: 'Payment Method',
          icon: 'credit-card',
          iconColor: '#3B82F6',
          onPress: () => {
            navigation.navigate('Payment');
          }
        }
      ]
    },
    {
      id: 'group3',
      items: [
        {
          id: 'faqs',
          label: 'FAQs',
          icon: 'help-circle',
          iconColor: '#F97316',
          onPress: () => {
            Toast.show({
              type: 'info',
              text1: 'FAQs',
              text2: 'Frequently Asked Questions details coming soon.',
            });
          }
        },
        {
          id: 'user_reviews',
          label: 'User Reviews',
          icon: 'command',
          iconColor: '#14B8A6',
          onPress: () => {
            Toast.show({
              type: 'info',
              text1: 'User Reviews',
              text2: 'User reviews and feedback section coming soon.',
            });
          }
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: 'settings',
          iconColor: '#8B5CF6',
          onPress: () => {
            Toast.show({
              type: 'info',
              text1: 'Settings',
              text2: 'App settings and configuration coming soon.',
            });
          }
        }
      ]
    },
    {
      id: 'group4',
      items: [
        {
          id: 'log_out',
          label: 'Log Out',
          icon: 'log-out',
          iconColor: '#EF4444',
          onPress: () => {
            navigation.navigate('Login');
          }
        }
      ]
    }
  ];

  return (
    <SafeAreaView style={Style.container}>
      <View>
        <Text style={Style.headerTitle}>ProfileScreen</Text>
      </View>
      <View style={{ paddingVertical: 32, flexDirection: "row", alignItems: "center", gap: 25 }}>
        <View style={Style.ImageConatiner}><Image source={{ uri: profileImage || "https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" }} style={{ height: "100%", width: "100%", borderRadius: 50 }} resizeMode='cover' /></View>
        <View>
          <Text style={Style.name}>{fullName}</Text>
          <Text style={Style.subtitle}>{bio}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={Style.scrollViewContent}>
        {menuGroups.map((group) => (
          <View key={group.id} style={Style.card}>
            {group.items.map((item) => (
              <TouchableOpacity key={item.id} style={Style.item} onPress={item.onPress} activeOpacity={0.7}>
                <View style={Style.itemLeft}>
                  <View style={Style.iconContainer}>
                    <Feather name={item.icon} size={18} color={item.iconColor} />
                  </View>
                  <Text style={Style.label}>{item.label}</Text>
                </View>
                <Feather name="chevron-right" size={16} color={colors.lightGrey} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 16
  },
  headerTitle: {
    fontSize: fontsSize.smd,
    fontFamily: Fonts.senSemiBold,
    color: colors.black,
  },
  ImageConatiner: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  name: {
    fontFamily: Fonts.senSemiBold,
    fontSize: fontsSize.smd,
    color: colors.black
  },
  subtitle: {
    fontFamily: Fonts.senMedium,
    color: colors.lightGrey
  },
  scrollViewContent: {
    paddingBottom: 110, // Ensure bottom navigation space is respected
  },
  card: {
    backgroundColor: colors.InputBox,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  label: {
    fontFamily: Fonts.senMedium,
    fontSize: 16,
    color: colors.black,
  },
})