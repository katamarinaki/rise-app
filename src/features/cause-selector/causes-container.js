import { Container } from '@src/shared/container'
import React, { useEffect } from 'react'
import { Button, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { BubbleChart } from './bubble-chart'
import { useStoreon } from 'storeon/react'

export const CausesContainer = () => {
  const { width, height } = useWindowDimensions()
  const { dispatch, trendingCauses, selectedCauses } = useStoreon(
    'trendingCauses',
    'selectedCauses',
  )

  useEffect(() => {
    animateCircle()
  }, [])

  const animateCircle = () => {
    const updatedCause = trendingCauses[0]
    dispatch('trendingCauses/updateValue', {
      id: updatedCause.id,
      value: updatedCause.value + 1,
    })
    if (updatedCause.value < 200) {
      // requestAnimationFrame(animateCircle)
    }
  }

  const onBubbleSelect = bubble => {
    dispatch('trendingCauses/selectCause', bubble.data.id)
  }

  return (
    <Container>
      <TitleView>
        <Title>
          Please select at least one cause that you find important for you
        </Title>
      </TitleView>
      <BubbleChart
        width={width}
        height={height - 200}
        dataSet={trendingCauses}
        onBubblePress={onBubbleSelect}
      />
      <Button
        onPress={() => {}}
        title="Continue"
        disabled={selectedCauses.length === 0}
      />
    </Container>
  )
}

const TitleView = styled.View`
  padding: 16px;
`

const Title = styled.Text`
  font-size: 16px;
  text-align: center;
`
