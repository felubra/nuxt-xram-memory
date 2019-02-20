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

<style>
.SearchBar {
  margin: 1rem;
}
.SearchBar .SearchBar__Input {
  background-color: #fff;
}

.SearchResults {
  background: #e0e0e0;
  padding: 0.5rem 0.75rem;
}
.SearchResults .SearchResults__Result {
  margin: 0.5rem 0;
}
.SearchResults .SearchResults__ResultsInfo {
  color: #555555;
  text-transform: uppercase;
  font-family: 'Cabin', sans-serif;
}
.FilterList {
  background: #f3f1f1;
  padding: 12px;
}
.FilterList .FilterList__FilterItem button {
  border: none;
  border-bottom: solid 1px #a1a1a1;
  background: transparent;
  font-family: 'Volkorn', serif;
  font-size: 1rem;
  font-style: italic;
}

.FilterList .FilterList__FilterItem ul > li {
  font-family: 'Volkorn', serif;
  font-size: 1rem;
}

.FilterList .FilterList__FilterItem h2 {
  font-size: 0.875rem;
}
</style>
