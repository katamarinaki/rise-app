import { Container } from '@src/shared/container'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

export const Loader = () => {
  return (
    <LoaderView>
      <ActivityIndicator size="large" color="#000" />
    </LoaderView>
  )
}

const LoaderView = styled(Container)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
