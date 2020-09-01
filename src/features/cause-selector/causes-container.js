import { Container } from '@src/shared/container'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { BubbleChart } from './bubble-chart'
import { useStoreon } from 'storeon/react'
import WS from 'react-native-websocket'
import { Loader } from '@src/shared/loader'

const keywords = ['Belarus', 'Trump']

export const CausesContainer = () => {
  const wsRef = useRef(null)
  const { width, height } = useWindowDimensions()
  const [isLoaded, setIsLoaded] = useState(false)
  const { dispatch, trendingCauses, selectedCauses } = useStoreon(
    'trendingCauses',
    'selectedCauses',
  )

  useEffect(() => {
    if (trendingCauses.length === keywords.length && !isLoaded) {
      animate()
      setIsLoaded(true)
    }
  }, [isLoaded, trendingCauses])

  const needUpdate = useMemo(() => {
    return (
      trendingCauses.filter(cause => cause.value === cause.maxValue).length !==
      trendingCauses.length
    )
  }, [trendingCauses])

  const animate = useCallback(() => {
    if (needUpdate) {
      dispatch('trendingCauses/update')
      requestAnimationFrame(animate)
    }
  }, [needUpdate])

  const onBubbleSelect = useCallback(bubble => {
    dispatch('trendingCauses/selectCause', bubble.data.id)
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
            onPress={() => {}}
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
        onOpen={() => {
          keywords.forEach(keyword => {
            wsRef.current.send(
              JSON.stringify({
                command: 'getTweets',
                args: { q: keyword, count: '10' },
              }),
            )
          })
        }}
        onMessage={message => dispatch('trendingCauses/newData', message)}
        onError={console.log}
        onClose={console.log}
        // reconnect
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
