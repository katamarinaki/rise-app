import { Container } from '@src/shared/container'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { BubbleChart } from './bubble-chart'
import { useStoreon } from 'storeon/react'

const DEFAULT_DATA = [
  {
    name: '#Trump',
    color: 'gray',
    value: 90,
    id: '1',
    isSelected: false,
  },
  {
    name: '#ChicagoRiots',
    color: 'pink',
    value: 60,
    id: '2',
    isSelected: false,
  },
  { name: '#BLM', color: 'red', value: 30, id: '3', isSelected: false },
  {
    name: 'Coronavirus',
    color: 'purple',
    value: 80,
    id: '4',
    isSelected: false,
  },
  {
    name: 'Belarus',
    color: 'green',
    value: 40,
    id: '5',
    isSelected: false,
  },
]

export const CausesContainer = () => {
  const { width, height } = useWindowDimensions()
  const { dispatch, trendingCauses } = useStoreon('trendingCauses')

  useEffect(() => {
    animateCircle()
  }, [])

  const animateCircle = () => {
    const updatedCause = trendingCauses[1]
    dispatch('trendingCauses/updateValue', {
      id: updatedCause.id,
      value: updatedCause.value + 1,
    })
    if (updatedCause.value < 200) {
      // requestAnimationFrame(animateCircle)
    }
  }

  const onBubbleSelect = bubble => {
    const newData = trendingCauses.map(item => {
      if (item.id === bubble.data.id) {
        item.isSelected = !item.isSelected
      }
      return item
    })
    // setData(newData)
  }

  const selectedData = useMemo(() => {
    return trendingCauses.filter(item => item.isSelected === true)
  }, [trendingCauses])

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
        disabled={selectedData.length === 0}
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
