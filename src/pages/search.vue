<template>
  <div>
    <h1 class="offscreen">Pesquisar</h1>
    <!-- eslint-disable -->
    <LocalSearch indexURL="media/lunr_index/index.json">
      <template v-slot="{searchResults}">
        <div>
          <LocalSearchInput componentId="mainQuery" />
          <LocalSearchDropDown componentId="keywords" searchFilter="keywords" />
          <NewsGrid :items=searchResults />
        </div>
      </template>
    </LocalSearch>
    <!-- eslint-enable -->
  </div>
</template>

<script>
import NewsGrid from '~/components/news/NewsGrid'
import LocalSearch from '~/components/search/LocalSearch'
import LocalSearchInput from '~/components/search/LocalSearchInput'
import LocalSearchDropDown from '~/components/search/LocalSearchDropDown'

import { mapActions } from 'vuex'

export default {
  name: 'SearchPage',
  components: {
    NewsGrid,
    LocalSearch,
    LocalSearchInput,
    LocalSearchDropDown
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
