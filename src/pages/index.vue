<template>
  <no-ssr>
    <DefaultReactiveBase class-name="PageIndex">
      <h1 class="offscreen">Início</h1>
      <div
        :class="`PageIndex__SearchArea ${isHomeSearching ? 'PageIndex__SearchArea--searching' : ''}`"
      >
        <transition name="fade" appear mode="in-out" :duration="100">
          <Logo v-if="!isHomeSearching" class="Home__Logo" :big="true" />
        </transition>
        <HomeSearchInput
          @keyDown.backspace="exitSearchMode"
          @keyDown.enter="enterSearchMode"
          @keyDown.esc="exitSearchMode"
        />
        <SearchFilters v-if="isHomeSearching" />
      </div>

      <transition name="fade">
        <TeaserBlock
          v-if="!isHomeSearching && featuredPage"
          link-position="center"
          class="FeaturedPage"
          :page-item="featuredPage"
        ></TeaserBlock>
      </transition>

      <transition name="fade">
        <HomeTagCloud v-if="!isHomeSearching" class="HomeTagCloud" />
      </transition>

      <transition v-if="isHomeSearching" :duration="500" name="fade">
        <HomeSearchResults />
      </transition>
    </DefaultReactiveBase>
  </no-ssr>
</template>

<script>
import HomeSearchResults from '~/components/home/HomeSearchResults'
import DefaultReactiveBase from '@/components/DefaultReactiveBase'
import HomeSearchInput from '~/components/home/HomeSearchInput'
import SearchFilters from '@/components/home/SearchFilters'
import HomeTagCloud from '~/components/home/HomeTagCloud'
import TeaserBlock from '~/components/home/TeaserBlock'
import Logo from '~/components/common/Logo'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {
    HomeTagCloud,
    HomeSearchInput,
    TeaserBlock,
    Logo,
    DefaultReactiveBase,
    SearchFilters,
    HomeSearchResults
  },
  head: {
    title: 'xraM-Memory',
    bodyAttrs: {
      class: 'Navbar--no-logo'
    }
  },
  computed: {
    ...mapGetters(['pageLinks', 'featuredPages', 'homeLinks']),
    ...mapState(['isHomeSearching']),
    featuredPage() {
      return this.featuredPages.length > 0 && this.featuredPages[0]
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler({ query }) {
        if (Object.keys(query).length > 0) {
          this.enterHomeSearch()
        }
      }
    }
  },
  methods: {
    exitSearchMode({ target, keyCode }) {
      if (keyCode === 27) {
        this.exitHomeSearch()
      } else {
        if (!target.value || !target.value.trim()) {
          this.exitHomeSearch()
        }
      }
    },
    enterSearchMode({ target }) {
      if (target.value && target.value.trim()) {
        this.enterHomeSearch()
      }
    },
    ...mapMutations(['enterHomeSearch', 'exitHomeSearch'])
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

@media only screen and (min-width: 768px) {
  .HomeTagCloud {
    margin-top: 15vh;
  }
}
</style>
