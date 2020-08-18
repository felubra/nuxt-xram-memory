<template>
  <section class="Page SearchPage">
    <client-only>
      <LocalSearchBase
        v-slot:default="{searchResults, resultCount, clear, isLoading, hasError}"
        class="TestPage"
        :initial-state="initialState"
        index-u-r-l="media/lunr_index/index.json">
        <transition appear name="fade" mode="out-in">
          <div v-if="hasError">
            <section>
              <header>
                <Microtext tag="h2" arrow="down">Sem dados</Microtext>
              </header>
              <main>
                <p>Desculpe-nos, mas a pesquisa não está disponível no momento. Por-favor, volte mais tarde.</p>
              </main>
            </section>
          </div>
          <div v-else key="loaded" >
              <div class="SearchBar">
                <LocalSearchInput component-id="query" placeholder="Pesquisar no acervo" />
              </div>
              <CollapsibleContainer class="Filters">
                <div class="Filter">
                  <label for="typeFilter"><Microtext>Tipo</Microtext></label>
                  <LocalSearchDropDown class="" field-name="type" component-id="typeFilter" />
                </div>
                <div class="Filter">
                  <label for="siteFilter"><Microtext>Site/Veículo</Microtext></label>
                  <LocalSearchDropDown field-name="newspaper.title" component-id="newspaperFilter" />
                </div>
                <div class="Filter">
                  <label for="keywordsFilter"><Microtext>Palavras-chave</Microtext></label>
                  <LocalSearchDropDown field-name="keywords" component-id="keywordsFilter" />
                </div>
                <div class="Filter">
                  <label for="subjectsFilter"><Microtext>Assuntos</Microtext></label>
                  <LocalSearchDropDown field-name="subjects" component-id="subjectsFilter" />
                </div>
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
    </client-only>
  </section>
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
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 768px) {
  .Filter {
    width: auto;
    min-width: 250px;
    margin: 1rem 2rem;
  }
}
</style>
