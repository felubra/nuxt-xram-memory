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
      filterState: {}
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
    }
  },
  provide() {
    return {
      searchBy: this.searchBy,
      filterBy: this.filterBy
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
