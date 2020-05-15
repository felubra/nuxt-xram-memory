<template>
  <div>
      <h1 class="offscreen">Início</h1>
      <Logo class="Home__Logo" :big="true" />

      <el-input v-model="searchQuery" placeholder="Pesquisar no acervo" @change="handleSearch" ></el-input>

      <TeaserBlock
        v-if="featuredPage"
        link-position="center"
        class="FeaturedPage"
        :page-item="featuredPage"
      ></TeaserBlock>

      <!--<HomeTagCloud class="HomeTagCloud" />-->
  </div>
</template>

<script>
import DefaultReactiveBase from '@/components/DefaultReactiveBase'
import HomeSearchInput from '~/components/home/HomeSearchInput'
import HomeTagCloud from '~/components/home/HomeTagCloud'
import TeaserBlock from '~/components/home/TeaserBlock'
import Logo from '@/components/nav/Logo'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  components: {
    HomeTagCloud,
    HomeSearchInput,
    TeaserBlock,
    Logo,
    DefaultReactiveBase
  },
  head: {
    title: 'xraM-Memory',
    bodyAttrs: {
      class: 'page--index'
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters(['featuredPages']),
    featuredPage() {
      return this.featuredPages.length > 0 && this.featuredPages[0]
    }
  },
  async fetch({ store }) {
    if (store.getters.featuredPages.length === 0) {
      try {
        await store.dispatch('fetchFeaturedPages')
      } catch {} //eslint-disable-line no-empty
    }
  },
  methods: {
    handleSearch(query) {
      if (query && query.trim()) {
        this.$router.push({
          name: 'search',
          query: {
            text: query
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.PageIndex {
  margin-top: 5vh;
}

.FeaturedPage, .SearchBar {
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
  margin-top: 17vh;
}

@media only screen and (min-width: 768px) {
  .PageIndex {
    margin-top: 20vh;
  }

  .HomeTagCloud {
    margin-top: 15vh;
  }
}
</style>
