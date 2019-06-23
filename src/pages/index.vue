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
        <ul class="Home__Mode_Switcher">
          <li class="ModeSwitch">
            <a
              href="#all"
              :class="{'active': activeMode === 'all' }"
              @click.prevent="switchMode('all')"
            >Tudo</a>
          </li>
          <li class="ModeSwitch">
            <a
              href="#images"
              :class="{'active': activeMode === 'images' }"
              @click.prevent="switchMode('news')"
            >Notícias</a>
          </li>
          <li class="ModeSwitch">
            <a
              href="#images"
              :class="{'active': activeMode === 'images' }"
              @click.prevent="switchMode('documents')"
            >Documentos</a>
          </li>
          <li class="ModeSwitch">
            <a
              href="#images"
              :class="{'active': activeMode === 'images' }"
              @click.prevent="switchMode('images')"
            >Imagens</a>
          </li>
        </ul>
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
        <component :is="getActiveModeComponent()"></component>
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
    AbstractPage,
    HomeImageGrid: () => import('~/components/image-grid/HomeImageGrid')
  },
  directives: {
    'inner-input-focus': innerInputFocus
  },
  mixins: [reactiveMixin],
  data() {
    return {
      activeMode: 'all'
    }
  },
  head: {
    title: 'xraM-Memory',
    bodyAttrs: {
      class: 'Navbar--no-logo'
    },
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/masonry/4.0.0/masonry.pkgd.min.js'
      }
    ]
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
    },
    getActiveModeComponent() {
      switch (this.activeMode) {
        case 'all': {
          return 'HomeTagCloud'
        }
        case 'images': {
          return 'HomeImageGrid'
        }
        default: {
          return 'HomeTagCloud'
        }
      }
    },
    switchMode(mode) {
      this.activeMode = mode
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

.SearchBar,
.Home__Mode_Switcher {
  align-self: center;
  width: 100%;
  max-width: 40.5rem;
  margin: 1rem 0 1rem;
  padding: 0 0.5rem;
}

.Home__Mode_Switcher {
  text-align: left;
  margin: 0;
  list-style: none;
  padding: 0.4rem 1.2rem;
  font-family: 'Cabin', sans-serif;
  font-size: 0.77rem;
  text-transform: uppercase;
}

.Home__Mode_Switcher a {
  color: #b1a299;
}

.Home__Mode_Switcher a:focus,
.Home__Mode_Switcher a:hover,
.Home__Mode_Switcher a:active,
.Home__Mode_Switcher a.active {
  font-weight: bold;
  text-decoration: none;
  color: #927474;
}

.Home__Mode_Switcher > li {
  display: inline-block;
  margin-left: 1rem;
}

.Home__Mode_Switcher > li:first-child {
  margin-left: 0;
}

.Home__Mode_Switcher + .SearchBar {
  margin-top: 0;
}

.SearchBar .SearchBar__Input {
  background-color: #fff;
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
