<template>
  <LocalSearchBase
    v-slot:default="{searchResults, resultCount, clear, isLoading, hasError}"
    class="TestPage"
    :initial-state="initialState"
    index-u-r-l="media/lunr_index/index-lunr.json">
    <transition appear name="fade" mode="out-in">
      <div v-if="hasError" key="error" class="Error" >
        Desculpe-nos, mas um erro aconteceu. Tente recarregar esta página mais tarde.
      </div>
      <div v-else key="loaded" >
          <div class="SearchBar">
            <LocalSearchInput component-id="query" placeholder="Pesquisar no acervo" />
          </div>
          <CollapsibleContainer class="Filters">
              <label for="typeFilter"><Microtext>Tipo</Microtext></label>
              <LocalSearchDropDown class="Filter" field-name="type" component-id="typeFilter" />

              <label for="siteFilter"><Microtext>Site/Veículo</Microtext></label>
              <LocalSearchDropDown class="Filter" field-name="newspaper.title" component-id="newspaperFilter" />

              <label for="keywordsFilter"><Microtext>Palavras-chave</Microtext></label>
              <LocalSearchDropDown class="Filter" field-name="keywords" component-id="keywordsFilter" />

              <label for="subjectsFilter"><Microtext>Assuntos</Microtext></label>
              <LocalSearchDropDown class="Filter" field-name="subjects" component-id="subjectsFilter" />
          </CollapsibleContainer>
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
import CollapsibleContainer from '@/components/common/CollapsibleContainer'

export default {
  name: 'TestPage',
  components: {
    LocalSearchBase,
    LocalSearchInput,
    LocalSearchDropDown,
    NewsGrid,
    ResultStats,
    CollapsibleContainer
  },
  data() {
    return {
      initialState: {}
    }
  },
  asyncData({ route }) {
    return {
      initialState: {
        filterState: route.query,
        searchState: {
          query: route.query.text
        }
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
.SearchBar {
  max-width: 53rem;
  margin: 3rem auto 0;
}
.Filters {
  margin-top: 1rem;
}
.Filter {
  margin-bottom: 1rem;
}

@media only screen and (min-width: 768px) {
  .Filter {
    width: auto;
    min-width: 250px;
  }
}
</style>
