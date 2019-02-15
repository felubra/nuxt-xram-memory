<template>
  <section class="container">
    
      <ReactiveList
        :react="{and: ['SearchSensor']}"
        componentId="SearchResult"
        dataField="title.raw"
        :defaultQuery=query
        className="result-list-container"
        :pagination="true"
        :from="0"
        :size="5"
      >
      <div slot="renderData" slot-scope="{ item }">
        <NewsCard :newsItem="item"></NewsCard>
      </div>
      </ReactiveList>
    
  </section>
</template>

<script>
//TODO: inserir o título da palavra-chave
import NewsCard from '~/components/NewsCard'

export default {
  name: 'slugPage',
  computed: {
    slug() {
      return this.$route.params['slug'] || ""
    },
    query() {
      const slug = this.slug
        return function () {
          return {
            "query": {
              "nested": {
                "path": "keywords",
                "query": {
                  "match": {
                    "keywords.slug": slug
                  }
                }
              }
            }
          }
        };
    },
  },
  components: {
    NewsCard
  }
}
</script>

<style>

</style>
