import { View, StatusBar } from 'react-native'
import React from 'react'
import SearchHeader from '../Home/Components/SearchHeader'
import { getStyle } from '../../Styles/CartScreenStyle'
import CartCard from './Component/CartCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../Hooks/useTheme'
import { useThemeStyles } from '../../Hooks/useThemeStyles'

const CartScreen = () => {
  const { colors } = useTheme();
  const style = useThemeStyles(getStyle);

  return (
    <SafeAreaView style={style.Container}>
      <StatusBar barStyle="light-content" />
      <View>
        <SearchHeader
          color={true}
          title="Cart"
          rightText="Done"
          onRightPress={() => console.log("Edit items pressed")}
        />
      </View>
      <View>
        <CartCard />
      </View>
    </SafeAreaView>
  )
}

export default CartScreen