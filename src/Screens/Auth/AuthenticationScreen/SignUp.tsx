import { View, Text, Image, StatusBar } from 'react-native';
import { Styles } from '../../../Styles/AuthStyle'
import React, { useState } from 'react';
import InputField from '../../../Components/InputField';
import { Button } from '../../../Components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUp = ({ navigation }: any) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reTypePassword, setReTypePassword] = useState("");

    const fields = [
        {
            label: "FULL NAME",
            placeholder: "Enter your Name",
            value: fullName,
            onChangeText: setFullName,
            secureTextEntry: false,
            keyboardType: "default" as const,
            returnKeyType: "next" as const,
        },
        {
            label: "EMAIL",
            placeholder: "example@gmail.com",
            value: email,
            onChangeText: setEmail,
            secureTextEntry: false,
            keyboardType: "email-address" as const,
            returnKeyType: "next" as const,
        },
        {
            label: "PASSWORD",
            placeholder: "* * * * * * * *",
            value: password,
            onChangeText: setPassword,
            secureTextEntry: true,
            keyboardType: "default" as const,
            returnKeyType: "next" as const,
        },
        {
            label: "RE-TYPE PASSWORD",
            placeholder: "* * * * * * * *",
            value: reTypePassword,
            onChangeText: setReTypePassword,
            secureTextEntry: true,
            keyboardType: "default" as const,
            returnKeyType: "done" as const,
        },
    ];

    return (
       <KeyboardAwareScrollView
  enableOnAndroid={true}
  extraScrollHeight={100}
  keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    flexGrow: 1,
    paddingBottom: 30,
  }}
>
        <View style={Styles.container}>
            <StatusBar
                barStyle={"light-content"}
            />
            <Image
                source={require('../../../Assets/Images/Ellipse.png')}
                style={Styles.ellipse}
            />
            <View style={Styles.upperSec}>
                <Text style={Styles.title}>Sign Up</Text>
                <Text style={Styles.subtitle}>Please SignUp to GetStarted</Text>
            </View>
            <View style={Styles.lowerSec}>
                {fields.map((field, index) => (
                    <InputField
                        key={index}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChangeText={field.onChangeText}
                        secureTextEntry={field.secureTextEntry}
                        keyboardType={field.keyboardType}
                        returnKeyType={field.returnKeyType}
                    />
                ))}
                <View style={{ marginTop: 10 }}>
                    <Button title="SIGN UP" onPress={() => { }} />
                </View>
                <View style={Styles.bottomSec}>
                    <Text style={Styles.bottomtitle}>Already have an account?</Text>
                    <Text style={Styles.bottomText} onPress={() => { navigation.goBack() }}>Log In</Text>
                </View>
            </View>
        </View>
        </KeyboardAwareScrollView>
    );
}

export default SignUp;