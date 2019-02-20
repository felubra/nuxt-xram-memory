<template>
  <section class="page-container">
    <h1 class="PageTitle"><span class="PageTitle__Label microtext">Palavra-chave:</span> {{slugTitle}}</h1>
    <ReactiveList
      component-id="SearchResults"
      :pagination="false"
      data-field="title.raw"
      class-name="SearchResults"
      :inner-class="{
        resultsInfo: 'SearchResults__ResultsInfo'
      }"
      :from="0"
      :size="5"
      :default-query="slugQuery"
    >
      <a slot="renderData"  slot-scope="{ item }" class='SearchResults__Result' :href='`/news/${item.slug}`'>
        <NewsCard :news-item="item"/>
      </a>
    </ReactiveList>
  </section>
</template>

<script>
// TODO: inserir o título da palavra-chave
import NewsCard from '~/components/NewsCard'

export default {
  name: 'SlugPage',
  components: {
    NewsCard
  },
  computed: {
    slug() {
      return this.$route.params.slug || ''
    },
    slugTitle() {
      return this.$route.query.title || this.slug
    },
    slugQuery() {
      const slug = this.slug
      return function() {
        return {
          query: {
            nested: {
              path: 'keywords',
              query: {
                match: {
                  'keywords.slug': slug
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style>
</style>
