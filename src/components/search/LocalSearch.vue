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
      searchResults: []
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
        /* Filtre a lista de campos do estado, mas que são pesquisáveis no índice
        TODO: Faça a pesquisa utilizando uma configuração específica, onde estão definidos os campos e seus pesos
        /*const indexedFields = this.index.getFields()
        const searcheableFields = Object.keys(searchState).filter(field =>
          indexedFields.includes(field)
        )
        // Concatene o valor de todos os campos de pesquisa numa string
        */
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
          .map(ref => this.index.documentStore.getDoc(ref))
      } catch {
        return []
      }
    }
  },
  provide() {
    return {
      localSearch: {
        indexStatus: this.indexStatus,
        searchState: this.searchState
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
