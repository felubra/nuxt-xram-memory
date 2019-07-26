<template>
  <no-ssr>
    <DefaultReactiveBase class-name="Page SearchPage">
      <h1 class="offscreen">Pesquisar</h1>
      <!-- eslint-disable -->
      <HomeSearchInput :URLParams="true" />
      <!-- eslint-enable -->
      <SearchFilters />
      <HomeSearchResults />
    </DefaultReactiveBase>
  </no-ssr>
</template>

<script>
import HomeSearchResults from '~/components/home/HomeSearchResults'
import DefaultReactiveBase from '@/components/DefaultReactiveBase'
import HomeSearchInput from '~/components/home/HomeSearchInput'
import SearchFilters from '@/components/home/SearchFilters'

export default {
  name: 'SearchPage',
  components: {
    HomeSearchInput,
    DefaultReactiveBase,
    SearchFilters,
    HomeSearchResults
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
