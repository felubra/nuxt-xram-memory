<template>
  <section class="container">
    <ReactiveBase app="artifact_news" url="http://127.0.0.1:9200">
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
        <h1>{{item.title}}</h1>
      </div>
      </ReactiveList>
    </ReactiveBase>
  </section>
</template>

<script>
import ReactiveTagCloud from '~/components/ReactiveTagCloud'
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
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.searchBar {
  margin: 10px;
}
</style>
