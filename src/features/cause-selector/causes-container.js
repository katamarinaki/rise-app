import { Container } from '@src/shared/container'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { BubbleChart } from './bubble-chart'
import { useStoreon } from 'storeon/react'
import WS from 'react-native-websocket'
import { Loader } from '@src/shared/loader'
import { useNavigation } from '@react-navigation/native'
import { cards } from '@src/lib/routes'

export const CausesContainer = () => {
  const wsRef = useRef(null)
  const { width, height } = useWindowDimensions()
  const [isLoaded, setIsLoaded] = useState(false)

  const navigation = useNavigation()
  const { dispatch, trendingCauses, selectedCauses } = useStoreon(
    'trendingCauses',
    'selectedCauses',
  )

  useEffect(() => {
    if (trendingCauses.length && !isLoaded) {
      animate()
      setIsLoaded(true)
    }
  }, [isLoaded, trendingCauses])

  const animate = () => {
    // console.log('animate')
    dispatch('trendingCauses/update')
    requestAnimationFrame(animate)
  }

  const onBubbleSelect = useCallback(bubble => {
    dispatch('trendingCauses/selectCause', bubble.data.id)
  }, [])

  const onButtonPress = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ command: 'close' }))
    }
    navigation.navigate(cards)
  }, [])

  return (
    <>
      {isLoaded ? (
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
            onPress={onButtonPress}
            title="Continue"
            disabled={selectedCauses.length === 0}
          />
        </Container>
      ) : (
        <Loader />
      )}
      <WS
        ref={wsRef}
        url="ws://localhost:5000/twitter"
        onOpen={() =>
          wsRef.current.send(JSON.stringify({ command: 'getTweets' }))
        }
        onMessage={message => dispatch('trendingCauses/newData', message)}
      />
    </>
  )
}

const TitleView = styled.View`
  padding: 16px;
`

const Title = styled.Text`
  font-size: 16px;
  text-align: center;
`
