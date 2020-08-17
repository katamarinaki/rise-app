let then = 0
let now = 0
// let startTime = 0
let elapsed = 0
let fpsInterval

export const startAnimatingCirlces = (ctx, fps) => {
  fpsInterval = 1000 / fps
  then = Date.now()
  // startTime = then
  animateCirlces(ctx)
}

function animateCirlces(ctx) {
  requestAnimationFrame(animateCirlces.bind(this, ctx))

  now = Date.now()
  elapsed = now - then

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.circles.forEach(circle => {
      const dx = ctx.center.x - circle.x
      const dy = ctx.center.y - circle.y
      // if (Math.hypot(dx, dy) > circle.radius * 2) {
      circle.x += circle.vx
      circle.y += circle.vy
      // }
    })
    ctx.circles.forEach(circleA => {
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
    })
    ctx.circles.forEach(circle => {
      const vx = ctx.center.x - circle.x
      const vy = ctx.center.y - circle.y
      const vLengthInverted = 1 / Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2))
      circle.vx = vx * vLengthInverted
      circle.vy = vy * vLengthInverted
      circle.draw()
    })

    // Put your drawing code here
  }
}
