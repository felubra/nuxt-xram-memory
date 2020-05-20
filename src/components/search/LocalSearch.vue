<script>
// TODO: suporte a SSR
import {
  EMPTY,
  DOWNLOADING,
  LOADING,
  LOADED,
  LOAD_ERROR,
  DOWNLOAD_ERROR,
  LUNR_INDEX_STATUSES
} from '~/config/constants'

import lunr from 'elasticlunr'
// TODO: readicionar suporte à linguagens
// TODO: computed prop com a contagem
// TODO: timer?
// TODO: suporte à ordenação
// TODO: renderizar uma tag customizável?
import Vue from 'vue'

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
      indexStatus: EMPTY,
      searchState: {},
      searchResults: [],
      index: null
    }
  },
  computed: {
    /**
     * Retorne os campos documentStore que são vetores, para serem utilizados por componentes filhos
     * como filtros para os resultados de pesquisa.
     */
    availableFilters() {
      try {
        return Object.entries(this.index.documentStore.docs).reduce(
          (filters, [_, document]) => {
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
          },
          {}
        )
      } catch (e) {
        return {}
      }
    }
  },
  watch: {
    searchState: {
      immediate: true,
      deep: true,
      handler(searchState) {
        this.searchResults = this.search(searchState)
      }
    },
    indexStatus: {
      immediate: true,
      handler(v) {
        this.$emit('indexStatusChange', v)
      }
    }
  },
  async created() {
    await this.fetchAndLoadIndex()
  },
  methods: {
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
    search(searchState) {
      try {
        //TODO: fazer pesquisa conjunta com os filtros selecionados (é possível?)
        const searchQuery = Object.values(searchState).join(' ')
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
    return {
      localSearch: {
        indexStatus: this.indexStatus,
        searchState: this.searchState,
        availableFilters: this.availableFilters
      }
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
