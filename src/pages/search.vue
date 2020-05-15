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

export default {
  name: 'SearchPage',
  components: {
    NewsGrid
  },
  data() {
    return {
      searchQuery: '',
      searchIndex: null
    }
  },
  computed: {
    searchResults() {
      try {
        return this.searchIndex
          .search(this.searchQuery)
          .map(result => result.ref)
          .map(ref => this.searchIndex.documentStore.getDoc(ref))
      } catch (e) {
        return []
      }
    }
    /** TODO:
    searchIndex() {

    }
     */
  },
  async asyncData({ query, store, app }) {
    const indexData = await store.dispatch('fetchLunrIndex')
    const searchIndex = app.$lunr.Index.load(indexData)
    if (query && query.text) {
      return {
        searchQuery: query.text,
        //FIXME: usar uma computed prop e um getter com o índice na store
        searchIndex
      }
    }
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
