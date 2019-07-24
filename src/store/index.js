export const state = () => ({
  menuVisible: false,
  isNavBarSearching: false,
  pages: [
    {
      position: ['menu'],
      icon: 'search',
      title: 'Início',
      featured: false,
      published: true,
      teaser: '',
      url: {
        name: 'index'
      },
      weight: 0
    },
    {
      position: ['menu'],
      icon: 'search',
      title: 'Assuntos',
      featured: false,
      published: true,
      teaser: '',
      url: {
        name: 'subjects'
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
      position: ['menu-controls'],
      icon: 'email',
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
      position: ['menu-controls'],
      icon: 'search',
      title: 'Pesquisa',
      featured: false,
      published: true,
      teaser: '',
      url: {
        name: 'search'
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
    },
    {
      position: ['menu-footer'],
      icon: '',
      title: 'Licenças de código aberto',
      featured: false,
      published: true,
      teaser: '',
      url: 'licencas'
    }
  ]
})

export const mutations = {
  /** Menu */
  showMenu: state => (state.menuVisible = true),
  hideMenu: state => (state.menuVisible = false),
  toggleMenu: state => (state.menuVisible = !state.menuVisible),
  /** Modo de busca na barra de navegação */
  showSearch: state => (state.isNavBarSearching = true),
  hideSearch: state => (state.isNavBarSearching = false),
  toggleSearch: state => (state.isNavBarSearching = !state.isNavBarSearching),
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
        // TODO: bug misterioso que altera a ordem dos controles do menu
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
  toggleSearch: ({ commit }) => commit('toggleSearch'),
  hideSearch: ({ commit }) => commit('hideSearch'),
  async fetchPagesInMenu({ commit }) {
    const pagesInMenu = await this.$axios.$get('api/v1/pages/in_menu')
    commit('addPages', pagesInMenu)
  },
  async fetchFeaturedPages({ commit }) {
    const featuredPages = await this.$axios.$get('api/v1/pages/featured')
    commit('addPages', featuredPages)
  }
}
