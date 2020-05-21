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
      // Os resultados de busca obtidos a partir do estado atual
      searchResults: [],
      // O estado atual dos componentes filhos
      fieldValues: {},
      // O estado de carregamento do índice
      indexStatus: EMPTY,
      // Filtros e seus valores
      availableFilters: {}
    }
  },
  computed: {},
  watch: {
    /**
     * Faça uma pesquisa imediatamente se o valor de um dos campos mudar
     */
    fieldValues: {
      immediate: true,
      deep: true,
      handler(fieldValues) {
        this.searchResults = this.search(this.flattern(fieldValues))
      }
    },
    /**
     * 1. Emita um evento no caso de mudança do estado do índice
     * 2. Quando o índice carregar, obtenha e disponibilize os filtros de pesquisa
     */
    indexStatus: {
      immediate: true,
      handler(v) {
        this.$emit('indexStatusChange', v)
        if (LOADED == v) {
          this.getAvailableFilters()
        }
      }
    }
  },
  /**
   * Carregue imediatamente o índice
   */
  async created() {
    await this.fetchAndLoadIndex()
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
    /**
     * Defina o valor de um campo no estado
     */
    setFieldValue(fieldName, value) {
      this.$set(this.fieldValues, fieldName, value)
    },
    /**
     * Retorne os campos documentStore que são vetores, para serem utilizados por componentes filhos
     * como filtros para os resultados de pesquisa.
     */
    getAvailableFilters() {
      try {
        this.availableFilters = Object.entries(
          this.index.documentStore.docs
        ).reduce((filters, [_, document]) => {
          Object.entries(document).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              if (filters[key]) {
                value.forEach(filters[key].add, filters[key])
              } else {
                filters[key] = new Set(value)
              }
            }
          })
          return filters
        }, {})
      } catch (e) {
        this.availableFilters = {}
      }
    },
    /**
     * Compacta os valores de um objeto numa única string
     */
    flattern(fieldValues) {
      return Object.values(fieldValues).join(' ')
    },
    /**
     * Faz uma busca por texto completo no índice
     */
    search(searchQuery) {
      try {
        //TODO: fazer pesquisa conjunta com os filtros selecionados (é possível?)
        return this.index
          .search(searchQuery, {
            fields: {
              title: { boost: 2 },
              teaser: { boost: 1 }
            },
            bool: 'OR'
          })
          .map(result => result.ref)
          .map(this.index.documentStore.getDoc, this.index.documentStore)
      } catch (e) {
        return []
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
      setFieldValue: this.setFieldValue
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
