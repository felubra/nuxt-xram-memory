<template>
  <section class="container">
    <DataSearch
      class="result-list-container"
      category-field="authors"
      component-id="SearchSensor"
      :field-weights="[10,7,1]"
      :data-field="['title', 'teaser']"
      icon-position="right"
      :autosuggest="false"
      class-name="searchBar"
      placeholder="Pesquisar no acervo"
      :show-clear="false"
    />
    <div class="results">
      <ReactiveList
        :react="{and: ['SearchSensor']}"
        component-id="SearchResult"
        data-field="title.raw"
        class-name="result-list-container"
        :inner-class="{
          resultsInfo: 'results-info'
        }"
        :pagination="true"
        :from="0"
        :size="5"
      >
        <div slot="renderData" slot-scope="{ item }">
          <NewsCard class="news-card" :news-item="item" />
        </div>

      </ReactiveList>
    </div>
    <no-ssr>
      <ReactiveComponent component-id="ReactiveD3TagCloud" :default-query="tagCloudQuery" >
        <div slot-scope="{ aggregations, error }">
	        <ReactiveD3TagCloud :aggregations="aggregations" :error="error"/>
        </div>
      </ReactiveComponent>
    </no-ssr>
  </section>
</template>

<script>
import ReactiveD3TagCloud from '~/components/ReactiveD3TagCloud'
import NewsCard from '~/components/NewsCard'
import { TAGCLOUD_QUERY } from '~/config/constants'
export default {
  components: {
    ReactiveD3TagCloud,
    NewsCard
  },
  computed: {
    tagCloudQuery() {
      return function() {
        return TAGCLOUD_QUERY
      }
    }
  }
}
</script>

<style>
.searchBar {
  margin: 10px;
}
.results {
  background: #e0e0e0;
}
.results-info {
  color: #555555;
  text-transform: uppercase;
  font-family: 'Cabin', sans-serif;
  margin-left: 12px;
}
.news-card {
  margin: 0.75rem;
}
</style>
