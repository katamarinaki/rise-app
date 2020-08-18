import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, Text, TouchableWithoutFeedback } from 'react-native'
import Canvas from 'react-native-canvas'
import styled from 'styled-components/native'

const C_RADIUS = 50
const C_DIAMETER = C_RADIUS * 2

const dataset = [
  { id: 'trump', label: '#TrumpMadeInChina', radius: 60, color: 'red' },
  { id: 'chicago', label: '#ChicagoRiots', radius: 50, color: '#f08d86' },
  { id: 'blm', label: '#BLM', radius: 66, color: '#5d8ae3' },
  { id: 'corona', label: 'Coronavirus', radius: 40, color: '#6e365c' },
  { id: 'belarus', label: 'Belarus', color: '#13a11f', radius: 50 },
]

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const generateCircle = (ctx, id, x, y, radius, label, color) => {
  const vx = ctx.center.x - x
  const vy = ctx.center.y - y
  const vLengthInverted = 1 / Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2))
  return {
    id,
    x,
    y,
    radius,
    color,
    vx: vx * vLengthInverted,
    vy: vy * vLengthInverted,
    label,
    isSelected: false,
    maxRadius: 100,
    draw: function() {
      const fontSize = Math.floor(this.radius / 3)
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fillStyle = this.color
      ctx.shadowColor = this.color
      ctx.shadowBlur = 15
      ctx.fill()
      if (this.isSelected) {
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3
        ctx.stroke()
      }
      ctx.fillStyle = 'white'
      ctx.font = `${fontSize}px Arial`
      ctx.fillText(
        label,
        this.x,
        this.y + fontSize / 2 - 5,
        this.radius * 2 - 5,
      )
    },
    // clear: function() {
    //   ctx.clearRect(
    //     this.x - this.radius,
    //     this.y - this.radius,
    //     this.radius * 2 + 10,
    //     this.radius * 2 + 10,
    //   )
    // },
  }
}

const generareCircles = (ctx, data) => {
  const { width, height } = Dimensions.get('screen')
  const x1 = C_DIAMETER
  const x2 = width - C_DIAMETER
  const y1 = C_DIAMETER
  const y2 = height - C_DIAMETER
  return data.map(item => {
    return generateCircle(
      ctx,
      item.id,
      getRandomInt(x1, x2),
      getRandomInt(y1, y2),
      item.radius,
      item.label,
      item.color,
    )
  })
}

const animateCircles = ctx => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.circles.forEach(circleA => {
    // if (circleA.radius < circleA.maxRadius) {
    //   circleA.radius += 0.1
    // }
    ctx.circles.forEach(circleB => {
      const dx = circleB.x - circleA.x
      const dy = circleB.y - circleA.y
      const distanceBetweenCenters = Math.hypot(dx, dy)
      const radSum = circleA.radius + circleB.radius
      const areOverlapping = distanceBetweenCenters < radSum

      if (areOverlapping) {
        const overlapDistance = radSum - distanceBetweenCenters
        const percentOverlap = overlapDistance / radSum

        const halfPercent = percentOverlap * 0.5

        circleA.x -= dx * halfPercent
        circleA.y -= dy * halfPercent

        circleB.x += dx * halfPercent
        circleB.y += dy * halfPercent
      }
    })
    circleA.x += circleA.vx
    circleA.y += circleA.vy
  })
  ctx.circles.forEach(circle => {
    const vx = ctx.center.x - circle.x
    const vy = ctx.center.y - circle.y
    const vLengthInverted = 1 / Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2))
    circle.vx = vx * vLengthInverted
    circle.vy = vy * vLengthInverted
  })
  ctx.circles.forEach(circle => {
    circle.draw()
  })
  // requestAnimationFrame(animateCircles.bind(this, ctx))
}

export const CausesCanvas = () => {
  const [selectedCauses, setSelectedCauses] = useState([])
  const [isCanvasInited, setIsCanvasInited] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current && !isCanvasInited) {
      initCanvas(canvasRef.current)
    }
  }, [canvasRef, isCanvasInited])

  const onCanvasClick = useCallback(event => {
    const { locationX, locationY } = event.nativeEvent
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx.circles) {
        const touchedCircle = ctx.circles.find(
          c =>
            Math.pow(locationX - c.x, 2) + Math.pow(locationY - c.y, 2) <
            Math.pow(c.radius, 2),
        )
        if (touchedCircle) {
          touchedCircle.isSelected = !touchedCircle.isSelected
          setSelectedCauses(ctx.circles.filter(c => c.isSelected))
        }
      }
    }
  }, [])

  const initCanvas = useCallback(canvas => {
    const { width, height } = Dimensions.get('screen')
    const ctx = canvas.getContext('2d')
    ctx.canvas.width = width
    ctx.canvas.height = height
    ctx.textAlign = 'center'
    ctx.center = { x: Math.floor(width / 2), y: Math.floor(height / 2) - 50 }

    ctx.circles = generareCircles(ctx, dataset)

    animateCircles(ctx)

    setIsCanvasInited(true)
  }, [])

  return (
    <TouchableWithoutFeedback onPress={onCanvasClick}>
      <Container>
        <SelectedCirclesView>
          {selectedCauses.length ? (
            <Text>
              {selectedCauses.map(cause => (
                <Text key={cause.id}>{cause.label}, </Text>
              ))}
            </Text>
          ) : (
            <Text>No causes selected</Text>
          )}
        </SelectedCirclesView>

        <Canvas ref={canvasRef} />
      </Container>
    </TouchableWithoutFeedback>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const SelectedCirclesView = styled.View`
  padding: 16px;
`
