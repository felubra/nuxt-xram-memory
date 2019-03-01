export const state = () => ({
  menuVisible: false
})

export const mutations = {
  showMenu(state) {
    state.menuVisible = true
  },
  hideMenu(state) {
    state.menuVisible = false
  },
  toggleMenu(state) {
    state.menuVisible = !state.menuVisible
  }
}

export const actions = {
  toggleMenu({ commit }) {
    commit('toggleMenu')
  },
  hideMenu({ commit }) {
    commit('hideMenu')
  }
}
