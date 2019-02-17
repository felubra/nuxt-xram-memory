<template>
  <div >
    <D3TagCloud v-if="!error" :keywords="keywords" />
  </div>
</template>

<script>
/**
 * Componente wrapper para D3TagCloud em utilização com o ReactiveSearch.
 */
import D3TagCloud from './D3TagCloud'

export default {
  name: 'ReactiveD3TagCloud',
  components: {
    D3TagCloud
  },
  props: ['aggregations', 'error'],
  computed: {
    keywords() {
      let words = []
      // TODO: calcular o fator de tamanho da fonte em função da largura do container
      const FONT_SIZE_DELTA = 16
      if (this.hasKeywords()) {
        return this.$props.aggregations.keywords.names.buckets.map(
          (keyword, i) => {
            return {
              text: keyword.key,
              slug: this.$props.aggregations.keywords.slugs.buckets[i].key,
              size:
                (keyword.doc_count / this.keywordsStdDeviation) *
                FONT_SIZE_DELTA
            }
          }
        )
      }
      return words
    },
    keywordsStdDeviation() {
      function standardDeviation(values) {
        const avg = average(values)

        const squareDiffs = values.map(function(value) {
          const diff = value - avg
          const sqrDiff = diff * diff
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
      if (this.hasKeywords()) {
        return standardDeviation(
          this.$props.aggregations.keywords.names.buckets.map(
            keyword => keyword.doc_count
          )
        )
      }
      return 1
    }
  },

  methods: {
    hasKeywords() {
      return (
        // checking for when component gets the aggregation results
        this.$props.aggregations &&
        this.$props.aggregations.keywords &&
        this.$props.aggregations.keywords.slugs &&
        this.$props.aggregations.keywords.slugs.buckets.length > 0 &&
        this.$props.aggregations &&
        this.$props.aggregations.keywords &&
        this.$props.aggregations.keywords.names &&
        this.$props.aggregations.keywords.names.buckets.length ===
          this.$props.aggregations.keywords.slugs.buckets.length
      )
    }
  }
}
</script>


<style scoped>
</style>
