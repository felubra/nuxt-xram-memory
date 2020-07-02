<template>
  <LocalSearchBase
    v-slot:default="{searchResults, resultCount, clear, isLoading, hasError}"
    class="TestPage"
    :initial-state="initialState"
    index-u-r-l="media/lunr_index/index.json">
    <transition appear name="fade" mode="out-in">
      <div v-if="hasError" key="error" class="Error" >
        Desculpe-nos, mas um erro aconteceu. Tente recarregar esta página mais tarde.
      </div>
      <div v-else key="loaded" >
        <LocalSearchInput component-id="mainQuery" placeholder="Pesquisar no acervo" />
        <LocalSearchDropDown field-name="type" component-id="typeFilter" />
        <LocalSearchDropDown field-name="keywords" component-id="keywordsFilter" />
        <LocalSearchDropDown field-name="subjects" component-id="subjectsFilter" />
        <LocalSearchDropDown field-name="newspaper.title" component-id="newspaperFilter" />
        <el-button @click=clear>Limpar</el-button>
        <ResultStats :total-results="resultCount" />
        <NewsGrid
          v-loading="isLoading"
          class="NewsGrid"
          :items='searchResults'
          element-loading-text="Carregando..."
          element-loading-background="transparent"
        />
      </div>
    </transition>
  </LocalSearchBase>
</template>

<script>
import LocalSearchBase from '@/components/search/LocalSearchBase'
import LocalSearchInput from '@/components/search/LocalSearchInput'
import LocalSearchDropDown from '@/components/search/LocalSearchDropDown'
import NewsGrid from '@/components/news/NewsGrid'
import ResultStats from '@/components/home/ResultStats.vue'

export default {
  name: 'TestPage',
  components: {
    LocalSearchBase,
    LocalSearchInput,
    LocalSearchDropDown,
    NewsGrid,
    ResultStats
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
.TestPage {
  flex: 1;
  display: flex;
  position: relative;
}

.NewsGrid,
.TestPage > div {
  min-height: 10vh;
  width: 100%;
}
</style>
