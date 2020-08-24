export default initialCauses => store => {
  store.on('@init', () => ({ trendingCauses: initialCauses }))
  store.on(
    'trendingCauses/updateValue',
    ({ trendingCauses }, { id, value }) => {
      const newCauses = trendingCauses
      const index = newCauses.findIndex(cause => cause.id === id)
      newCauses[index].value = value
      return { trendingCauses: newCauses }
    },
  )
  // store.on('users/add', async (state, user) => {
  //   try {
  //     await api.addUser(user)
  //     store.dispatch('users/save', user)
  //   } catch (e) {
  //     store.dispatch('errors/server-error')
  //   }
  // })
}
