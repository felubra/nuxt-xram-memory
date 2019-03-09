<template>
  <div class="Page">
    <aside class="SearchOptions">
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
        :show-filter="false"
        :default-selected="query"
        :inner-class="{
        input: 'SearchBar__Input'
      }"
        :u-r-l-params="false"
      />
      <selected-filters
        class-name="SelectedFilters"
        clear-all-label="Limpar filtros"
        :inner-class="{button:'SelectedFilters__Filter'}"
      />
      <div
        class="FilterList"
        :class="filterListOpened ?  'FilterList FilterList--open' : 'FilterList'"
      >
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
          :react="{and: ['SearchSensor','NewspaperSensor', 'PublishedYearSensor']}"
        />
        <DynamicRangeSlider
          data-field="published_year"
          component-id="PublishedYearSensor"
          class-name="FilterList__FilterItem"
          title="Anos de publicação"
          filter-label="Intervalo (anos)"
          :inner-class="{
            title: 'microtext',
            slider: 'FilterList__Slider',
          }"
          :react="{and: ['SearchSensor','NewspaperSensor', 'KeywordsSensor']}"
        />
      </div>
      <div class="FilterList__ToggleFilters">
        <a
          v-if="filterListOpened"
          class="microtext"
          href="#moreFilters"
          @click.prevent="toggleFilters"
        >
          <i class="material-icons">close</i>
          Fechar
        </a>
        <a v-else class="microtext" href="#moreFilters" @click.prevent="toggleFilters">
          <i class="material-icons">filter_list</i>
          Filtros
        </a>
      </div>
    </aside>
    <main>
      <ReactiveList
        :react="{and: ['SearchSensor','NewspaperSensor', 'KeywordsSensor','PublishedYearSensor']}"
        component-id="SearchResults"
        :pagination="false"
        data-field="title.raw"
        class-name="SearchResults"
        :inner-class="{
          resultsInfo: 'SearchResults__ResultsInfo',
          list: 'SearchResults__List'
        }"
        :from="0"
        :size="5"
      >
        <a
          slot="renderData"
          slot-scope="{ item }"
          class="SearchResults__Result"
          :href="`/news/${item.id}`"
        >
          <NewsCard :news-item="item"/>
        </a>
      </ReactiveList>
    </main>
  </div>
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

<style>
.SearchOptions {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #f3f1f1;
}

.SearchOptions > * {
  width: 100%;
}
.FilterList {
  background: #f3f1f1;
}

.FilterList .FilterList__FilterItem {
  text-align: left;
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

.FilterList .FilterList__FilterItem .FilterItem__DropdownList {
  background: #f3f1f1;
}

.FilterList__FilterItem {
  margin: 0.5rem 0.5rem;
}

.FilterList .FilterList__Slider .vue-slider-component .vue-slider-process {
  background-color: #aa0000 !important;
}

.FilterList {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease-in-out;
  display: flex;
  flex-direction: column;
}

.FilterList--open {
  max-height: 500px;
  overflow: visible;
}

.FilterList__ToggleFilters > a {
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-content: flex-end;
  padding: 0.5rem;
  color: #555;
}

.SelectedFilters {
  padding: 0.5rem;
}

.SelectedFilters:empty {
  padding: 0;
}

.SelectedFilters .SelectedFilters__Filter {
  background: #dfdfdf;
  margin: 0.1rem;
  font-family: 'Cabin', sans-serif !important;
  font-size: 0.775rem;
}

.SearchResults {
  background: #e0e0e0;
  padding: 0.5rem 0.75rem;
  flex-grow: 1;
}

.SearchResults .SearchResults__Result {
  display: block;
  text-decoration: none;
  color: inherit;
  margin: 0.5rem 0;
}
.SearchResults .SearchResults__ResultsInfo {
  color: #555555;
  text-transform: uppercase;
  font-family: 'Cabin', sans-serif;
}

.SearchResults .SearchResults__ResultsInfo p {
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
}

.SearchResults .SearchResults__List {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

@media only screen and (min-width: 768px) {
  .FilterList {
    max-height: 500px;
    overflow: visible;
    flex-direction: row;
    justify-content: space-around;
    max-width: 66rem;
  }
  .FilterList .FilterList__FilterItem {
    width: 100%;
  }
  .FilterList__ToggleFilters {
    display: none;
  }
  .SelectedFilters {
    order: 9;
  }
  .SearchResults .SearchResults__Result {
    margin: 0.5rem;
  }
}
</style>
