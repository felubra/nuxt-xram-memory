<script>
import {
  EMPTY,
  DOWNLOADING,
  LOADING,
  LOADED,
  LOAD_ERROR,
  DOWNLOAD_ERROR
} from '~/config/constants'

import lunr from 'elasticlunr'
const searchJS = require('searchjs')
// TODO: suporte a SSR
// TODO: readicionar suporte à linguagens
// TODO: computed prop com a contagem
// TODO: timer?
// TODO: suporte à ordenação
// TODO: renderizar uma tag customizável?

export default {
  name: 'LocalSearch',
  props: {
    indexURL: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // Os resultados de busca antes da aplicação dos filtros
      unfilteredResults: [],
      // Os filtros ativos e seus valores
      activeFilters: {},
      // O estado de carregamento do índice
      indexStatus: EMPTY
    }
  },
  computed: {
    /**
     * Retorna os resultados de busca, restritos aos filtros ativos.
     */
    searchResults() {
      try {
        if (Object.keys(this.activeFilters).length) {
          return searchJS.matchArray(this.unfilteredResults, this.activeFilters)
        }
        return this.unfilteredResults
      } catch (e) {
        return this.unfilteredResults
      }
    },
    /**
     * Com base nos resultados de busca, retorna objeto com os filtros e seus valores disponíveis.
     */
    availableFilters() {
      try {
        return this.searchResults.reduce((filters, document) => {
          Object.entries(document)
            .filter(([, value]) => value !== null) // filtre valores nulos
            .forEach(([propName, value]) => {
              if (Array.isArray(value)) {
                if (filters[propName]) {
                  value.forEach(v => filters[propName].add(v.toString()))
                } else {
                  filters[propName] = new Set(
                    value.filter(v => v !== null).map(v => v.toString())
                  )
                }
              } else {
                filters[propName] = filters[propName]
                  ? filters[propName].add(value.toString())
                  : new Set([value.toString()])
              }
            })
          return filters
        }, {})
      } catch (e) {
        return {}
      }
    }
  },
  watch: {
    /**
     * Emite um evento indicando mudança no status do índice
     */
    indexStatus: {
      immediate: true,
      handler(v) {
        this.$emit('indexStatusChange', v)
      }
    }
  },
  /**
   * Carregue imediatamente o índice na criação do componente.
   */
  async created() {
    await this.fetchAndLoadIndex()
    searchJS.setDefaults({
      join: 'OR'
    })
  },
  methods: {
    /**
     * Baixa e carrega o arquivo do índice
     */
    async fetchAndLoadIndex() {
      try {
        this.indexStatus = DOWNLOADING
        const serializedIndex = await this.$axios.$get(this.indexURL)
        try {
          this.indexStatus = LOADING
          this.index = lunr.Index.load(serializedIndex)
          this.indexStatus = LOADED
        } catch (e) {
          this.indexStatus = LOAD_ERROR
        }
      } catch (e) {
        this.indexStatus = DOWNLOAD_ERROR
      }
    },
    removeFilter(filterName) {
      this.$delete(this.activeFilters, filterName)
    },
    /**
     * Defina o valor de um filtro
     */
    filterBy(filterName, value) {
      this.$set(this.activeFilters, filterName, value)
    },
    /**
     * Retorne os campos documentStore que são vetores, para serem utilizados por componentes filhos
     * como filtros para os resultados de pesquisa.
     */

    /**
     * Faz uma busca por texto completo no índice
     */
    search(searchQuery, fieldConfiguration = {}) {
      try {
        this.unfilteredResults = this.index
          .search(searchQuery, fieldConfiguration)
          .map(result => result.ref)
          .map(this.index.documentStore.getDoc, this.index.documentStore)
      } catch (e) {
        this.unfilteredResults = []
      }
    }
  },
  provide() {
    const localSearchState = {}
    Object.defineProperties(localSearchState, {
      indexStatus: {
        enumerable: true,
        get: () => this.indexStatus
      },
      fieldValues: {
        enumerable: true,
        get: () => this.fieldValues
      },
      availableFilters: {
        enumerable: true,
        get: () => this.availableFilters
      }
    })
    return {
      // O estado do índice, dos componentes e dos filtros
      localSearchState,
      // Funções para manipulação do estado
      filterBy: this.filterBy,
      // A função para busca
      search: this.search,
      // Função para remover um filtro
      removeFilter: this.removeFilter
    }
  },
  render() {
    return this.$scopedSlots.default({
      indexStatus: this.indexStatus,
      searchResults: this.searchResults
    })
  }
}
</script>
