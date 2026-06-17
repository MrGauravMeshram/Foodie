import { View, Text, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import InputField from '../../../Components/InputField'
import { Button } from '../../../Components/Button'
import { Styles } from './Style'

const ForgotPassword = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    return (
        <View style={Styles.container}>
            <StatusBar
                barStyle={"light-content"}
            />
            <Image source={require('../../../Assets/Png/Ellipse.png')} style={Styles.ellipse} />
            <View style={Styles.upperSec}>
                <Text style={Styles.title}>Forgot Password?</Text>
                <Text style={[Styles.subtitle, { width: "60%", alignSelf: "center" }]}>Enter your email address and we’ll send you a reset link</Text>
            </View>
            <View style={Styles.lowerSec}>
                <InputField
                    label="EMAIL"
                    placeholder="example@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    secureTextEntry={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                />
                <View style={{ marginTop: 30 }}>
                    <Button title="SEND CODE" onPress={() => { navigation.navigate("Verification") }} />
                </View>
            </View>
        </View>
    )
}

export default ForgotPassword