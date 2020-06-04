<template>
  <div>
    <LocalSearchBase v-slot:default="{searchResults, clear}" :initial-state="initialState" index-u-r-l="media/lunr_index/index.json">
      <LocalSearchInput component-id="mainQuery" placeholder="Pesquisar no acervo" />
      <LocalSearchDropDown field-name="type" component-id="typeFilter" />
      <LocalSearchDropDown field-name="keywords" component-id="keywordsFilter" />
      <LocalSearchDropDown field-name="subjects" component-id="subjectsFilter" />
      <LocalSearchDropDown field-name="newspaper.title" component-id="newspaperFilter" />
      <el-button @click=clear>Limpar</el-button>
      <NewsGrid :items='searchResults' />
    </LocalSearchBase>
  </div>
</template>

<script>
import LocalSearchBase from '@/components/search/LocalSearchBase'
import LocalSearchInput from '@/components/search/LocalSearchInput'
import LocalSearchDropDown from '@/components/search/LocalSearchDropDown'
import NewsGrid from '@/components/news/NewsGrid'

export default {
  name: 'TestPage',
  components: {
    LocalSearchBase,
    LocalSearchInput,
    LocalSearchDropDown,
    NewsGrid
  },
  data() {
    return {
      initialState: {}
    }
  },
  asyncData({ route }) {
    return {
      initialState: {
        filterState: route.query
      }
    }
  }
}
</script>

<style>
</style>
