import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { cards, causes, init } from '@src/lib/routes'
import { InitScreen } from '@src/screens/init-screen'
import { CausesScreen } from '@src/screens/causes-screen'
import { CardsScreen } from '@src/screens/cards-screen'

const Stack = createStackNavigator()

const { Navigator, Screen } = Stack

export const RootNavigator = () => (
  <Navigator initialRouteName={init}>
    <Screen
      name={init}
      component={InitScreen}
      options={{ headerShown: false }}
    />
    <Screen
      name={causes}
      component={CausesScreen}
      options={{ headerShown: false }}
    />
    <Screen
      name={cards}
      component={CardsScreen}
      options={{ headerShown: false }}
    />
  </Navigator>
)
