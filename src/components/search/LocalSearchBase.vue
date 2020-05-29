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
      //TODO: results: [],
      searchState: {},
      filterState: {},
      filterDataSources: {}
    }
  },
  computed: {
    searchResults() {
      const searchQuery = Object.values(this.searchState).reduce(
        (str, value) => `${str} ${value}`,
        ''
      )
      try {
        return searchJS.matchArray(
          this.index
            .search(searchQuery)
            .map(result => result.ref)
            .map(this.index.documentStore.getDoc, this.index.documentStore),
          this.filterState
        )
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
      return this.$set(this.filterDataSources, fieldName, [])
    }
  },
  provide() {
    return {
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
