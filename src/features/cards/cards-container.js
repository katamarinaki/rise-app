import React from 'react'
import { Text, View } from 'react-native'
import { useStoreon } from 'storeon/react'

export const CardsContainer = () => {
  const { selectedCauses } = useStoreon('selectedCauses')

  return (
    <View>
      <Text>Your selection is</Text>
      {selectedCauses.map(cause => (
        <Text>{cause.name}</Text>
      ))}
    </View>
  )
}
