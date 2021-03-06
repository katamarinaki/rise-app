import React from 'react'
import { View } from 'react-native'

export const Container = props => (
  <View
    style={[
      { flex: 1, backgroundColor: '#FBFBFB', padding: 16 },
      props.style ? [...props.style] : {},
    ]}
  >
    {props.children}
  </View>
)
