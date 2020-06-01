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
import { groups } from 'd3-array'
import objectPath from 'object-path'
const searchJS = require('searchjs')
import isEmpty from 'lodash/isEmpty'

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
      registeredFilters: []
    }
  },
  computed: {
    filterDataSources() {
      return this.registeredFilters.reduce((filtersData, fieldName) => {
        filtersData[fieldName] = Array.from(
          new Set(
            groups(this.searchResults, d =>
              objectPath.get(d, fieldName)
            ).reduce((allFieldData, [fieldData]) => {
              return allFieldData.concat(fieldData)
            }, [])
          )
        )
        return filtersData
      }, {})
    },
    isEmpty() {
      return isEmpty(this.searchState) && isEmpty(this.filterState)
    },
    resultCount() {
      try {
        return this.searchResults.length
      } catch {
        return 0
      }
    },
    selectedFilters() {
      return Object.entries(this.filterState).reduce(
        (selected, [key, value]) => {
          if (!isEmpty(value)) {
            selected[key] = value
          }
          return selected
        },
        {}
      )
    },
    searchResults() {
      try {
        return searchJS.matchArray(
          this.unfilteredSearchResults,
          this.selectedFilters
        )
      } catch (e) {
        return []
      }
    },
    allDocuments() {
      return (
        (this.indexState === LOADED &&
          Object.values(this.index.documentStore.docs)) ||
        []
      )
    },
    searchQuery() {
      try {
        const values = Object.values(this.searchState)
        return (values.length && values.join(' ')) || ''
      } catch {
        return ''
      }
    },
    unfilteredSearchResults() {
      try {
        if (this.searchQuery) {
          return this.index
            .search(this.searchQuery)
            .map(result => result.ref)
            .map(this.index.documentStore.getDoc, this.index.documentStore)
        }
        return this.allDocuments
      } catch {
        return []
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
    registerFilter(fieldName) {
      if (!this.registeredFilters.includes(fieldName)) {
        this.registeredFilters.push(fieldName)
      }
    },
    clear() {
      for (let collection of [this.searchState, this.filterState]) {
        for (let key in collection) {
          this.$set(collection, key, null)
        }
      }
    }
  },
  provide() {
    const state = {}
    Object.defineProperties(state, {
      filterDataSources: {
        get: () => this.filterDataSources,
        enumerable: true
      },
      searchState: {
        get: () => this.searchState,
        set: v => (this.searchState = v),
        enumerable: true
      },
      filterState: {
        get: () => this.filterState,
        set: v => (this.filterState = v),
        enumerable: true
      }
    })
    return {
      state,
      registerFilter: this.registerFilter
    }
  },
  render(h) {
    return h('div', [
      this.$scopedSlots.default({
        results: this.searchResults,
        resultCount: this.resultCount,
        clear: this.clear
      })
    ])
  }
}
</script>

<style>
</style>
