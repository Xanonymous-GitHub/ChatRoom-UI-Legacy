import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'
import { themeModes } from '~/store/types/appTypes'
const state = () => ({
  themeMode: themeModes
})

const getters = getterTree(state, {

})

const mutations = mutationTree(state, {

})

const actions = actionTree(
  { state, getters, mutations },
  {

  }
)

export default {
  state,
  getters,
  mutations,
  actions
}
