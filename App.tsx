import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/State/store'
import StackNavigation from './src/Navigations/StackNavigation'
import { TabBarProvider } from './src/Utils/TabBarContext'

const App = () => {
  return (
    <Provider store={store}>
      <TabBarProvider>
        <StackNavigation />
      </TabBarProvider>
    </Provider>
  )
}

export default App