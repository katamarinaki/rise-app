import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator } from '@src/navigators/root-navigator'
import { StoreContext } from 'storeon/react'
import store from '@src/store/init-store'

const App = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StoreContext.Provider value={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </StoreContext.Provider>
    </SafeAreaView>
  </>
)

export default App
