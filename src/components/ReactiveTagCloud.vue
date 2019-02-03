<template>
  <ReactiveComponent componentId="componentId" :defaultQuery="defaultQuery">
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
    defaultQuery: {
      type: Function,
      default: function() {
        return {
          aggs: {
            keywords: {
              terms: { field: 'keywords' }
            }
          },
          size: 0
        }
      }
    },
    componentId: {
      type: String,
      default: 'ReactiveTagCloud'
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
