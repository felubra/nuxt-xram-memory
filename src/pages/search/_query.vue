<template>
  <section class="Page">
    <DataSearch
      component-id="SearchSensor"
      :field-weights="[10,7]"
      :data-field="['title', 'teaser']"
      icon-position="right"
      :autosuggest="false"
      class-name="SearchBar"
      placeholder="Pesquisar no acervo"
      filter-label="Pesquisa"
      :show-clear="false"
      :default-selected="query"
      :inner-class="{
        input: 'SearchBar__Input'
      }"
      :u-r-l-params="false"
    />
    <div class="FilterList">
      <single-dropdown-list
        :default-query="customFilterQuery"
        filter-label="Site/Veículo"
        component-id="NewspaperSensor"
        data-field="newspaper.title"
        nested-field="newspaper"
        class-name="FilterList__FilterItem"
        :show-count="false"
        placeholder="Todos"
        :show-filter="true"
        :inner-class="{
          title: 'microtext',
          select: 'FilterItem__DropdownToggle',
          list: 'FilterItem__DropdownList'
        }"
        title="Site/Veículo"
      />
      <selected-filters
        class-name="FilterList__SelectedFilters"
        clear-all-label="Limpar filtros"
        :inner-class="{button:'FilterList__SelectedFilter'}"
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
      <a
        slot="renderData"
        slot-scope="{ item }"
        class="SearchResults__Result"
        :href="`/news/${item.slug}`"
      >
        <NewsCard :news-item="item"/>
      </a>
    </ReactiveList>
  </section>
</template>

<script>
import NewsCard from '~/components/news/NewsCard'

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
    customFilterQuery(_, { nestedField, dataField, size }) {
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
                  size,
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

<style scoped>
</style>
