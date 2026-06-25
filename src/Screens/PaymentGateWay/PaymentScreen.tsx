import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SearchHeader from '../Home/Components/SearchHeader';
import { useTheme } from '../../Hooks/useTheme';
import { useThemeStyles } from '../../Hooks/useThemeStyles';
import { Fonts, fontsSize } from '../../Theme/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import PaymentCard from './Component/PaymentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import VisaIcon from '../../Assets/Svg/visa.svg';
import MasterCardIcon from '../../Assets/Svg/payment-method.svg';

const PaymentScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const styles = useThemeStyles(getStyles);
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Load saved card details on focus
  useFocusEffect(
    React.useCallback(() => {
      const loadSavedCards = async () => {
        try {
          let cards: any[] = [];
          const cardsJson = await AsyncStorage.getItem('saved_cards');
          if (cardsJson) {
            cards = JSON.parse(cardsJson);
          } else {
            // Check legacy single card
            const singleCardJson = await AsyncStorage.getItem('saved_card');
            if (singleCardJson) {
              const legacyCard = {
                ...JSON.parse(singleCardJson),
                id: 'legacy',
              };
              cards = [legacyCard];
              await AsyncStorage.setItem('saved_cards', JSON.stringify(cards));
              await AsyncStorage.setItem('selected_card_id', 'legacy');
              await AsyncStorage.removeItem('saved_card');
            }
          }
          setSavedCards(cards);

          const selId = await AsyncStorage.getItem('selected_card_id');
          if (selId && cards.some(c => c.id === selId)) {
            setSelectedCardId(selId);
          } else if (cards.length > 0) {
            setSelectedCardId(cards[0].id);
            await AsyncStorage.setItem('selected_card_id', cards[0].id);
          } else {
            setSelectedCardId(null);
          }
        } catch (error) {
          console.error('Failed to load cards:', error);
        }
      };
      loadSavedCards();
    }, [])
  );

  const handleSelectCard = async (id: string) => {
    try {
      setSelectedCardId(id);
      await AsyncStorage.setItem('selected_card_id', id);
    } catch (error) {
      console.error('Failed to select card:', error);
    }
  };

  const handleRemoveCard = (id: string) => {
    Alert.alert(
      'Remove Card',
      'Are you sure you want to remove this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedCards = savedCards.filter(c => c.id !== id);
              setSavedCards(updatedCards);
              await AsyncStorage.setItem('saved_cards', JSON.stringify(updatedCards));
              
              if (selectedCardId === id) {
                const nextSelectedId = updatedCards.length > 0 ? updatedCards[0].id : null;
                setSelectedCardId(nextSelectedId);
                if (nextSelectedId) {
                  await AsyncStorage.setItem('selected_card_id', nextSelectedId);
                } else {
                  await AsyncStorage.removeItem('selected_card_id');
                }
              }
            } catch (error) {
              console.error('Failed to remove card:', error);
            }
          },
        },
      ]
    );
  };

  const handlePayAndConfirm = () => {
    if (savedCards.length === 0) {
      Alert.alert('Payment Error', 'Please add a payment card first.');
      return;
    }
    if (!selectedCardId) {
      Alert.alert('Payment Error', 'Please select a payment card first.');
      return;
    }
    navigation.navigate('PaymentDone');
  };

  const getCardBrand = (cardNumber: string) => {
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5')) return 'MasterCard';
    return 'Credit Card';
  };

  const getCardIcon = (cardNumber: string): { type: 'svg'; component: React.FC<any> } | { type: 'image'; source: any } => {
    if (cardNumber.startsWith('4')) {
      return { type: 'svg', component: VisaIcon };
    }
    return { type: 'image', source: require('../../Assets/Images/mastericon.png') };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <SearchHeader title="Payment" />
      </View>

      <View style={{ paddingLeft: 32, marginTop: 20 }}>
        <PaymentCard />
      </View>

      {savedCards.length === 0 ? (
        <View style={styles.noCardContainer}>
          <View style={styles.image}>
            <Image
              source={require('../../Assets/Images/MasterCard.jpg')}
              style={{ height: '100%', width: '100%' }}
            />
          </View>
          <View>
            <Text style={styles.title}>No card added</Text>
            <Text style={styles.subtitle}>
              You can add a card and {'\n'} Save it for Later
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
            {savedCards.map((item) => {
              const cardIcon = getCardIcon(item.cardNumber);
              const isSelected = selectedCardId === item.id;
              const CardComponent = cardIcon.type === 'svg' ? cardIcon.component : null;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  onPress={() => handleSelectCard(item.id)}
                  style={[
                    styles.cardContainer,
                    isSelected && {
                      borderColor: colors.btnColor,
                      borderWidth: 1.5,
                    },
                  ]}
                >
                  <View style={styles.cardHeaderRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Feather
                        name={isSelected ? 'check-circle' : 'circle'}
                        color={isSelected ? colors.btnColor : colors.gray || '#A0A5BA'}
                        size={20}
                        style={{ marginRight: 8 }}
                      />
                      <Text style={styles.cardTitle}>{getCardBrand(item.cardNumber)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleRemoveCard(item.id)} activeOpacity={0.7}>
                      <Feather name="trash-2" color="#E23744" size={20} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardDetailsRow}>
                    <View style={styles.img}>
                      {cardIcon.type === 'svg' && CardComponent ? (
                        <CardComponent width={45} height={40} />
                      ) : (
                        <Image
                          source={(cardIcon as any).source}
                          style={{ height: '100%', width: '100%' }}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                    <View style={styles.innerTextContainer}>
                      <Text style={styles.innerText}>
                        •••• •••• •••• {item.cardNumber.slice(-4)}
                      </Text>
                      <Text style={styles.holderText}>{item.cardHolderName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity
        style={styles.addNew}
        onPress={() => navigation.navigate('AddCard')}
      >
        <Entypo name="plus" color={colors.btnColor} size={24} />
        <Text style={styles.addText}>ADD NEW</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>
            Total <Text style={styles.totalAmount}>$96</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayAndConfirm}>
          <Text style={styles.payText}>Pay & Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    headerStyle: {
      paddingHorizontal: 16,
    },
    image: {
      height: 200,
      marginTop: 25,
      width: 460,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 0,
    },
    subtitle: {
      textAlign: 'center',
      fontFamily: Fonts.senRegular,
      fontSize: fontsSize.smd,
      color: colors.gray || '#A0A5BA',
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: Fonts.senBold,
      fontSize: fontsSize.large,
      color: colors.black,
    },
    addNew: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      gap: 10,
      borderWidth: 1,
      width: 400,
      alignSelf: 'center',
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: 20,
      borderColor: colors.gray || 'grey',
    },
    addText: {
      color: colors.btnColor,
      fontFamily: Fonts.senBold,
      fontSize: fontsSize.smd,
    },
    total: {
      paddingHorizontal: 16,
      alignItems: 'flex-end',
      flexDirection: 'row',
      marginBottom: 15,
    },
    totalText: {
      fontSize: 18,
      fontFamily: Fonts.senRegular,
      color: colors.black,
    },
    totalAmount: {
      fontSize: 20,
      fontFamily: Fonts.senBold,
      color: colors.black,
    },
    bottomContainer: {
      marginTop: 'auto',
      paddingHorizontal: 16,
      paddingBottom: 20,
    },
    payButton: {
      height: 55,
      backgroundColor: colors.btnColor,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    payText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: Fonts.senBold,
    },
    cardContainer: {
      height: 120,
      borderRadius: 15,
      width: 400,
      padding: 16,
      alignSelf: 'center',
      marginTop: 16,
      backgroundColor: colors.InputBox,
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: 'transparent',
    },
    cardHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    cardTitle: {
      fontFamily: Fonts.senBold,
      fontSize: fontsSize.smd,
      color: colors.black,
    },
    cardDetailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    img: {
      height: 45,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerTextContainer: {
      flex: 1,
      marginLeft: 12,
    },
    innerText: {
      fontFamily: Fonts.senRegular,
      fontSize: 14,
      color: colors.black,
    },
    holderText: {
      fontFamily: Fonts.senRegular,
      fontSize: 12,
      color: colors.gray || '#A0A5BA',
      textTransform: 'uppercase',
      marginTop: 2,
    },
    noCardContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    listContainer: {
      flex: 1,
      marginTop: 16,
    },
  });