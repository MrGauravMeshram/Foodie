import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/State/store'
import StackNavigation from './src/Navigations/StackNavigation'
import { TabBarProvider } from './src/Utils/TabBarContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <TabBarProvider>
          <StackNavigation />
        </TabBarProvider>
      </Provider>
      <View style={[StyleSheet.absoluteFill, { zIndex: 9999 }]} pointerEvents="box-none">
        <Toast />
      </View>
    </GestureHandlerRootView>
  )
}

export default App