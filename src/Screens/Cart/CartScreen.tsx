import { View, StatusBar, FlatList, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import SearchHeader from '../Home/Components/SearchHeader'
import { getStyle } from '../../Styles/CartScreenStyle'
import CartCard from './Component/CartCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../Hooks/useTheme'
import { useThemeStyles } from '../../Hooks/useThemeStyles'
import { useSelector } from 'react-redux'
import { RootState } from '../../State/store'
import InputField from '../../Components/InputField';
import { Fonts, fontsSize } from '../../Theme/fonts'
import CheckBox from '@react-native-community/checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CustomBottomSheet } from '../../Components/CustomBottomSheet';

const CartScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const style = useThemeStyles(getStyle);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [checked, setChecked] = useState(false);

  const openBottomSheet = useCallback(() => {
    setChecked(true);
  }, []);

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
  }, [cartItems]);

  const deliveryFee = subtotal > 0 ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (totalQuantity === 0) {
      setChecked(false);
    }
  }, [totalQuantity]);

  const handleCheckboxChange = useCallback((value: boolean) => {
    console.log('[CartScreen] handleCheckboxChange value:', value);
    setChecked(value);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setChecked(false);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColorBlack }}>
      <SafeAreaView style={style.Container}>
        <StatusBar barStyle="light-content" />
        <View>
          <SearchHeader
            color={true}
            title="Cart"
            rightText="Done"
            onRightPress={openBottomSheet}
          />
        </View>
        {cartItems.length > 0 ? (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CartCard
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                />
              )}
              contentContainerStyle={{ paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            />
            <View style={style.checkboxContainer}>
              <CheckBox
                value={checked}
                onValueChange={handleCheckboxChange}
                tintColors={{ true: colors.btnColor, false: isDarkMode ? '#9CA3AF' : '#6b7280' }}
                tintColor={isDarkMode ? '#9CA3AF' : '#6b7280'}
                onTintColor={colors.btnColor}
                onCheckColor={colors.btnColor}
              />
              <TouchableOpacity onPress={() => handleCheckboxChange(!checked)} activeOpacity={0.7}>
                <Text style={style.checkboxLabel}>Show Order Summary</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontFamily: Fonts.senBold, fontSize: fontsSize.large, color: colors.white }}>Your cart is empty</Text>
            <Text style={{ fontFamily: Fonts.senRegular, fontSize: fontsSize.md, color: '#8c8c8c' }}>Add some delicious items from the menu!</Text>
          </View>
        )}

      </SafeAreaView>
      {cartItems.length > 0 && (
        <CustomBottomSheet
          isOpen={checked}
          onClose={handleCloseBottomSheet}
          isDarkMode={isDarkMode}
        >
          <View style={style.contentContainer}>
            <View style={style.deliveryAddressContainer}>
              <Text style={style.sheetTitle}>Delivery Address</Text>
              <Text style={[style.sheetTitle, { textDecorationLine: 'underline', fontSize: fontsSize.smd, color: colors.btnColor }]}>EDIT</Text>
            </View>
            <View>
              <InputField
                icon="map-pin"
                placeholder="Enter your address"
                value="123 Main St"
                onChangeText={() => { }}
                editable={false}
                containerStyle={{ flex: 1 }}
                textColor={colors.white}
              />
            </View>

            <View style={[style.summaryRow, { flexDirection: "row", justifyContent: "space-between" }]}>


              <View style={[style.summaryRow]}>
                <Text style={style.totalLabel}>Total</Text>
                <Text style={style.totalValue}>${total.toFixed(2)}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: fontsSize.smd, color: colors.black, fontFamily: Fonts.senRegular, color: colors.btnColor }}>BreakDown</Text>
                <MaterialIcons name="arrow-forward-ios" color="#000" size={24} />
              </View>
            </View>

            <TouchableOpacity style={style.checkoutButton} activeOpacity={0.8}>
              <Text style={style.checkoutButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </CustomBottomSheet>
      )}
    </View>
  )
}

export default CartScreen