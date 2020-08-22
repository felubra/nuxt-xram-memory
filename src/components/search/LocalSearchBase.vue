<template>
  <div>
    <slot v-bind="{searchResults, resultCount, clear, isLoaded, hasError, isLoading}">
    </slot>
  </div>
</template>
<script>
import {
  EMPTY,
  DOWNLOADING,
  LOADING,
  LOADED,
  LOAD_ERROR,
  DOWNLOAD_ERROR
} from '~/config/constants'

import isEmpty from 'lodash/isEmpty'
import * as Comlink from 'comlink'

export default {
  name: 'LocalSearchBase',
  props: {
    indexURL: {
      type: String,
      required: true
    },
    initialState: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      indexState: EMPTY,
      searchState: {},
      filterState: {},
      registeredFilters: [],
      filterDataSources: {},
      searchResults: []
    }
  },
  computed: {
    isLoading() {
      return this.indexState === DOWNLOADING || this.indexState === LOADING
    },
    isLoaded() {
      return this.indexState === LOADED
    },
    hasError() {
      return (
        this.indexState === DOWNLOAD_ERROR || this.indexState === LOAD_ERROR
      )
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
    }
  },
  watch: {
    registeredFilters: {
      deep: true,
      async handler(val) {
        this.$worker.registeredFilters = val
        this.filterDataSources = await this.$worker.filterDataSources
      }
    },
    searchState: {
      deep: true,
      async handler(val) {
        this.$worker.searchState = val
        this.$worker.filterState = this.filterState
        this.searchResults = await this.$worker.searchResults
        this.filterDataSources = await this.$worker.filterDataSources
      }
    },
    filterState: {
      deep: true,
      async handler(val) {
        this.$worker.filterState = val
        this.$worker.searchState = this.searchState
        this.searchResults = await this.$worker.searchResults
        this.filterDataSources = await this.$worker.filterDataSources
      }
    }
  },
  async created() {
    await this.fetchAndLoadIndex()
    this.processInitialState()
  },
  beforeMount() {
    this._worker = new Worker('./lunr.worker', { type: 'module' })
    this.$worker = Comlink.wrap(this._worker)
  },
  beforeDestroy() {
    // libere o proxy
    this.$worker[Comlink.releaseProxy]()
    // descarte o worker quando este componente estiver prestes a ser destruído
    this._worker.terminate()
  },
  methods: {
    /**
     * Define o estado dos componentes com base na prop initialState
     */
    processInitialState() {
      // Preencha o estado dos filtros com as informações passadas à prop initialstate
      if (this.initialState && this.initialState.filterState) {
        this.filterState = Object.assign(
          {},
          Object.entries(this.initialState.filterState)
            // Somente considere os campos registrados pelos componentes-filho
            .filter(([key]) => this.registeredFilters.includes(key))
            // Reconstrua o objeto, cujos valores deverão ser sempre arrays
            .reduce(
              (obj, [key, value]) => ({
                ...obj,
                [key]: Array.isArray(value) ? value : [value]
              }),
              {}
            )
        )
        this.searchState = Object.assign({}, this.initialState.searchState)
      }
    },
    /**
     * Baixa e carrega o arquivo do índice.
     * Define o status do carregamento de acordo com fases.
     */
    async fetchAndLoadIndex() {
      try {
        // TODO: mover o download do índice para a webworker
        this.indexState = DOWNLOADING
        const serializedIndex = await this.$axios.$get(this.indexURL)
        try {
          this.indexState = LOADING
          await this.$worker.load(serializedIndex)
          this.indexState = LOADED
        } catch (e) {
          this.indexState = LOAD_ERROR
        }
      } catch (e) {
        this.indexState = DOWNLOAD_ERROR
      }
    },
    /**
     * Registra um filtro
     * TODO: remover
     */
    registerFilter(fieldName) {
      if (!this.registeredFilters.includes(fieldName)) {
        this.registeredFilters.push(fieldName)
      }
    },
    /**
     * Limpa todos o estado dos componentes de busca.
     */
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
  }
}
</script>

<style>
</style>
