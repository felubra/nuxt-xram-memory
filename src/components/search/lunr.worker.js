import * as Comlink from 'comlink'
import isEmpty from 'lodash/isEmpty'
import { groups } from 'd3-array'
import { get } from 'object-path'
import { matchArray } from 'searchjs'
import Vue from 'vue'
import lunr from 'elasticlunr'
import asciiFolder from 'fold-to-ascii'
import natsort from 'natsort'

/* eslint vue/no-unused-properties: 0 */

const obj = new Vue({
  data: {
    index: null,
    searchState: {},
    filterState: {},
    registeredFilters: [],
    orderBy: {
      field: 'published_date',
      title: 'Data de publicação',
      desc: true
    }
  },
  computed: {
    unfilteredSearchResults () {
      try {
        if (this.searchQuery) {
          return Object.freeze(this.index.search(this.searchQuery, {
            fields: {
              title: { boost: 2 },
              teaser: { boost: 1 }
            },
            bool: 'OR'
          })).map(
            result => {
              return this.index.documentStore.getDoc(result.ref)
            }
          )
        }
        return this.allDocuments
      } catch {
        return []
      }
    },
    /**
     * Todos os documentos indexados.
     */
    allDocuments () {
      try {
        return Object.values(this.index.documentStore.docs)
      } catch {
        return []
      }
    },
    /**
     * Para cada filtro registrado, retorna os valores disponíveis de acordo com a pesquisa atual.
     */
    filterDataSources () {
      return this.registeredFilters.reduce((filtersData, fieldName) => {
        filtersData[fieldName] = Array.from(
          new Set(
            groups(this.unfilteredSearchResults, d => get(d, fieldName)).reduce(
              (allFieldData, [fieldData]) => {
                return allFieldData.concat(fieldData)
              },
              []
            )
          )
        )
        return filtersData
      }, {})
    },
    /**
     * Retorna objeto com os filtros que tem algum valor selecionado.
     * Exclua o filtro de busca de texto completo ("text"), pois ele
     * não corresponde a nenhuma propriedade dos objetos indexados.
     * Se não houver nenhum filtro selecionado, retorne `null`.
     */
    selectedFilters () {
      return Object.freeze(
        Object.entries(this.filterState)
          .reduce((selected, [key, value]) => {
            if (key !== 'text') {
              if (!isEmpty(value)) {
                selected[key] = value
              }
            }
            return selected
          }, {})
      )
    },
    /**
     * Os resultados de busca filtrados de acordo com o valor nos filtros selecionados.
     */
    searchResults () {
      try {
        const sortFn = natsort({ insensitive: true, desc: this.orderBy.desc })
        const searchResults = isEmpty(this.selectedFilters)
          ? this.unfilteredSearchResults
          : matchArray(this.unfilteredSearchResults, this.selectedFilters)
        return Object.freeze(searchResults
          .slice()
          .sort((a, b) => {
            try {
              switch (this.orderBy.field) {
                case 'relevance': {
                  return 0
                }
                case 'title': {
                  return sortFn(a.uri, b.uri)
                }
                default: {
                  return sortFn(a[this.orderBy.field], b[this.orderBy.field])
                }
              }
            } catch (e) {
              return 0
            }
          }))
      } catch (e) {
        return []
      }
    },
    /**
     * O valor do texto de busca, concatenado de todos os componentes de busca full-text.
     */
    searchQuery () {
      try {
        const values = Object.values(this.searchState)
        return (values.length && values.join(' ')) || ''
      } catch {
        return ''
      }
    }
  },
  created () {
    // dê suporte à linguagem portuguesa no elasticlunr
    require('lunr-languages/lunr.stemmer.support')(lunr)
    require('lunr-languages/lunr.pt')(lunr)
    // adicione no pipeline uma função para remover os acentos ao pesquisar
    const replaceDiacritics = token => asciiFolder.foldReplacing(token)
    lunr.Pipeline.registerFunction(replaceDiacritics, 'replaceDiacritics')
  },
  methods: {
    setFilterState (filterState) {
      this.filterState = filterState
    },
    setSearchState (searchState) {
      this.searchState = searchState
    },
    load (serializedIndex) {
      this.index = Object.freeze(lunr.Index.load(serializedIndex))
    }
  }
})

Comlink.expose(obj)

/* eslint-enable */
