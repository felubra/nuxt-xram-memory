<template>
  <AbstractPage :full-width="true">
    <Logo :big="true" />
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

        <TeaserBlock
          v-if="featuredPage"
          link-position="center"
          class="FeaturedPage"
          :page-item="featuredPage"
        ></TeaserBlock>

        <HomeTagCloud />
      </ReactiveBase>
    </no-ssr>
  </AbstractPage>
</template>

<script>
import HomeTagCloud from '~/components/tag-cloud/HomeTagCloud'
import TeaserBlock from '~/components/common/TeaserBlock'
import AbstractPage from '~/components/common/AbstractPage'
import Logo from '~/components/common/Logo'
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
    ...mapGetters(['pageLinks', 'featuredPages', 'homeLinks']),
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
.Logo {
  margin-top: 10vh;
  padding: 0.5rem;
  text-align: center;
}

.Logo + .SearchBar {
  margin: 0;
}

.SearchBar, .FeaturedPage {
  max-width: 40.5rem;
  margin: 0 auto;
}

.SearchBar .SearchBar__Input {
  background-color: #fff;
}

.FeaturedPage {
  order: 0;
  margin-top: 2vh;
}

.Home__Links {
  z-index: 9;
}

ul.Home__Links {
  display: inline-block;
  margin: 3rem auto 0.5rem;
  padding: 0.45rem;
}

ul.Home__Links > li {
  display: inline-block;
  list-style: none;
  font-size: 1.1rem;
  border-left: solid 1px #aa0000;
  padding: 0 0.5rem;
}

ul.Home__Links > li:first-child {
  border-left: none;
}

ul.Home__Links > li > a {
  color: #333;
}

@media only screen and (min-width: 768px) {
  .Logo {
    margin-top: 25vh;
  }
}
</style>
