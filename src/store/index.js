export const state = () => ({
  menuVisible: false,
  pages: [
    {
      position: ['menu'],
      icon: 'search',
      title: 'Notícias',
      featured: false,
      published: true,
      teaser: '',
      url: {
        name: 'search-query'
      },
      weight: 0
    },
    {
      position: ['menu'],
      icon: 'search',
      title: 'Imagens',
      featured: false,
      published: true,
      teaser: '',
      url: {
        name: 'images'
      },
      weight: 0
    },
    {
      position: ['menu'],
      icon: 'feedback',
      title: 'Contato',
      featured: false,
      published: true,
      teaser: '',
      url: {
        name: 'contact'
      },
      weight: 10
    },
    {
      position: ['menu-footer'],
      icon: '',
      title: 'Termos de Uso',
      featured: false,
      published: true,
      teaser: '',
      url: 'termos_de_uso'
    },
    {
      position: ['menu-footer'],
      icon: '',
      title: 'Política de privacidade',
      featured: false,
      published: true,
      teaser: '',
      url: 'politica_privacidade'
    }
  ]
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
        newPage => !state.pages.find(page => page.url === newPage.url)
      )
      state.pages = [...state.pages, ...newPages]
    }
  }
}

export const getters = {
  pageLinks({ pages }) {
    return function(position = 'menu') {
      return pages
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
        .sort((a, b) => a.weight || 0 - b.weight || 0)
    }
  },
  featuredPages({ pages }) {
    return pages.filter(page => page.featured === true)
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
  },
  async fetchFeaturedPages({ commit }) {
    const featuredPages = await this.$axios.$get('api/v1/pages/featured')
    commit('addPages', featuredPages)
  }
}
