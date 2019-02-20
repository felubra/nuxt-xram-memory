<template>
  <div>
    <div class="results">
      <DataSearch
        component-id="SearchSensor"
        :field-weights="[10,7]"
        :data-field="['title', 'teaser']"
        icon-position="right"
        :autosuggest="false"
        class-name="SearchBar"
        placeholder="Pesquisar no acervo"
        :show-clear="false"
        :default-selected="query"
        :inner-class="{
          input: 'SearchBar__Input'
        }"
      />
      <div class="FilterList">
        <single-dropdown-list
          :default-query="customFilterQuery"
          filter-label="Site/Veículo"
          component-id="NewspaperSensor"
          data-field="newspaper.title"
          nested-field="newspaper"
          class-name="FilterList__FilterItem"
          placeholder="Todos"
          :inner-class="{
            title: 'microtext'
          }"
          title="Site/Veículo"
        />
      </div>
      <ReactiveList
        :react="{and: ['SearchSensor','NewspaperSensor']}"
        component-id="SearchResults"
        :pagination="false"
        data-field="title.raw"
        class-name="SearchResults"
        :inner-class="{
          resultsInfo: 'SearchResults__ResultsInfo'
        }"
        :from="0"
        :size="5"
      >
        <NewsCard slot="renderData" slot-scope="{ item }" class='SearchResults__Result' :news-item="item"/>
      </ReactiveList>
    </div>
  </div>
</template>

<script>
import NewsCard from '~/components/NewsCard'

export default {
  name: 'SearchPage',
  components: {
    NewsCard
  },
  computed: {
    query() {
      try {
        return this.$route.params.query
      } catch {
        return ''
      }
    }
  },
  methods: {
    /**
     * Aparentemente a query montada pelo ReactiveSearch não funciona, então usemos esta.
     */
    customFilterQuery(_, { nestedField, dataField }) {
      return {
        query: {
          match_all: {}
        },
        size: 0,
        aggs: {
          reactivesearch_nested: {
            nested: {
              path: nestedField
            },
            aggs: {
              [dataField]: {
                terms: {
                  field: dataField,
                  size: '10',
                  order: {
                    _count: 'desc'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

