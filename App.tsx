import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/State/store'
import StackNavigation from './src/Navigations/StackNavigation'
import { TabBarProvider } from './src/Utils/TabBarContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <TabBarProvider>
        <StackNavigation />
      </TabBarProvider>
    </Provider>
    </GestureHandlerRootView>
  )
}

export default App