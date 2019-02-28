<template>
  <section class="Page">
    <div class="welcome-message">
      <p>
        <em>O</em>
        <strong>Xram-Memory</strong>
        <em>tem o objetivo de manter a memória dos assuntos que a esquerda quer esquecer.</em>
        <a href="/sobre" class="read-more microtext">Saiba mais</a>
      </p>
    </div>
    <DataSearch
      component-id="SearchSensor"
      :field-weights="[10,7]"
      :data-field="['title', 'teaser']"
      icon-position="right"
      :autosuggest="false"
      class-name="SearchBar SearchBar--home"
      placeholder="Pesquisar no acervo"
      :show-clear="false"
      @keyPress="search"
    />
    <no-ssr>
      <ReactiveComponent component-id="ReactiveD3TagCloud" :default-query="tagCloudQuery">
        <div slot-scope="{ aggregations, error }">
          <ReactiveD3TagCloud :aggregations="aggregations" :error="error"/>
        </div>
      </ReactiveComponent>
    </no-ssr>
  </section>
</template>

<script>
import ReactiveD3TagCloud from '~/components/tag-cloud/ReactiveD3TagCloud'

import { TAGCLOUD_QUERY } from '~/config/constants'
export default {
  components: {
    ReactiveD3TagCloud
  },
  computed: {
    tagCloudQuery() {
      return function() {
        return TAGCLOUD_QUERY
      }
    }
  },
  methods: {
    search(e) {
      if (event.which == 13 || event.keyCode == 13) {
        this.$router.push({
          name: 'search-query',
          params: { query: e.target.value }
        })
      }
    }
  }
}
</script>

<style scoped>
.welcome-message {
  font-size: 1.375rem;
  text-align: center;
  margin: 1rem;
}

.welcome-message a {
  display: block;
  text-align: right;
  font-size: 0.75rem;
}
</style>
