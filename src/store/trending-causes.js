export default store => {
  store.on('@init', () => ({
    trendingCauses: [],
    selectedCauses: [],
  }))
  store.on('trendingCauses/newData', ({ trendingCauses }, data) => {
    const updatedCause = JSON.parse(data.data)
    if (!updatedCause || updatedCause.error) {
      return { trendingCauses }
    }
    const newCauses = [...trendingCauses]
    const existedCauseIndex = newCauses.findIndex(
      cause => cause.id === updatedCause.id,
    )
    if (existedCauseIndex !== -1) {
      newCauses[existedCauseIndex] = {
        ...newCauses[existedCauseIndex],
        maxValue: updatedCause.value,
      }
    } else {
      newCauses.push({
        ...updatedCause,
        maxValue: updatedCause.value,
        isSelected: false,
      })
    }
    return { trendingCauses: newCauses }
  })
  store.on('trendingCauses/selectCause', ({ trendingCauses }, id) => {
    const newCauses = trendingCauses
    const index = newCauses.findIndex(cause => cause.id === id)
    newCauses[index].isSelected = !newCauses[index].isSelected
    const selectedCauses = newCauses.filter(cause => cause.isSelected)
    return { trendingCauses: newCauses, selectedCauses }
  })
  store.on('trendingCauses/update', ({ trendingCauses }) => {
    const newCauses = [...trendingCauses]
    newCauses.map(cause => {
      if (cause.value < cause.maxValue) {
        cause.value += 0.5
        return cause
      }
      if (cause.value > cause.maxValue) {
        cause.value -= 0.5
        return cause
      }
      return cause
    })
    return {
      trendingCauses: newCauses,
    }
  })
}

// if (needCauseUpdate) {
//   const newCauses = [...trendingCauses]
//   newCauses.map(cause => {
//     if (cause.value < cause.maxValue) {
//       cause.value += 0.5
//       return cause
//     }
//     if (cause.value > cause.maxValue) {
//       cause.value -= 0.5
//       return cause
//     }
//     return cause
//   })
//   const needUpdate =
//     newCauses.filter(cause => cause.value === cause.maxValue).length !==
//     newCauses.length
//   return { trendingCauses: newCauses, needCauseUpdate: needUpdate }
// } else {
//   const indexToUpdate = random(0, trendingCauses.length - 1, false)
//   const newCauses = [...trendingCauses]
//   if (newCauses[indexToUpdate].maxValue > 200) {
//     newCauses[indexToUpdate].maxValue = Math.floor(
//       newCauses[indexToUpdate].maxValue - random(20, 40, false),
//     )
//   } else if (newCauses[indexToUpdate].maxValue > 10) {
//     newCauses[indexToUpdate].maxValue = Math.floor(
//       newCauses[indexToUpdate].maxValue + random(20, 40, false),
//     )
//   }
//   return { trendingCauses: newCauses, needCauseUpdate: true }
// }
