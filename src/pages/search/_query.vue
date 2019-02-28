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
        :size="25"
        placeholder="Todos"
        :show-filter="true"
        :inner-class="{
          title: 'microtext',
          select: 'FilterItem__DropdownToggle',
          list: 'FilterItem__DropdownList'
        }"
        title="Site/Veículo"
      />
      <div
        :class="filterListOpened ?  'FilterList__MoreFilters FilterList__MoreFilters--open' : 'FilterList__MoreFilters'"
      >
        <multi-dropdown-list
          :default-query="customFilterQuery"
          filter-label="Palavras-chave"
          component-id="KeywordsSensor"
          data-field="keywords.name"
          nested-field="keywords"
          :show-search="true"
          :size="100"
          class-name="FilterList__FilterItem"
          :show-count="false"
          placeholder="Todas"
          :show-filter="true"
          :inner-class="{
          title: 'microtext',
          select: 'FilterItem__DropdownToggle',
          list: 'FilterItem__DropdownList'
        }"
          title="Palavras-chave"
        />
      </div>
      <selected-filters
        class-name="FilterList__SelectedFilters"
        clear-all-label="Limpar filtros"
        :inner-class="{button:'FilterList__SelectedFilter'}"
      />
      <a
        v-if="filterListOpened"
        class="FilterList__ToggleFilters microtext"
        href="#moreFilters"
        @click.prevent="toggleFilters"
      >
        <i class="material-icons">close</i>
        Fechar
      </a>
      <a
        v-else
        class="FilterList__ToggleFilters microtext"
        href="#moreFilters"
        @click.prevent="toggleFilters"
      >
        <i class="material-icons">filter_list</i>
        Mais filtros
      </a>
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
  data() {
    return {
      filterListOpened: false
    }
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
     *
     */
    toggleFilters() {
      this.filterListOpened = !this.filterListOpened
    },
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
.FilterList__ToggleFilters {
  padding: 1rem 0 0;
  display: flex;
  align-items: center;
  float: right;
}
.FilterList__MoreFilters {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease-in-out;
}

.FilterList__MoreFilters--open {
  max-height: 500px;
  overflow: visible;
}
</style>
