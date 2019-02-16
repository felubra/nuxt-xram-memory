<template>
  <section class="container">
    <ReactiveList
      :react="{and: ['SearchSensor']}"
      component-id="SearchResult"
      data-field="title.raw"
      :default-query="query"
      class-name="result-list-container"
      :pagination="true"
      :from="0"
      :size="5"
    >
      <div slot="renderData" slot-scope="{ item }">
        <NewsCard :news-item="item" />
      </div>
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
    query() {
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
