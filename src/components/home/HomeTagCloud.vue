<template>
  <div class="">
    <D3TagCloud :keywords="keywords(aggregations)" />
  </div>
</template>


<script>
import D3TagCloud from '~/components/tag-cloud/D3TagCloud'
import { TAGCLOUD_NUM_KEYWORDS } from '~/config/constants'

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
  data() {
    return {
      aggregations: null
    }
  },
  async mounted() {
    try {
      this.aggregations = await this.$axios.$get(
        `/api/v1/keywords/top?max=${TAGCLOUD_NUM_KEYWORDS}`
      )
    } catch {
      this.aggregations = null
    }
  },
  methods: {
    keywords(aggregations) {
      if (!aggregations) {
        return []
      }
      const keywordsStdDeviation = this.keywordsStdDeviation(aggregations)
      try {
        return aggregations.map(keyword => {
          return {
            text: keyword.name,
            slug: keyword.slug,
            size: (keyword.news_count / keywordsStdDeviation) * this.sizeDelta
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

        const avg = sum / data.news_count
        return avg
      }
      try {
        return standardDeviation(
          aggregations.keywords.names.buckets.map(keyword => keyword.news_count)
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
