<template>
  <div class="Page Page--Search">
    <aside class="SearchOptions">
      <div class="SearchOptions__inside">
        <DataSearch
          component-id="search"
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
            component-id="newspaper"
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
            component-id="KeywordSensor"
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
            :react="{and: ['search','newspaper', 'pub_year']}"
            :default-selected="keywords"
          />
          <DynamicRangeSlider
            data-field="published_year"
            component-id="pub_year"
            class-name="FilterList__FilterItem"
            title="Anos de publicação"
            filter-label="Intervalo (anos)"
            :inner-class="{
              title: 'microtext',
              slider: 'FilterList__Slider',
            }"
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
      </div>
    </aside>
    <main>
      <ReactiveList
        :react="{and: ['search','newspaper', 'KeywordSensor','pub_year']}"
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
        <NewsCardList slot="renderAllData" slot-scope="{ results }" :items="results"/>
      </ReactiveList>
    </main>
  </div>
</template>

<script>
import NewsCardList from '~/components/news/NewsCardList'
import Logo from '~/components/common/Logo'
export default {
  name: 'SearchPage',
  components: {
    NewsCardList,
    Logo
  },
  head: {
    bodyAttrs: {
      class: 'fixed-sidebar'
    }
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
    },
    keywords() {
      try {
        return JSON.parse(this.$route.query.keywords)
      } catch {
        return []
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
    customFilterQuery(value, props) {
      try {
        return {
          query: {
            match_all: {}
          },
          size: 0,
          aggs: {
            reactivesearch_nested: {
              nested: {
                path: props.nestedField
              },
              aggs: {
                [props.dataField]: {
                  terms: {
                    field: props.dataField,
                    size: props.size,
                    order: {
                      _count: 'desc'
                    }
                  }
                }
              }
            }
          }
        }
      } catch {
        return {}
      }
    }
  }
}
</script>

<style>
.SearchOptions__Logo {
  display: none;
}
.SearchOptions {
  background: #f3f1f1;
}

.SearchOptions__inside {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.FilterList {
  background: #f3f1f1;
  width: 100%;
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

@media only screen and (min-width: 768px) {
  .SearchOptions__Logo {
    display: block;
  }
  .SearchOptions {
    flex-basis: 350px;
    flex-shrink: 0;
  }
  .SearchOptions__inside {
    position: fixed;
    width: 350px;
    top: 100px;
  }
  .FilterList {
    max-height: 500px;
    overflow: visible;
    justify-content: space-around;
    max-width: 66rem;
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
