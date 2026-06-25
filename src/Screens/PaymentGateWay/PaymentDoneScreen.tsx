import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../Hooks/useTheme';
import { useThemeStyles } from '../../Hooks/useThemeStyles';
import { Fonts } from '../../Theme/fonts';
import MapView from 'react-native-maps';




const PaymentDoneScreen = ({ navigation }: any) => {
  const { colors, isDarkMode } = useTheme();
  const styles = useThemeStyles(getStyles);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.backgroundColor || '#FFFFFF'}
      />

      <View style={styles.contentContainer}>
        <View style={styles.centerContainer}>
          <View style={styles.illustrationWrapper}>
            <Image
              source={require('../../Assets/Images/payment_success.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.subtitle}>
            You successfully made a payment,{'\n'}enjoy our service!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BottomNavigation')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>TRACK ORDER</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor || '#FFFFFF',
    },
    backgroundImage: {
      opacity: colors.isDarkMode ? 0.02 : 0.04,
      tintColor: colors.isDarkMode ? '#FFFFFF' : '#FF7622',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingTop: 80,
      paddingBottom: 40,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    illustrationWrapper: {
      width: 250,
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
    },
    illustration: {
      width: '100%',
      height: '100%',
    },
    title: {
      fontFamily: Fonts.senBold || 'Sen-Bold',
      fontSize: 26,
      color: colors.black || '#1E1E2E',
      textAlign: 'center',
      marginBottom: 16,
    },
    subtitle: {
      fontFamily: Fonts.senRegular || 'Sen-Regular',
      fontSize: 16,
      color: colors.gray || '#A0A5BA',
      textAlign: 'center',
      lineHeight: 24,
    },
    button: {
      backgroundColor: colors.btnColor || '#FF7622',
      height: 62,
      width: '100%',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.btnColor || '#FF7622',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontFamily: Fonts.senBold || 'Sen-Bold',
      fontSize: 16,
      letterSpacing: 0.5,
    },
  });

export default PaymentDoneScreen;