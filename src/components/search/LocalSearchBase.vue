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
import { groups } from 'd3-array'

export default {
  name: 'LocalSearchBase',
  props: {
    indexURL: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      indexState: EMPTY,
      searchState: {},
      filterState: {},
      registeredFilters: [],
      filterDataSources: {}
    }
  },
  computed: {
    searchResults() {
      try {
        return searchJS.matchArray(
          this.unfilteredSearchResults,
          this.filterState
        )
      } catch {
        return []
      }
    },
    unfilteredSearchResults() {
      const searchQuery = Object.values(this.searchState).reduce(
        (str, value) => `${str} ${value}`,
        ''
      )
      try {
        return this.index
          .search(searchQuery)
          .map(result => result.ref)
          .map(this.index.documentStore.getDoc, this.index.documentStore)
      } catch {
        return []
      }
    }
  },
  watch: {
    unfilteredSearchResults: {
      deep: true,
      immediate: true,
      handler() {
        this.updateFilterDataSources()
      }
    }
  },
  async created() {
    await this.fetchAndLoadIndex()
  },
  methods: {
    /**
     * Baixa e carrega o arquivo do índice
     */
    async fetchAndLoadIndex() {
      try {
        this.indexState = DOWNLOADING
        const serializedIndex = await this.$axios.$get(this.indexURL)
        try {
          this.indexState = LOADING
          this.index = lunr.Index.load(serializedIndex)
          this.indexState = LOADED
        } catch (e) {
          this.indexState = LOAD_ERROR
        }
      } catch (e) {
        this.indexState = DOWNLOAD_ERROR
      }
    },
    searchBy(componentId, value) {
      if (value) {
        this.$set(this.searchState, componentId, value)
      } else {
        this.$delete(this.searchState, componentId)
      }
    },
    filterBy(componentId, value) {
      if (value) {
        this.$set(this.filterState, componentId, value)
      } else {
        this.$delete(this.filterState, componentId)
      }
    },
    registerFilter(fieldName) {
      if (!this.registeredFilters.includes(fieldName)) {
        this.registeredFilters.push(fieldName)
      }
      this.updateFilterDataSources()
    },
    // TODO: pode ser computed prop
    updateFilterDataSources() {
      this.filterDataSources = this.registeredFilters.reduce(
        (filtersData, fieldName) => {
          filtersData[fieldName] = Array.from(
            new Set(
              // TODO: suporte à campos-filho, com notação de ponto
              groups(this.unfilteredSearchResults, d => d[fieldName]).reduce(
                (allFieldData, [fieldData]) => {
                  return allFieldData.concat(fieldData)
                },
                []
              )
            )
          )
          return filtersData
        },
        {}
      )
    }
  },
  provide() {
    const state = {}
    Object.defineProperty(state, 'filterDataSources', {
      get: () => this.filterDataSources,
      enumerable: true
    })
    return {
      state,
      searchBy: this.searchBy,
      filterBy: this.filterBy,
      registerFilter: this.registerFilter
    }
  },
  render(h) {
    return h('div', [
      this.$scopedSlots.default({
        text: this.message
      })
    ])
  }
}
</script>

<style>
</style>
