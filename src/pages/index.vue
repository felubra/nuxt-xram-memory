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
        <HomeTagCloud/>
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
