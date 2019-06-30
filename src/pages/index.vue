<template>
  <no-ssr>
    <ReactiveBase
      :class-name="{'PageIndex': true, 'PageIndex--searching': inSearchMode}"
      app="artifact_document,artifact_news"
      :url="reactiveServerURL"
      :theme="reactiveDefaultTheme"
      :credentials="reactiveCredentials"
    >
      <div
        :class="{'PageIndex__SearchArea': true, 'PageIndex__SearchArea--searching': inSearchMode}"
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
    </ReactiveBase>
  </no-ssr>
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
  methods: {
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}

.PageIndex--searching {
}

.PageIndex__SearchArea, .FeaturedPage, .SearchBar {
  margin-left: auto;
  margin-right: auto;
}

.PageIndex__SearchArea, .HomeTagCloud {
  transition: margin-top 0.35s ease;
}

.PageIndex__SearchArea {
  max-width: 960px;
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

@media only screen and (min-width: 768px) {
  .HomeTagCloud {
    margin-top: 15vh;
  }
}
</style>
