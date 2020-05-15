<template>
  <div>
    <h1 class="offscreen">Pesquisar</h1>
    <!-- eslint-disable -->
    <el-input v-model="searchQuery" placeholder="Pesquisar no acervo"  ></el-input>
    <!-- eslint-enable -->
    <!--<SearchFilters />=-->
    <!--<HomeSearchResults />-->
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    searchResults() {
      if (this.searchIndex) {
        return this.searchIndex
          .search(this.searchQuery)
          .map(result => result.ref)
          .map(ref => this.searchIndex.documentStore.getDoc(ref))
      }
      return []
    }
  },
  async asyncData({ query }) {
    if (query && query.text) {
      return {
        searchQuery: query.text
      }
    }
  },
  async mounted() {
    const index = await this.$store.dispatch('fetchLunrIndex')
    this.searchIndex = this.$lunr.Index.load(index)
    // forçamos a atualização, porque this.searchIndex não é reativa, já que não precisa mudar
    this.$forceUpdate()
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
