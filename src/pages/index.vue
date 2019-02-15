<template>
  <section class="container">
    
      <DataSearch
        class="result-list-container"
        categoryField="authors"
        componentId="SearchSensor"
        :fieldWeights="[10,7,1]"
        :dataField="['title', 'teaser']"
        iconPosition="right"
        :autosuggest="false"
        className="searchBar"
        placeholder="Pesquisar no acervo"
        :showClear="false"
      />
      <ReactiveList
        :react="{and: ['SearchSensor']}"
        componentId="SearchResult"
        dataField="title.raw"
        className="result-list-container"
        :pagination="true"
        :from="0"
        :size="5"
      >
      <div slot="renderData" slot-scope="{ item }">
        <h1>{{item.title}}</h1>
      </div>
      </ReactiveList>
      <no-ssr>
        <ReactiveTagCloud/>
      </no-ssr>
    
  </section>
</template>

<script>
/**
TODO: lidar com estados de erro, atualmente a página fica em branco.
 */
import ReactiveTagCloud from '~/components/ReactiveTagCloud'
export default {
  components: {
    ReactiveTagCloud
  }
}
</script>

<style>
.searchBar {
  margin: 10px;
}
</style>
