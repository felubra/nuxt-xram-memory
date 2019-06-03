<template>
  <AbstractPage class="Page Page--home">
    <ul class="Home__Links">
      <li v-for="page in menuLinks()" :key="page.id" class="Menu__Item Menu__Item--big">
        <nuxt-link
          :title="page.title"
          :alt="`Clique para visitar a página '${page.title}'`"
          :to="urlOrRoute(page)"
        >
          <span>{{page.title}}</span>
        </nuxt-link>
      </li>
    </ul>
    <Logo :big="true"/>
    <no-ssr>
      <ReactiveBase
        class-name="ReactiveBase"
        app="artifact_document,artifact_news"
        :url="reactiveServerURL"
        :theme="reactiveDefaultTheme"
        :credentials="reactiveCredentials"
      >
        <DataSearch
          v-inner-input-focus
          class="SearchBar SearchBar--home"
          component-id="SearchSensor"
          :field-weights="[10,7]"
          :data-field="['title', 'teaser']"
          icon-position="right"
          :autosuggest="false"
          class-name="SearchBar SearchBar--home"
          placeholder="Pesquisar no acervo"
          :show-clear="false"
          :debounce="250"
          @keyPress="search"
        />
        <TeaserBlock v-if="featuredPage" class="FeaturedPage" :page-item="featuredPage"></TeaserBlock>

        <ReactiveComponent
          class="ReactiveD3TagCloud--home"
          component-id="ReactiveD3TagCloud"
          :default-query="tagCloudQuery"
        >
          <div slot-scope="{ aggregations, error }">
            <D3TagCloud v-if="!error" :keywords="keywords(aggregations)"/>
          </div>
        </ReactiveComponent>
      </ReactiveBase>
    </no-ssr>
  </AbstractPage>
</template>

<script>
import D3TagCloud from '~/components/tag-cloud/D3TagCloud'
import TeaserBlock from '~/components/common/TeaserBlock'
import AbstractPage from '~/components/common/AbstractPage'
import Logo from '~/components/common/Logo'
import reactiveMixin from '~/utils/reactiveMixin'
import { mapGetters } from 'vuex'
import { innerInputFocus } from '~/utils'
import { sanitize } from '@/utils/'
const FONT_SIZE_DELTA = 16

import { TAGCLOUD_QUERY } from '~/config/constants'
export default {
  components: {
    D3TagCloud,
    TeaserBlock,
    Logo,
    AbstractPage
  },
  directives: {
    'inner-input-focus': innerInputFocus
  },
  mixins: [reactiveMixin],
  head: {
    title: 'xraM-Memory',
    bodyAttrs: {
      class: 'Navbar--no-logo'
    }
  },
  computed: {
    tagCloudQuery() {
      return function() {
        return TAGCLOUD_QUERY
      }
    },
    ...mapGetters(['featuredPages', 'menuLinks']),
    featuredPage() {
      return this.featuredPages.length > 0 && this.featuredPages[0]
    }
  },
  methods: {
    search(e) {
      if (event.which == 13 || event.keyCode == 13) {
        this.$router.push({
          name: 'search-query',
          params: { query: e.target.value }
        })
      }
    },
    keywords(aggregations) {
      const keywordsStdDeviation = this.keywordsStdDeviation(aggregations)
      try {
        return aggregations.keywords.names.buckets.map(keyword => {
          return {
            text: keyword.key,
            slug: keyword.slug.buckets[0].key,
            size: (keyword.doc_count / keywordsStdDeviation) * FONT_SIZE_DELTA
          }
        })
      } catch {
        return []
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
    },
    keywordsStdDeviation(aggregations) {
      function standardDeviation(values) {
        const avg = average(values)

        const squareDiffs = values.map(function(value) {
          const diff = value - avg
          const sqrDiff = Math.sqrt((diff * diff) ^ 2)
          return sqrDiff
        })

        const avgSquareDiff = average(squareDiffs)

        const stdDev = Math.sqrt(avgSquareDiff)
        return stdDev
      }

      function average(data) {
        const sum = data.reduce(function(sum, value) {
          return sum + value
        }, 0)

        const avg = sum / data.length
        return avg
      }
      try {
        return standardDeviation(
          aggregations.keywords.names.buckets.map(keyword => keyword.doc_count)
        )
      } catch {
        return 1
      }
    }
  }
}
</script>

<style scoped>
.Logo {
  margin-top: 10vh;
  padding: 0.5rem;
}

.Logo + .SearchBar {
  margin: 0;
}

.SearchBar .SearchBar__Input {
  background-color: #fff;
}

.ReactiveD3TagCloud--home {
  order: 2;
  margin-top: 35vh;
}
.FeaturedPage {
  order: 0;
  margin-top: 2vh;
}

.Home__Links {
  position: absolute;
  top: 1rem;
  left: 36px;
  margin: 0;
  padding: 0;
  z-index: 9;
}

ul.Home__Links > li {
  display: inline;
  list-style: none;
  margin: 0.5rem;
  font-size: 1rem;
}

ul.Home__Links {
  display: none;
}

@media only screen and (min-width: 768px) {
  .Logo {
    margin-top: 25vh;
  }
  .ReactiveD3TagCloud--home {
    margin-top: 15vh;
  }
  ul.Home__Links {
    display: inline;
  }

  ul.Home__Links > li a {
    color: #333;
    display: inline-flex;
    align-items: center;
  }

  ul.Home__Links i.material-icons-outlined {
    margin-right: 0.1rem;
  }

  ul.Home__Links > li a:hover,
  ul.Home__Links > li a:focus,
  ul.Home__Links > li a:active {
    text-decoration: none;
    color: #ff0000;
  }

  ul.Home__Links i.material-icons-outlined {
    display: none;
  }
  ul.Home__Links > li a > span {
    display: inline;
  }
}
</style>
