import React, { useEffect, useMemo, useState } from 'react'
import { Button, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { BubbleChart } from './bubble-chart'

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
  const [data, setData] = useState(DEFAULT_DATA)

  useEffect(() => {
    animateCircle()
  }, [])

  const animateCircle = () => {
    const newData = data.map((item, index) => {
      if (index === 4) {
        item.value += 0.5
      }
      return item
    })
    setData(newData)
    if (newData[4].value < 200) {
      requestAnimationFrame(animateCircle)
    }
  }

  const onBubbleSelect = bubble => {
    const newData = data.map(item => {
      if (item.id === bubble.data.id) {
        item.isSelected = !item.isSelected
      }
      return item
    })
    setData(newData)
  }

  const selectedData = useMemo(() => {
    return data.filter(item => item.isSelected === true)
  }, [data])
  return (
    <Container style={{ flex: 1 }}>
      <TitleView>
        <Title>
          Please select at least one cause that you find important for you
        </Title>
      </TitleView>
      <BubbleChart
        width={width}
        height={height - 200}
        dataSet={data}
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

const Container = styled.View`
  flex: 1;
  background-color: #e3eeff;
`

const TitleView = styled.View`
  padding: 16px;
`

const Title = styled.Text`
  font-size: 16px;
  text-align: center;
`
