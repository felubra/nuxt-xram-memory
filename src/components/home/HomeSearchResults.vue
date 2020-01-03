<template>
  <!-- eslint-disable -->
  <ReactiveList
    :react="{and: ['text', 'type', 'newspaper', 'keywords', 'subjects', 'published_year']}"
    component-id="SearchResults"
    :pagination="false"
    data-field="title.raw"
    :sortOptions="[{
      label: 'Data de publicação',
      dataField: 'published_date',
      sortBy: 'desc',
    }, {
      label: 'Título',
      dataField: 'title.raw',
      sortBy: 'asc',
    }]"
    class-name="SearchResults"
    loader="Carregando..."
    renderError="Oops, infelizmente um erro aconteceu, tente novamente mais tarde."
    :inner-class="{
      resultsInfo: 'SearchResults__ResultsInfo microtext',
      list: 'SearchResults__List',
      sortOptions: 'SearchResults__SortOptions microtext',
    }"
    :from="0"
    :size="20"
  >
    <template v-slot:renderResultStats="{ numberOfResults, time }">
      <ResultStats :total-results="numberOfResults" :time="time" />
    </template>
    <div class="NoResults" slot="renderNoResults">
      Nenhum resultado encontrado
      <button class="ClearResults" @click="clearValues">Recomeçar</button>
    </div>
    <template v-slot:render="{ data }">
      <NewsGrid id="HomeMasonryGrid" :items="data"></NewsGrid>
    </template>
  </ReactiveList>
  <!-- eslint-enable -->
</template>

<script>
import NewsGrid from '@/components/news/NewsGrid'
import ResultStats from './ResultStats'

export default {
  name: 'HomeSearchResults',
  components: {
    ResultStats,
    NewsGrid
  },
  methods: {
    clearValues() {
      this.$parent.$$store.dispatch({
        type: 'CLEAR_VALUES' //hack
      })
    }
  }
}
</script>

<style lang="stylus">
.SearchResults__ResultsInfo.microtext {
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  flex-direction: column;
}

.SearchResults__SortOptions.microtext {
  order: 2;
  color: #555;
}

.SearchResults {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ClearResults {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: 1px solid transparent;
  min-height: 30px;
  word-wrap: break-word;
  padding: 5px 12px;
  line-height: 1.2rem;
  background-color: rgb(220, 219, 219);
  color: #333333;
  cursor: pointer;
  text-transform: uppercase;
  font-family: $sans-serif;
  user-select: none;
  transition: all 0.3s ease;
  margin: 1rem auto;
}

#HomeMasonryGrid {
  justify-content: center;
}

.NoResults {
  font-weight: 500;
  font-family: $sans-serif;
}

.ClearResults {
  font-family: $sans-serif !important;
}

@media only screen and (min-width: 768px) {
  .SearchResults__ResultsInfo.microtext {
    margin: 3rem 4rem 0;
    flex-direction: row;
  }
}
</style>
