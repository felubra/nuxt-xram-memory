<template>
  <!-- eslint-disable -->
  <ReactiveList
    :react="{and: ['search', 'type', 'newspaper', 'keywords', 'published_year']}"
    component-id="SearchResults"
    :pagination="false"
    data-field="title.raw"
    class-name="SearchResults"
    loader="Carregando..."
    renderError="Oops, infelizmente um erro aconteceu, tente novamente mais tarde."
    :inner-class="{
      resultsInfo: 'SearchResults__ResultsInfo microtext',
      list: 'SearchResults__List'
    }"
    :from="0"
    :size="20"
  >
    <ResultStats
      slot="renderResultStats"
      slot-scope="{ totalResults, time }"
      :total-results="totalResults"
      :time="time"
    />
    <div class="NoResults" slot="renderNoResults">Nenhum resultado encontrado</div>
    <NewsGrid id="HomeMasonryGrid" slot="renderAllData" slot-scope="{ results }" :items="results"></NewsGrid>
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
  }
}
</script>

<style>
.SearchResults {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#HomeMasonryGrid {
  justify-content: center;
}
.NoResults {
  font-weight: bold;
}
</style>
