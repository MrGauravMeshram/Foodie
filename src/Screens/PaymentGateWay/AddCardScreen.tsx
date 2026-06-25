import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../Hooks/useTheme';
import { useThemeStyles } from '../../Hooks/useThemeStyles';
import { Fonts, fontsSize } from '../../Theme/fonts';
import CardInputField from '../../Components/CardInputField';

const AddCardScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const styles = useThemeStyles(getStyles);

  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleCardNumberChange = (text: string) => {
    const cleanText = text.replace(/\D/g, '');
    const formatted = cleanText.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);
  };


  const handleExpireDateChange = (text: string) => {
    const cleanText = text.replace(/\D/g, '');
    let formatted = cleanText;
    if (cleanText.length > 2) {
      formatted = `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}`;
    }
    setExpireDate(formatted);
  };


  const handleCvcChange = (text: string) => {
    const cleanText = text.replace(/\D/g, '');
    setCvc(cleanText);
  };

  const handlePayment = async () => {
    if (!cardHolderName.trim()) {
      Alert.alert('Validation Error', 'Please enter the card holder name.');
      return;
    }

    const cleanCardNo = cardNumber.replace(/\s/g, '');
    if (cleanCardNo.length !== 16) {
      Alert.alert('Validation Error', 'Please enter a valid 16-digit card number.');
      return;
    }

    if (expireDate.length !== 5) {
      Alert.alert('Validation Error', 'Please enter a valid expiry date (MM/YY).');
      return;
    }

    const month = parseInt(expireDate.split('/')[0], 10);
    if (month < 1 || month > 12) {
      Alert.alert('Validation Error', 'Please enter a valid expiry month (01-12).');
      return;
    }

    if (cvc.length !== 3) {
      Alert.alert('Validation Error', 'Please enter a valid 3-digit CVC.');
      return;
    }

    try {
      let existingCards: any[] = [];
      const cardsJson = await AsyncStorage.getItem('saved_cards');
      if (cardsJson) {
        existingCards = JSON.parse(cardsJson);
      } else {
        const singleCardJson = await AsyncStorage.getItem('saved_card');
        if (singleCardJson) {
          existingCards = [{ ...JSON.parse(singleCardJson), id: 'legacy' }];
          await AsyncStorage.removeItem('saved_card');
        }
      }

      const newCard = {
        id: Date.now().toString(),
        cardHolderName: cardHolderName.trim(),
        cardNumber: cleanCardNo,
        expireDate,
        cvc,
      };

      existingCards.push(newCard);
      await AsyncStorage.setItem('saved_cards', JSON.stringify(existingCards));
      await AsyncStorage.setItem('selected_card_id', newCard.id);

      Alert.alert(
        'Success',
        'Card has been successfully added.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save card. Please try again.');
      console.error('AsyncStorage error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Feather name="x" size={20} color={colors.black} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Card</Text>
          </View>


          <View style={styles.formContainer}>
            <CardInputField
              label="Card Holder Name"
              placeholder="Enter you Full Name"
              value={cardHolderName}
              onChangeText={setCardHolderName}
            />

            <CardInputField
              label="Card Number"
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="numeric"
              maxLength={19}
            />

            <View style={styles.row}>
              <CardInputField
                label="Expire Date"
                placeholder="mm/yyyy"
                value={expireDate}
                onChangeText={handleExpireDateChange}
                keyboardType="numeric"
                maxLength={5}
                containerStyle={{ flex: 1, marginRight: 10 }}
              />

              <CardInputField
                label="CVC"
                placeholder="***"
                value={cvc}
                onChangeText={handleCvcChange}
                keyboardType="numeric"
                maxLength={3}
                containerStyle={{ flex: 1, marginLeft: 10 }}
              />
            </View>
          </View>


          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.paymentButton}
              activeOpacity={0.8}
              onPress={handlePayment}
            >
              <Text style={styles.paymentButtonText}>ADD & MAKE PAYMENT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddCardScreen;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 30,
    },
    closeButton: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      backgroundColor: colors.sideBarIcon || '#ECF0F4',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: fontsSize.smd || 20,
      fontFamily: Fonts.senBold || 'Sen-Bold',
      color: colors.black,
      marginLeft: 16,
    },
    formContainer: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonContainer: {
      marginTop: 40,
    },
    paymentButton: {
      backgroundColor: colors.btnColor || '#FF7622',
      height: 60,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    paymentButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: Fonts.senBold || 'Sen-Bold',
      letterSpacing: 0.5,
    },
  });