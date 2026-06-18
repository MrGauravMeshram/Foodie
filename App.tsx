import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/State/store'
import StackNavigation from './src/Navigations/StackNavigation'

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  )
}

export default App