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
        <div>
          <div class="SearchBar">
            <LocalSearchInput component-id="mainQuery" placeholder="Pesquisar no acervo" />
          </div>
          <div class="Filters">
            <div>
              <label for="typeFilter"><Microtext>Tipo</Microtext></label>
              <LocalSearchDropDown field-name="type" component-id="typeFilter" />
            </div>
            <div>
              <label for="siteFilter"><Microtext>Site/Veículo</Microtext></label>
              <LocalSearchDropDown field-name="newspaper.title" component-id="newspaperFilter" />
            </div>
            <div>
              <label for="keywordsFilter"><Microtext>Palavras-chave</Microtext></label>
              <LocalSearchDropDown field-name="keywords" component-id="keywordsFilter" />
            </div>
            <div>
              <label for="subjectsFilter"><Microtext>Assuntos</Microtext></label>
              <LocalSearchDropDown field-name="subjects" component-id="subjectsFilter" />
            </div>
          </div>
        </div>
        <div>
          <ResultStats :total-results="resultCount" />
        </div>
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

<style scoped>
.TestPage {
  flex: 1;
  display: flex;
  position: relative;
}

.TestPage > div {
  min-height: 10vh;
  width: 100%;
}
.Filters {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0 2rem;
}
.Filters > div {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 2rem;
}

.SearchBar {
  max-width: 53rem;
  margin: 3rem auto 0;
}

@media only screen and (min-width: 768px) {
  .Filters {
    flex-direction: row;
  }
  .Filters > div {
    display: flex;
    flex-direction: column;
    width: auto;
  }
}
</style>
