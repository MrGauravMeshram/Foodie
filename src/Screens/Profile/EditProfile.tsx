import { View, Text, StyleSheet ,Image,KeyboardAvoidingView,Platform,TouchableOpacity} from 'react-native'
import React,{useMemo,useRef,useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Fonts, fontsSize } from '../../Theme/fonts'
import  Header from '../Home/Components/SearchHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../Theme/Color'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Inputfield from './Component/Inputfield'
import { Button } from '../../Components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OnCameraRequest from '../../Utils/CameraPremissions'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { OnMediaPremission } from '../../Utils/CameraPremissions'
const EditProfile = () => {
    const navigation = useNavigation<any>();
    const [initialProfile, setInitialProfile] = useState({
        profileImage: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        bio: ''
    });

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
    });
    const SheetRef = useRef<BottomSheet>(null);
    const snapPoint = useMemo(()=>["20%"],[])

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                let profileData: any = {};
                const profileDataJson = await AsyncStorage.getItem('userProfile');
                if (profileDataJson) {
                    profileData = JSON.parse(profileDataJson);
                } else {
                    const img = await AsyncStorage.getItem('profileImage') || '';
                    const name = await AsyncStorage.getItem('fullName') || '';
                    const mail = await AsyncStorage.getItem('email') || '';
                    const phone = await AsyncStorage.getItem('phoneNumber') || '';
                    const biography = await AsyncStorage.getItem('bio') || '';
                    profileData = { profileImage: img, fullName: name, email: mail, phoneNumber: phone, bio: biography };
                }

                const img = profileData.profileImage || '';
                const name = profileData.fullName || '';
                const mail = profileData.email || '';
                const phone = profileData.phoneNumber || '';
                const biography = profileData.bio || '';

                setInitialProfile({
                    profileImage: img,
                    fullName: name,
                    email: mail,
                    phoneNumber: phone,
                    bio: biography
                });

                setProfileImage(img || null);
                setFullName(name);
                setEmail(mail);
                setPhoneNumber(phone);
                setBio(biography);
            } catch (error) {
                console.log('Error loading profile data:', error);
            }
        };
        loadProfileData();
    }, []);

    const handleNameChange = (text: string) => {
        setFullName(text);
        if (text.trim().length >= 2) {
            setErrors(prev => ({ ...prev, fullName: '' }));
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(text.trim())) {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    const handlePhoneChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setPhoneNumber(numericText);
        if (numericText.length === 10) {
            setErrors(prev => ({ ...prev, phoneNumber: '' }));
        }
    };

    const handleDeleteImage = async () => {
        try {
            setProfileImage(null);
            handleClose();
        } catch (error) {
            console.log('Error deleting profile image:', error);
        }
    };

    const handleSave = async () => {
        let hasError = false;
        const newErrors = {
            fullName: '',
            email: '',
            phoneNumber: '',
        };

        if (!fullName.trim()) {
            newErrors.fullName = 'Name is required';
            hasError = true;
        } else if (fullName.trim().length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters';
            hasError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'Email is required';
            hasError = true;
        } else if (!emailRegex.test(email.trim())) {
            newErrors.email = 'Invalid email address';
            hasError = true;
        }

        if (!phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
            hasError = true;
        } else if (phoneNumber.length !== 10) {
            newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) {
            return;
        }

        try {
            const profileData = {
                profileImage: profileImage || '',
                fullName,
                email,
                phoneNumber,
                bio
            };
            await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
            navigation.goBack();
        } catch (error) {
            console.log('Error saving profile data:', error);
        }
    };

    const hasChanges = useMemo(() => {
        const currentImg = profileImage || '';
        return (
            currentImg !== initialProfile.profileImage ||
            fullName !== initialProfile.fullName ||
            email !== initialProfile.email ||
            phoneNumber !== initialProfile.phoneNumber ||
            bio !== initialProfile.bio
        );
    }, [profileImage, fullName, email, phoneNumber, bio, initialProfile]);

const handleOpenCamera = async () => {
  const hasPremission = await OnCameraRequest();

  if (hasPremission) {
    handleClose();

    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
    });

    if (result.didCancel) {
      console.log('User cancelled camera');
      return;
    }

    if (result.errorCode) {
      console.log(
        'Camera Error:',
        result.errorMessage,
      );
      return;
    }

    const uri = result.assets?.[0]?.uri;

    console.log("Camera URI:", uri);

    if (uri) {
      setProfileImage(uri as never);
    }
  }
};

const handleOpenMedia = async () => {
  const hasPremission = await OnMediaPremission();

  if (hasPremission) {
    handleClose();

    const response = await launchImageLibrary({
      mediaType: "photo",
      quality: 1,
    });

    const uri = response.assets?.[0]?.uri;

    console.log("Gallery URI:", uri);

    if(uri){
      setProfileImage(uri as never);
    }
  }
};
    const handleOpen = ()=>{
        SheetRef.current?.expand();
    }
    const handleClose = ()=>{
        SheetRef.current?.close()
    }
    return (
        <SafeAreaView style={Style.container}>
           <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={80}
        contentContainerStyle={{
          flexGrow:1,
          paddingBottom:20
        }}
      >
            <View>
            < Header Title="Edit Profile" title="Edit Profile"/>
            </View>
            <View style={Style.imageContainer}>
                <Image source={{uri: profileImage ||
      "https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"}} style={{height:"100%",width:"100%",borderRadius:60}} resizeMode='cover'/>
            </View>
            <TouchableOpacity style={Style.icon} onPress={handleOpen}>
                <SimpleLineIcons name="pencil" color="#fff" size={18} />
            </TouchableOpacity>
            <View style={{marginTop:25}}>
              <Inputfield label="Full Name" type={"string"} length='' value={fullName} onChangeText={handleNameChange} error={errors.fullName}/>
              <Inputfield label="Email" type={"string"} length='' value={email} onChangeText={handleEmailChange} error={errors.email}/>
              <Inputfield label="Phone Number" type={"numeric"} length='10' value={phoneNumber} onChangeText={handlePhoneChange} error={errors.phoneNumber}/>
              <Inputfield label='Bio' type={"string"} length="" value={bio} onChangeText={setBio}/>
            </View>
      
      </KeyboardAwareScrollView>
      <View style={Style.btn}>
         <Button title='Save' onPress={handleSave} disabled={!hasChanges}/>
      </View>
      <BottomSheet
      ref={SheetRef}
      snapPoints={snapPoint}
      index={-1}
      enableHandlePanningGesture={true}
      enablePanDownToClose={true}
      >
        <BottomSheetView style={Style.bottomSheetContent}>
            <TouchableOpacity style={Style.deleteIcon} onPress={handleDeleteImage}>
                <Feather name="trash-2" color="#EF4444" size={22} />
            </TouchableOpacity>
            <View>
                <TouchableOpacity style={Style.innerText} onPress={handleOpenCamera}>
                    <Feather name="camera" color="#000" size={24} />
                    <Text>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.innerText} onPress={handleOpenMedia}>
                    <FontAwesome name="photo" color="#000" size={24} />
                    <Text>Photo's</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetView>

      </BottomSheet>

        </SafeAreaView>
    )
}

export default EditProfile  

const Style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        paddingHorizontal:16,
    },
    imageContainer:{
        height:120,
        width:120,
        borderRadius:60,
        alignSelf:"center"
    },
    icon:{
        height:40,
        width:40,
        alignSelf:"center",
        position:"absolute",
        top:150,
        left:225,
        borderRadius:50,
        backgroundColor:Colors.btnColor,
        alignItems:"center",
        justifyContent:"center",
    },
    btn:{
        position:"absolute",
        bottom:20,
        width:"100%",
        alignSelf:"center",
    },
    innerText:{
        flexDirection:"row",
        gap:10,
        padding:16,
    },
    bottomSheetContent: {
        paddingHorizontal: 16,
        position: 'relative',
    },
    deleteIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
    },
})