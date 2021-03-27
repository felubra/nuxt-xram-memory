<template>
  <D3TagCloud
    v-if="hasData"
    :keywords="keywords(aggregations)"
  />
</template>

<script>
import D3TagCloud from '~/components/common/D3TagCloud'
import { deviation } from 'd3-array'

export default {
  name: 'HomeTagCloud',
  components: {
    D3TagCloud
  },
  props: {
    sizeDelta: {
      type: Number,
      default: 48
    },
    aggregations: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasData () {
      return Array.isArray(this.aggregations) && this.aggregations.length
    }
  },
  methods: {
    keywords (aggregations) {
      try {
        if (!aggregations) {
          throw new Error()
        }
        const keywordsStdDeviation = deviation(
          aggregations,
          keyword => keyword.news_count
        )
        return aggregations.map(keyword => {
          return {
            text: keyword.name,
            slug: keyword.slug,
            size: keywordsStdDeviation === 0
              ? this.sizeDelta
              : (keyword.news_count / keywordsStdDeviation) * this.sizeDelta
          }
        })
      } catch {
        return []
      }
    }
  }
}
</script>
