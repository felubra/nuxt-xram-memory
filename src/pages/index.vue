<template>
  <div class="Page PageIndex">
      <h1 class="offscreen">Início</h1>
      <Logo class="Home__Logo" :big="true" />

      <el-input
      v-model="searchQuery"
      class="SearchBar"
      type="text"
      suffix-icon="el-icon-search"
      placeholder="Pesquisar no acervo"
      @change="handleSearch" />

      <TeaserBlock
        v-if="featuredPage"
        link-position="center"
        class="FeaturedPage"
        :page-item="featuredPage"
      ></TeaserBlock>

      <HomeTagCloud :aggregations="tagCloudAggregations" class="HomeTagCloud" />
</div>
</template>

<script>
import HomeTagCloud from '~/components/home/HomeTagCloud'
import TeaserBlock from '~/components/home/TeaserBlock'
import Logo from '@/components/nav/Logo'
import { mapGetters } from 'vuex'
import { TAGCLOUD_NUM_KEYWORDS } from '~/config/constants'

export default {
  name: 'IndexPage',
  components: {
    HomeTagCloud,
    TeaserBlock,
    Logo
  },
  data() {
    return {
      searchQuery: '',
      tagCloudAggregations: []
    }
  },
  head: {
    title: 'xraM-Memory',
    bodyAttrs: {
      class: 'page--index'
    }
  },
  computed: {
    ...mapGetters(['featuredPages']),
    featuredPage() {
      return this.featuredPages.length > 0 && this.featuredPages[0]
    }
  },
  async asyncData({ $axios }) {
    try {
      const tagCloudAggregations = await $axios.$get(
        `/api/v1/keywords/top?max=${TAGCLOUD_NUM_KEYWORDS}`
      )
      return {
        tagCloudAggregations
      }
    } catch {
      return {
        tagCloudAggregations: []
      }
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
    handleSearch(searchQuery) {
      if (searchQuery && searchQuery.trim()) {
        this.$router.push({
          name: 'search',
          query: {
            text: searchQuery
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

.SearchBar {
  max-width: 730px;
  display: block;
  margin: 0 auto;
}
.SearchBar input {
  transition: border-color 0.25s ease;
  font-size: 16px;
}
.SearchBar input:focus,
.SearchBar input:hover,
.SearchBar input:active {
  border-color: $link-color;
}
.SearchBar input::placeholder {
  transition: color 0.25s ease, border-color 0.25s ease;
}
.SearchBar input:active::placeholder,
.SearchBar input:hover::placeholder,
.SearchBar input:focus::placeholder {
  color: #333;
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
