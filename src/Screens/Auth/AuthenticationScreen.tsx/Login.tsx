import { View, Text, Image, StatusBar } from 'react-native'
import { Styles } from './Style';
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import InputField from '../../../Components/InputField'
import { Colors } from '../../../Theme/Color';
import { Button } from '../../../Components/Button'
import Social from '../OnBoardingScreen/Component/social'

const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [checked, setChecked] = useState(false);
    const [password, setPassword] = useState("");
    const socialIcon = [
        { icon: "facebook", backgroundColor: "#395998" },
        { icon: "twitter", backgroundColor: "#169CE8" },
        { icon: "apple", backgroundColor: "black" }
    ]
    return (
        <View style={Styles.container}>
            <StatusBar
                barStyle={"light-content"}
            />
            <Image source={require('../../../Assets/Png/Ellipse.png')} style={Styles.ellipse} />
            <View style={Styles.upperSec}>
                <Text style={Styles.title}>Log In</Text>
                <Text style={Styles.subtitle}>Pleased Sign in to your existing account</Text>
            </View>
            <View style={Styles.lowerSec} >
                <InputField
                    label="EMAIL"
                    placeholder="example@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    secureTextEntry={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                />
                <InputField
                    label="PASSWORD"
                    placeholder="* * * * * * * *"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    returnKeyType="done"
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={Styles.checkboxContainer}>
                        <CheckBox
                            value={checked}
                            onValueChange={setChecked}
                            tintColors={{ true: Colors.btnColor, false: Colors.lightGrey }}
                            tintColor={Colors.lightGrey}
                            onTintColor={Colors.btnColor}
                            onCheckColor={Colors.white}
                            onFillColor={Colors.btnColor}
                        />
                        <Text style={Styles.checkboxLabel}>Remember me</Text>
                    </View>
                    <View>
                        <Text style={Styles.forgetPassword} onPress={() => { navigation.navigate("ForgotPassword") }}>Forgot Password?</Text>
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Button title="Log In" onPress={() => { }} />
                </View>
                <View style={Styles.bottomSec}>
                    <Text style={Styles.bottomtitle}>Don't have an account?</Text>
                    <Text style={Styles.bottomText} onPress={() => { navigation.navigate("SignUp") }}>Sign Up</Text>
                </View>
                <View>
                    <Text style={{ textAlign: "center", fontFamily: "Sen-Regular", fontSize: 18, color: Colors.lightGrey, marginTop: 25 }}>Or</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 40,
                    marginTop: 25,
                }}>
                    {socialIcon?.map((social, index) => (
                        <Social
                            key={index}
                            icon={social.icon}
                            backgroundColor={social.backgroundColor}
                            onPress={() => { }}
                        />
                    ))}
                </View>
            </View>
        </View>
    )
}

export default Login