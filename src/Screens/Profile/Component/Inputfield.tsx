import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../Theme/Color'
import { fontsSize, Fonts } from '../../../Theme/fonts'

type props = {
  label: string,
  type: any,
  length: any,
  value?: string,
  onChangeText?: (text: string) => void,
  autoFocus?: boolean,
  error?: string,
  editable?: boolean,
  onFocus?: () => void,
}


const Inputfield = ({ label, type, length, value, onChangeText, autoFocus, error, editable = true, onFocus }: props) => {

  return (
    <View style={Style.Container}>
      <Text style={Style.Text}>{label}</Text>
      <TextInput
        style={[
          Style.Input,
          error ? { borderColor: 'red', borderWidth: 1 } : { borderColor: "lightgrey", borderWidth: 0.5 }
        ]}
        onChangeText={onChangeText}
        value={value}
        autoFocus={autoFocus}
        inputMode={type}
        editable={editable}
        onFocus={onFocus}
      />
      {error ? <Text style={Style.ErrorText}>{error}</Text> : null}
    </View>
  )
}

export default Inputfield

const Style = StyleSheet.create({
  Container: {
    gap: 10,
    marginBottom: 16
  },
  Input: {
    height: 56,
    width: "98%",
    backgroundColor: Colors.InputBox,
    borderRadius: 10,
    alignSelf: "center",
    padding: 16,
    borderWidth: 0.5,
    borderColor: "lightgrey"
  },
  Text: {
    fontFamily: Fonts.senMedium,
    fontSize: fontsSize.smd
  },
  ErrorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.senRegular,
    marginTop: -8,
    marginLeft: 8,
  }
})