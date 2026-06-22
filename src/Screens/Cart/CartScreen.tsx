import { View, StatusBar, FlatList, Text ,StyleSheet } from 'react-native'
import React, { useRef ,useCallback,useMemo, useEffect} from 'react'
import SearchHeader from '../Home/Components/SearchHeader'
import { getStyle } from '../../Styles/CartScreenStyle'
import CartCard from './Component/CartCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../Hooks/useTheme'
import { useThemeStyles } from '../../Hooks/useThemeStyles'
import { useSelector } from 'react-redux'
import { RootState } from '../../State/store'
import { Fonts, fontsSize } from '../../Theme/fonts'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const CartScreen = () => {
  const { colors } = useTheme();
  const style = useThemeStyles(getStyle);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  useEffect(() => {
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    if (totalQuantity > 0 && bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    } else if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
     if (totalQuantity > 0) {
    bottomSheetRef.current?.snapToIndex(0);
  } else {
    bottomSheetRef.current?.close();
  }
  }, [cartItems]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
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
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontFamily: Fonts.senBold, fontSize: fontsSize.large, color: colors.white }}>Your cart is empty</Text>
          <Text style={{ fontFamily: Fonts.senRegular, fontSize: fontsSize.md, color: '#8c8c8c' }}>Add some delicious items from the menu!</Text>
        </View>
      )}
<BottomSheet
  ref={bottomSheetRef}
  index={-1}
  snapPoints={snapPoints}
  onChange={handleSheetChanges}
  enablePanDownToClose
>
        <BottomSheetView style={styles.contentContainer}>
          <Text>bottomSheet</Text>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default CartScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});