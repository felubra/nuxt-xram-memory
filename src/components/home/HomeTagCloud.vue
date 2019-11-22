<template>
  <ReactiveComponent
    class="ReactiveD3TagCloud--home"
    component-id="ReactiveD3TagCloud"
    :default-query="tagCloudQuery"
  >
    <div slot-scope="{ aggregations, error }">
      <D3TagCloud v-if="!error" :keywords="keywords(aggregations)" />
    </div>
  </ReactiveComponent>
</template>


<script>
import D3TagCloud from '~/components/tag-cloud/D3TagCloud'
import { TAGCLOUD_QUERY } from '~/config/constants'

export default {
  name: 'HomeTagCloud',
  components: {
    D3TagCloud
  },
  props: {
    sizeDelta: {
      type: Number,
      default: 16
    }
  },
  computed: {
    tagCloudQuery() {
      return function() {
        return TAGCLOUD_QUERY
      }
    }
  },
  methods: {
    keywords(aggregations) {
      const keywordsStdDeviation = this.keywordsStdDeviation(aggregations)
      try {
        return aggregations.keywords.names.buckets.map(keyword => {
          return {
            text: keyword.key,
            slug: keyword.slug.buckets[0].key,
            size: (keyword.doc_count / keywordsStdDeviation) * this.sizeDelta
          }
        })
      } catch {
        return []
      }
    },
    keywordsStdDeviation(aggregations) {
      function standardDeviation(values) {
        const avg = average(values)

        const squareDiffs = values.map(function(value) {
          const diff = value - avg
          const sqrDiff = Math.sqrt((diff * diff) ^ 2)
          return sqrDiff
        })

        const avgSquareDiff = average(squareDiffs)

        const stdDev = Math.sqrt(avgSquareDiff)
        return stdDev
      }

      function average(data) {
        const sum = data.reduce(function(sum, value) {
          return sum + value
        }, 0)

        const avg = sum / data.length
        return avg
      }
      try {
        return standardDeviation(
          aggregations.keywords.names.buckets.map(keyword => keyword.doc_count)
        )
      } catch {
        return 1
      }
    }
  }
}
</script>


<style scoped>
</style>
