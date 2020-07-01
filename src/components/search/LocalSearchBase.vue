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
      registeredFilters: []
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
    /**
     * Para cada filtro registrado, retorna os valores disponíveis de acordo com a pesquisa atual e o valor dos outros
     * filtros.
     */
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
    /**
     * Retorna objeto com os filtros que tem algum valor selecionado.
     */
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
    /**
     * Os resultados de busca de acordo com o valor nos filtros selecionados.
     */
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
    /**
     * Todos os documentos indexados.
     */
    allDocuments() {
      return (
        (this.indexState === LOADED &&
          Object.values(this.index.documentStore.docs)) ||
        []
      )
    },
    /**
     * O valor do texto de busca, concatenado de todos os componentes de busca full-text.
     */
    searchQuery() {
      try {
        const values = Object.values(this.searchState)
        return (values.length && values.join(' ')) || ''
      } catch {
        return ''
      }
    },
    /**
     * Os resultados da busca full-text no índice ou todos os documentos, se nenhuma string de busca foi fornecida.
     */
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
    this.processInitialState()
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
      }
    },
    /**
     * Baixa e carrega o arquivo do índice.
     * Define o status do carregamento de acordo com fases.
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
