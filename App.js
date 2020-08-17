import React from 'react'
import { StatusBar } from 'react-native'
import { CausesScreen } from './src/screens/causes-screen'
import styled from 'styled-components/native'

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Container>
        <CausesScreen />
      </Container>
    </>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export default App
