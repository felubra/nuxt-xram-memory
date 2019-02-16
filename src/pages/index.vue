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
    <ReactiveList
      :react="{and: ['SearchSensor']}"
      component-id="SearchResult"
      data-field="title.raw"
      class-name="result-list-container"
      :pagination="true"
      :from="0"
      :size="5"
    >
      <div slot="renderData" slot-scope="{ item }">
        <h1>{{ item.title }}</h1>
      </div>
    </ReactiveList>
    <no-ssr>
      <ReactiveTagCloud />
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
