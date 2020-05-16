<template>
  <div>
    <h1 class="offscreen">Pesquisar</h1>
    <!-- eslint-disable -->
    <el-input v-model="searchQuery" placeholder="Pesquisar no acervo"  ></el-input>
    <NewsGrid id="HomeMasonryGrid" :items="searchResults"></NewsGrid>
    <!-- eslint-enable -->
    <!--<SearchFilters />=-->
    <!--<HomeSearchResults />-->
  </div>
</template>

<script>
import NewsGrid from '~/components/news/NewsGrid'
import { mapActions } from 'vuex'

export default {
  name: 'SearchPage',
  components: {
    NewsGrid
  },
  data() {
    return {
      searchQuery: '',
      searchResults: []
    }
  },
  watch: {
    searchQuery: {
      immediate: true,
      async handler(query) {
        this.searchResults = await this.search(query)
      }
    }
  },
  async asyncData({ query, store, app }) {
    await store.dispatch('fetchLunrIndex')
    if (query && query.text) {
      return {
        searchQuery: query.text
      }
    }
  },
  methods: {
    ...mapActions(['search'])
  },
  head: {
    title: 'xraM-Memory - Pesquisar'
  }
}
</script>

<style lang="stylus" scoped>
.SearchPage {
  margin-top: 2rem;
}

.SearchBar {
  margin-left: auto;
  margin-right: auto;
}
</style>
