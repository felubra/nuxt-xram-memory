<template>
  <D3TagCloud
    v-if="hasData"
    :keywords="keywords(aggregations)"
  />
</template>

<script>
import D3TagCloud from '~/components/tag-cloud/D3TagCloud'
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
      return this.aggregations && this.aggregations.length
    }
  },
  methods: {
    keywords (aggregations) {
      if (!aggregations) {
        return []
      }
      const keywordsStdDeviation = deviation(
        aggregations,
        keyword => keyword.news_count
      )
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
    }
  }
}
</script>
