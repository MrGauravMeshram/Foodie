import { View, Text,TouchableOpacity,PermissionsAndroid } from 'react-native'
import React from 'react'

const OnCameraRequest = async() => {
 try{
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
        title: 'Need Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    )
    if(granted===PermissionsAndroid.RESULTS.GRANTED){
           return true
    }
    else{
        return false
    }
 }catch(err){
console.log(err)
}
 
}

export default OnCameraRequest

export const OnMediaPremission = async()=>{
  try{
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title:'Need Media Permission',
        message:
        "Upload a images form gallary",
        buttonNegative:"Cancel",
        buttonPositive:"Ok"
      }
    )
    if(granted===PermissionsAndroid.RESULTS.GRANTED){
      return true
    }else{
      return false
    }
  }catch(err){
    console.log(err)
  }
}