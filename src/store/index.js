import {
  EMPTY,
  DOWNLOADING,
  LOADING,
  LOADED,
  LOAD_ERROR,
  DOWNLOAD_ERROR,
  LUNR_INDEX_STATUSES,
  LOAD_LUNR_INDEX,
  SET_LUNR_INDEX_STATUS
} from './constants'

export const state = () => ({
  menuVisible: false,
  isNavBarSearching: false,
  lunrIndexStatus: EMPTY,
  lunrIndex: null,
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
  // TODO: usar constantes em todos os nomes de mutação
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
  },
  /**
   * Define o estado de processamento do índice para um estado conhecido
   */
  [SET_LUNR_INDEX_STATUS](state, status) {
    if (!LUNR_INDEX_STATUSES.includes(status)) {
      throw new Error('Estado de índice inválido')
    }
    state.lunrIndexStatus = status
  },

  /**
   * Processa um índice serializado e o define no estado
   */
  [LOAD_LUNR_INDEX](state, index) {
    state.lunrIndex = this.$lunr.Index.load(index)
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
        // FIXME: bug misterioso que altera a ordem dos controles do menu
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
  },
  /**
   * Faz uma pesquisa no índice e retorna os resultados
   */
  async search({ state }, searchQuery = '') {
    if (state.lunrIndexStatus === LOADED) {
      return state.lunrIndex
        .search(searchQuery)
        .map(result => result.ref)
        .map(ref => state.lunrIndex.documentStore.getDoc(ref))
    }
    return []
  },
  /**
   * Faz o download do índice e o carrega na memória
   */
  async fetchLunrIndex({ commit, state }, forceDownload = false) {
    //TODO: avaliar se podemos colocar o documentStore do índice numa prop separadas
    if (state.lunrIndexStatus !== LOADED || forceDownload) {
      try {
        commit(SET_LUNR_INDEX_STATUS, DOWNLOADING)
        const serializedIndex = await this.$axios.$get(
          'media/lunr_index/index.json'
        )
        try {
          commit(SET_LUNR_INDEX_STATUS, LOADING)
          commit(LOAD_LUNR_INDEX, serializedIndex)
          commit(SET_LUNR_INDEX_STATUS, LOADED)
        } catch {
          commit(SET_LUNR_INDEX_STATUS, LOAD_ERROR)
        }
      } catch (e) {
        commit(SET_LUNR_INDEX_STATUS, DOWNLOAD_ERROR)
      }
    }
  }
}
