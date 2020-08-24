import React, { useCallback } from 'react'
import * as d3 from 'd3'
import Svg, { Circle, G, Text as SVGText } from 'react-native-svg'

export const BubbleChart = props => {
  const {
    height,
    width,
    dataSet,
    textProps,
    circleProps,
    onBubblePress,
  } = props

  const generateFontSize = useCallback(value => {
    let size = 14
    if (value < 10) {
      size = 10
    } else if (value >= 10 && value < 50) {
      size = 12
    } else {
      size = 16
    }
    return size
  }, [])

  const renderBubbles = () => {
    const root = d3
      .pack()
      .size([width - 2, height - 2])
      .padding(10)(d3.hierarchy({ children: dataSet }).sum(d => d.value))

    return root.leaves().map(leaf => {
      const fontSize = generateFontSize(leaf.r)
      return (
        <G
          key={leaf.data.id}
          transform={`translate(${leaf.x + 1},${leaf.y + 1})`}
          onPress={() => onBubblePress(leaf)}
        >
          <Circle
            {...circleProps}
            r={leaf.r}
            fill={leaf.data.color}
            stroke={leaf.data.isSelected ? '#000' : leaf.data.color}
            strokeWidth={3}
          />
          <SVGText
            {...textProps}
            fill="#fff"
            fontSize={fontSize}
            x="0"
            y={leaf.r / 8}
            textAnchor="middle"
          >
            {leaf.data.name}
          </SVGText>
        </G>
      )
    })
  }

  return (
    <Svg width={width} height={height}>
      {renderBubbles()}
    </Svg>
  )
}
