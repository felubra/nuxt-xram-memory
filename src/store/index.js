export const state = () => ({
  menuVisible: false,
  pages: []
})

export const mutations = {
  /** Menu */
  showMenu(state) {
    state.menuVisible = true
  },
  hideMenu(state) {
    state.menuVisible = false
  },
  toggleMenu(state) {
    state.menuVisible = !state.menuVisible
  },
  /** Páginas */
  addPages(state, pages) {
    if (Array.isArray(pages) && pages.length > 0) {
      const newPages = pages.filter(
        newPage => !state.pages.find(page => page.id === newPage.id)
      )
      state.pages = [...state.pages, ...newPages]
    }
  }
}

export const getters = {
  menuPageLinks({ pages }) {
    return pages.filter(page => page.show_in_menu === true)
  }
}

export const actions = {
  toggleMenu({ commit }) {
    commit('toggleMenu')
  },
  hideMenu({ commit }) {
    commit('hideMenu')
  },
  async fetchPagesInMenu({ commit }) {
    const pagesInMenu = await this.$axios.$get('api/v1/pages/in_menu')
    commit('addPages', pagesInMenu)
  }
}
