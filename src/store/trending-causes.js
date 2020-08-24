export default initialCauses => store => {
  store.on('@init', () => ({
    trendingCauses: initialCauses,
    selectedCauses: [],
  }))
  store.on(
    'trendingCauses/updateValue',
    ({ trendingCauses }, { id, value }) => {
      const newCauses = trendingCauses
      const index = newCauses.findIndex(cause => cause.id === id)
      newCauses[index].value = value
      return { trendingCauses: newCauses }
    },
  )
  store.on('trendingCauses/selectCause', ({ trendingCauses }, id) => {
    const newCauses = trendingCauses
    const index = newCauses.findIndex(cause => cause.id === id)
    newCauses[index].isSelected = !newCauses[index].isSelected
    const selectedCauses = newCauses.filter(cause => cause.isSelected)
    return { trendingCauses: newCauses, selectedCauses }
  })
}
