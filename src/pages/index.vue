<template>
  <section class="container">
    <DataSearch
      class="result-list-container"
      category-field="authors"
      component-id="SearchSensor"
      :field-weights="[10,7,1]"
      :data-field="['title', 'teaser']"
      icon-position="right"
      :autosuggest="false"
      class-name="searchBar"
      placeholder="Pesquisar no acervo"
      :show-clear="false"
    />
    <div class="filters">
      <single-dropdown-list 
        :default-query="customFilterQuery"
        filter-label="Site/Veículo"
        component-id="NewspaperSensor"
        data-field="newspaper.title"
        nested-field="newspaper"
        class-name="filterItem"
        placeholder="Todos"
        :inner-class="{
          title: 'microtext'
        }"
        title="Site/Veículo"
      />
    </div>

    <div class="results">
      <ReactiveList
        :react="{and: ['SearchSensor','NewspaperSensor']}"
        component-id="SearchResult"
        :pagination="false"
        data-field="title.raw"
        class-name="result-list-container"
        :inner-class="{
          resultsInfo: 'results-info'
        }"
        :from="0"
        :size="5"
      >
        <div slot="renderData" slot-scope="{ item }">
          <NewsCard class="news-card" :news-item="item" />
        </div>

      </ReactiveList>
    </div>
    <no-ssr>
      <ReactiveComponent component-id="ReactiveD3TagCloud" :default-query="tagCloudQuery" >
        <div slot-scope="{ aggregations, error }">
	        <ReactiveD3TagCloud :aggregations="aggregations" :error="error"/>
        </div>
      </ReactiveComponent>
    </no-ssr>
  </section>
</template>

<script>
import ReactiveD3TagCloud from '~/components/ReactiveD3TagCloud'
import NewsCard from '~/components/NewsCard'
import { TAGCLOUD_QUERY } from '~/config/constants'
export default {
  components: {
    ReactiveD3TagCloud,
    NewsCard
  },
  computed: {
    tagCloudQuery() {
      return function() {
        return TAGCLOUD_QUERY
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
.searchBar {
  margin: 10px;
}
.results {
  background: #e0e0e0;
}
.results-info {
  color: #555555;
  text-transform: uppercase;
  font-family: 'Cabin', sans-serif;
  margin-left: 12px;
}
.news-card {
  margin: 0.75rem;
}
.filters {
  background: #f3f1f1;
  padding: 12px;
}
.filterItem button {
  border: none;
  border-bottom: solid 1px #a1a1a1;
  background: transparent;
  font-family: 'Volkorn', serif;
  font-size: 1rem;
  font-style: italic;
}

.filterItem ul > li {
  font-family: 'Volkorn', serif;
  font-size: 1rem;
}

.filterItem h2 {
  font-size: 0.875rem;
}
</style>
