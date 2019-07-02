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
        <DataSearch
          v-inner-input-focus
          class="SearchBar"
          component-id="SearchSensor"
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
        />
        <div v-if="inSearchMode" class="FilterList">
          <single-dropdown-list
            :inner-class="{title: 'microtext',         select: 'FilterItem__DropdownToggle',           list: 'FilterItem__DropdownList'          }"
            :react="{and: ['SearchSensor', 'NewspaperSensor', 'KeywordSensor', 'PublishedYearSensor']}"
            :show-filter="true"
            :size="25"
            class-name="FilterList__FilterItem"
            component-id="TypeSensor"
            data-field="_type"
            filter-label="Tipo"
            placeholder="Todos"
            title="Tipo"
          />
          <single-dropdown-list
            :default-query="customFilterQuery"
            :inner-class="{              title: 'microtext',              select: 'FilterItem__DropdownToggle',              list: 'FilterItem__DropdownList'            }"
            :react="{and: ['SearchSensor', 'TypeSensor', 'KeywordSensor', 'PublishedYearSensor']}"
            :show-count="false"
            :show-filter="true"
            :size="25"
            class-name="FilterList__FilterItem"
            component-id="NewspaperSensor"
            data-field="newspaper.title"
            filter-label="Site/Veículo"
            nested-field="newspaper"
            placeholder="Todos"
            title="Site/Veículo"
          />
          <multi-dropdown-list
            :default-query="customFilterQuery"
            :default-selected="keywords"
            :inner-class="{                  title: 'microtext',                  select: 'FilterItem__DropdownToggle',                  list: 'FilterItem__DropdownList'                }"
            :react="{and: ['SearchSensor', 'TypeSensor', 'NewspaperSensor',  'PublishedYearSensor']}"
            :show-count="false"
            :show-filter="true"
            :show-search="true"
            :size="100"
            class-name="FilterList__FilterItem"
            component-id="KeywordSensor"
            data-field="keywords.name"
            filter-label="Palavras-chave"
            nested-field="keywords"
            placeholder="Todas"
            title="Palavras-chave"
          >
            <template slot="renderItem" slot-scope="{ label }">
              <div>{{lowerSlugify(label)}}</div>
            </template>
          </multi-dropdown-list>
          <!--
          <DynamicRangeSlider
            :inner-class="{              title: 'microtext',              slider: 'FilterList__Slider',            }"
            :react="{and: ['SearchSensor', 'TypeSensor', 'NewspaperSensor', 'KeywordSensor']}"
            class-name="FilterList__FilterItem"
            component-id="PublishedYearSensor"
            data-field="published_year"
            filter-label="Publicado entre"
            title="Publicado entre"
          />-->
        </div>
      </div>
      <selected-filters
        v-if="inSearchMode"
        class-name="SelectedFilters"
        clear-all-label="Limpar filtros"
        :inner-class="{
          button:'SelectedFilters__Filter'
        }"
      />

      <transition name="fade">
        <TeaserBlock
          v-if="!inSearchMode && featuredPage"
          link-position="center"
          class="FeaturedPage"
          :page-item="featuredPage"
        ></TeaserBlock>
      </transition>

      <transition name="fade">
        <HomeTagCloud v-if="!inSearchMode" :use-links="false" class="HomeTagCloud" />
      </transition>

      <transition v-if="inSearchMode" :duration="500" name="fade">
        <ReactiveList
          :react="{and: ['SearchSensor', 'TypeSensor', 'NewspaperSensor', 'KeywordSensor', 'PublishedYearSensor']}"
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
          <div
            slot="renderResultStats"
            slot-scope="{ totalResults, time }"
          >{{totalResults}} resultados em {{time}}ms</div>
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
    $route: function(route) {
      console.log(route)
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

<style lang="stylus" scoped>
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
}

.FilterList__FilterItem {
  width: 100%;
}

.SelectedFilters, .FilterList {
  margin-top: 2rem;
}

.SelectedFilters {
  margin: 2rem 1rem;
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
    width: 33%;
    margin: 0 1rem;
  }
}
</style>
