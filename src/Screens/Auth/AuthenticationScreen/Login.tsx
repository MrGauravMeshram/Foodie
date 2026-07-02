import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
import { getStyles } from '../../../Styles/AuthStyle'
import React, { useState ,useEffect} from 'react'
import InputField from '../../../Components/InputField'
import { Button } from '../../../Components/Button'
import Social from '../OnBoardingScreen/Component/social'
import { useTheme } from '../../../Hooks/useTheme'
import { useThemeStyles } from '../../../Hooks/useThemeStyles'
import { requestLocationPermission } from '../../../Utils/LocationRequest'
const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [checked, setChecked] = useState(false);
    const [password, setPassword] = useState("");
    const { colors } = useTheme();
    const Styles = useThemeStyles(getStyles);

    const socialIcon = [
        { icon: "facebook", backgroundColor: "#395998" },
        { icon: "twitter", backgroundColor: "#169CE8" },
        { icon: "apple", backgroundColor: colors.black }
    ]

    const handleLogin = async () => {
        const hasPermission = await requestLocationPermission();

        if (!hasPermission) {
            navigation.navigate("LocationPremission");
        }else{
            navigation.navigate("BottomNavigation");
        }
          requestLocationPermission();

    }
    return (
        <View style={Styles.container}>
            <StatusBar
                barStyle={"light-content"}
            />
            <Image source={require('../../../Assets/Images/Ellipse.png')} style={Styles.ellipse} />
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
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setChecked(!checked)}
                            style={{
                                width: 18,
                                height: 18,
                                borderRadius: 4,
                                borderWidth: 1,
                                borderColor: checked ? colors.btnColor : colors.lightGrey,
                                backgroundColor: checked ? colors.btnColor : 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {checked ? (
                                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>✓</Text>
                            ) : null}
                        </TouchableOpacity>
                        <Text style={Styles.checkboxLabel}>Remember me</Text>
                    </View>
                    <View>
                        <Text style={Styles.forgetPassword} onPress={() => { navigation.navigate("ForgotPassword") }}>Forgot Password?</Text>
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Button title="Log In" onPress={handleLogin} />
                </View>
                <View style={Styles.bottomSec}>
                    <Text style={Styles.bottomtitle}>Don't have an account?</Text>
                    <Text style={Styles.bottomText} onPress={() => { navigation.navigate("SignUp") }}>Sign Up</Text>
                </View>
                <View>
                    <Text style={{ textAlign: "center", fontFamily: "Sen-Regular", fontSize: 18, color: colors.lightGrey, marginTop: 25 }}>Or</Text>
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