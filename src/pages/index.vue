<template>
  <no-ssr>
    <ReactiveBase
      class-name="PageIndex"
      app="artifact_document,artifact_news"
      :url="reactiveServerURL"
      :theme="reactiveDefaultTheme"
      :credentials="reactiveCredentials"
    >
      <div
        :class="{
          'PageIndex__SearchArea': true,
          'PageIndex__SearchArea--searching': inSearchMode}"
      >
        <transition name="fade" appear mode="in-out" :duration="100">
          <Logo v-if="!inSearchMode" class="Home__Logo" :big="true" />
        </transition>
        <!-- eslint-disable -->
        <DataSearch
          v-inner-input-focus
          class="SearchBar"
          component-id="search"
          :field-weights="[10,7]"
          :data-field="['title', 'teaser']"
          icon-position="right"
          :autosuggest="false"
          placeholder="Pesquisar no acervo"
          :show-clear="false"
          :debounce="250"
          :inner-class="{
            input: 'SearchBar__Input'
          }"
          @keyDown.esc="exitSearchMode"
          @keyDown.backspace="exitSearchMode"
          @keyDown.enter="enterSearchMode"
          :URLParams="true"
          filter-label="Texto"
        />
        <div v-if="inSearchMode" class="FilterList">
          <single-dropdown-list
            :inner-class="{
              title: 'microtext',
              select: 'FilterItem__DropdownToggle',
              list: 'FilterItem__DropdownList'          }"
            :react="{and: ['search', 'newspaper', 'keywords', 'published_year']}"
            :show-filter="true"
            :size="25"
            class-name="FilterList__FilterItem"
            component-id="type"
            data-field="_type"
            filter-label="Tipo"
            placeholder="Todos"
            title="Tipo"
            :URLParams="true"
          />
          <single-dropdown-list
            :default-query="customFilterQuery"
            :inner-class="{
              title: 'microtext',
              select: 'FilterItem__DropdownToggle',
              list: 'FilterItem__DropdownList'            }"
            :react="{and: ['search', 'type', 'keywords', 'published_year']}"
            :show-count="false"
            :show-filter="true"
            :size="25"
            class-name="FilterList__FilterItem"
            component-id="newspaper"
            data-field="newspaper.title"
            filter-label="Site/Veículo"
            nested-field="newspaper"
            placeholder="Todos"
            title="Site/Veículo"
            :URLParams="true"
          />
          <multi-dropdown-list
            :default-query="customFilterQuery"
            :default-selected="keywords"
            :inner-class="{
              title: 'microtext',
              select: 'FilterItem__DropdownToggle',
              list: 'FilterItem__DropdownList'                }"
            :react="{and: ['search', 'type', 'newspaper',  'published_year']}"
            :show-count="false"
            :show-filter="true"
            :show-search="true"
            :size="100"
            class-name="FilterList__FilterItem"
            component-id="keywords"
            data-field="keywords.name"
            filter-label="Palavras-chave"
            nested-field="keywords"
            placeholder="Todas"
            title="Palavras-chave"
            :URLParams="true"
          >
            <template slot="renderItem" slot-scope="{ label }">
              <div>{{lowerSlugify(label)}}</div>
            </template>
          </multi-dropdown-list>
          <!--
          <DynamicRangeSlider
            :inner-class="{              title: 'microtext',              slider: 'FilterList__Slider',            }"
            :react="{and: ['search', 'type', 'newspaper', 'keywords']}"
            class-name="FilterList__FilterItem"
            component-id="published_year"
            data-field="published_year"
            filter-label="Publicado entre"
            title="Publicado entre"
          />-->
        </div>
        <!-- eslint-enable -->
      </div>

      <transition name="fade">
        <TeaserBlock
          v-if="!inSearchMode && featuredPage"
          link-position="center"
          class="FeaturedPage"
          :page-item="featuredPage"
        ></TeaserBlock>
      </transition>

      <transition name="fade">
        <HomeTagCloud v-if="!inSearchMode" class="HomeTagCloud" />
      </transition>

      <transition v-if="inSearchMode" :duration="500" name="fade">
        <ReactiveList
          :react="{and: ['search', 'type', 'newspaper', 'keywords', 'published_year']}"
          component-id="SearchResults"
          :pagination="false"
          data-field="title.raw"
          class-name="SearchResults"
          loader="Carregando..."
          render-error="Oops, infelizmente um erro aconteceu, tente novamente mais tarde."
          :inner-class="{
            resultsInfo: 'microtext',
            list: 'SearchResults__List'
          }"
          :from="0"
          :size="20"
        >
          <div slot="renderResultStats" slot-scope="{ totalResults, time }" class="ResultStats">
            <selected-filters
              v-if="inSearchMode"
              class-name="SelectedFilters"
              clear-all-label="Limpar filtros"
              :inner-class="{
          button:'SelectedFilters__Filter'
        }"
            />
            <div class="ResultCount">{{totalResults}} resultados em {{time}}ms</div>
          </div>
          <NewsGrid slot="renderAllData" slot-scope="{ results }" :items="results"></NewsGrid>
        </ReactiveList>
      </transition>
    </ReactiveBase>
  </no-ssr>
</template>

<script>
import slugify from 'slugify'

import HomeTagCloud from '~/components/tag-cloud/HomeTagCloud'
import TeaserBlock from '~/components/common/TeaserBlock'
import Logo from '~/components/common/Logo'
import NewsGrid from '~/components/news/NewsGrid'

import reactiveMixin from '~/utils/reactiveMixin'
import { mapGetters } from 'vuex'
import { innerInputFocus } from '~/utils'
import { sanitize } from '@/utils/'
export default {
  layout: 'index',
  components: {
    HomeTagCloud,
    TeaserBlock,
    Logo,
    NewsGrid
  },
  directives: {
    'inner-input-focus': innerInputFocus
  },
  mixins: [reactiveMixin],
  data() {
    return {
      inSearchMode: false
    }
  },
  head: {
    title: 'xraM-Memory',
    bodyAttrs: {
      class: 'Navbar--no-logo'
    }
  },
  computed: {
    ...mapGetters(['pageLinks', 'featuredPages', 'homeLinks']),
    featuredPage() {
      return this.featuredPages.length > 0 && this.featuredPages[0]
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler({ query }) {
        this.inSearchMode = Object.keys(query).length > 0
      }
    }
  },
  methods: {
    lowerSlugify(keyword) {
      return slugify(keyword.toLowerCase())
    },
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
    },
    exitSearchMode({ target, keyCode }) {
      if (keyCode === 27) {
        this.inSearchMode = false
      } else {
        if (!target.value || !target.value.trim()) {
          this.inSearchMode = false
        }
      }
    },
    enterSearchMode({ target }) {
      if (target.value && target.value.trim()) {
        this.inSearchMode = true
      }
    },
    urlOrRoute(item) {
      return typeof item.url === 'object'
        ? item.url
        : {
            name: 'slug',
            params: {
              slug: sanitize(item.url)
            }
          }
    }
  }
}
</script>

<style lang="stylus">
.PageIndex__SearchArea, .FeaturedPage, .SearchBar {
  margin-left: auto;
  margin-right: auto;
}

.PageIndex__SearchArea, .HomeTagCloud {
  transition: margin-top 0.35s ease;
}

.PageIndex__SearchArea {
  margin-top: 20vh;
}

.PageIndex__SearchArea--searching {
  margin-top: 1rem;
}

.Home__Logo {
  text-align: center;
}

.HomeTagCloud {
  order: 2;
  margin-top: 35vh;
}

.SearchBar {
  max-width: 730px;
}

.SearchBar__Input {
  background: #fff !important; /* #TODO: este estilo não está pegando */
}

.FilterList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: 1;
}

.FilterList__FilterItem {
  width: 100%;
}

.FilterList__FilterItem > h2 {
  color: #A1A1A1;
}

.FilterList__FilterItem:focus-within > h2, .FilterList__FilterItem:focus > h2 {
  color: $link-color;
}

.SelectedFilters, .FilterList {
  margin-top: 2rem;
}

.SelectedFilters {
  margin: 2rem 1rem;
}

.ResultStats {
  margin: 0.5rem 22px;
  display: flex;
  flex-direction: column;
  margin: 3rem 0 0;
  text-align: center;
}

button.FilterItem__DropdownToggle {
  border: none;
  background: transparent;
  border-bottom: solid 1px #E1DADA;
}

button.FilterItem__DropdownToggle:focus {
  background: transparent;
  border-color: #333;
}

.ResultStats {
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
}

.SelectedFilters {
  margin: 0;
  /* margin-left: auto; */
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  /* margin-left: 20px; */
}

.SelectedFilters__Filter {
  background: #e4e7ed !important;
  color: #909399;
  /* text-transform: none; */
}

.SelectedFilters__Filter:hover {
  background: $link-color !important;
  color: #fff !important;
  /* text-transform: none; */
}

.ResultCount {
  display: block;
  text-align: center;
}

@media only screen and (min-width: 768px) {
  .HomeTagCloud {
    margin-top: 15vh;
  }

  .FilterList {
    display: flex;
    flex-direction: row;
  }

  .FilterList__FilterItem {
    width: auto;
    min-width: 20%;
    margin: 0 4rem;
  }

  .ResultStats {
    flex-direction: row;
    margin: 3rem 4rem 0;
  }

  .ResultCount {
    display: flex;
    font-weight: bold;
    align-items: center;
  }
}
</style>
