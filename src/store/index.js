import DEFAULT_PAGES from './defaultPages'

export const state = () => ({
  menuVisible: false,
  pages: DEFAULT_PAGES
})

export const mutations = {
  /** Menu */
  showMenu: state => (state.menuVisible = true),
  hideMenu: state => (state.menuVisible = false),
  toggleMenu: state => (state.menuVisible = !state.menuVisible),
  /** Páginas */
  addPages: (state, pages) => {
    if (Array.isArray(pages) && pages.length > 0) {
      const newPages = pages.filter(
        newPage => !state.pages.find(page => page.url === newPage.url)
      )
      state.pages = [...state.pages, ...newPages]
    }
  }
}

export const getters = {
  pageLinks: ({ pages }) => (position = 'menu') =>
    pages
      .filter(page => {
        switch (position) {
          case 'menu':
            return (
              page.show_in_menu ||
              (page.position && page.position.includes(position))
            )
          case 'home':
            return (
              page.show_in_home ||
              (page.position && page.position.includes(position))
            )
          default:
            return page.position && page.position.includes(position)
        }
      })
      .sort((a, b) => {
        if (position !== 'menu-controls') {
          return a.weight || 0 - b.weight || 0
        }
        return 0
      }),
  hasPagesOfMenu: (state, { pageLinks }) => pageLinks().length > 0,
  featuredPages: ({ pages }) => pages.filter(page => page.featured === true)
}

export const actions = {
  toggleMenu: ({ commit }) => commit('toggleMenu'),
  hideMenu: ({ commit }) => commit('hideMenu'),
  async fetchPagesInMenu ({ commit }) {
    const pagesInMenu = await this.$api.Pages.getAllPagesInMenu()
    commit('addPages', pagesInMenu)
  },
  async fetchFeaturedPages ({ commit }) {
    const featuredPages = await this.$api.Pages.getAllFeatured()
    commit('addPages', featuredPages)
  }
}
