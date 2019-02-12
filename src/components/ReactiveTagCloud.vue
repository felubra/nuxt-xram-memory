<template>
  <ReactiveComponent componentId="componentId" :defaultQuery="query">
    <div slot-scope="{ aggregations }">
      <D3TagCloud :keywords="aggregations.keywords.buckets"/>
    </div>
  </ReactiveComponent>
</template>

<script>
import D3TagCloud from './D3TagCloud'

export default {
  components: {
    D3TagCloud
  },
  props: {
    customQuery: {
      type: Function
    },
    componentId: {
      type: String,
      default: 'ReactiveTagCloud'
    },
    maxWords: {
      type: Number,
      default: 150
    }
  },
  computed: {
    query() {
      if (this.customQuery) {
        return this.customQuery
      }
      const maxWords = this.maxWords
      return function() {
        return {
          aggs: {
            keywords: {
              terms: { field: 'keywords', size: maxWords }
            }
          },
          size: 0
        }
      }
    }
  },
  name: 'ReactiveTagCloud',
  methods: {
    tagsByCount: function() {}
  }
}
</script>

<style scoped>
</style>
