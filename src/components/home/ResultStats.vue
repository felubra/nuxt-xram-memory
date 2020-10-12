<template>
  <div class="ResultStats">
    <Microtext
      class-name="ResultsCounter"
      arrow="down"
      arrow-position="before"
    >
      {{ resultStats }}
    </Microtext>
  </div>
</template>
<script>
import Microtext from '@/components/common/Microtext'

export default {
  name: 'ResultStats',
  components: {
    Microtext
  },
  props: {
    totalResults: {
      type: Number,
      default: 0
    },
    time: {
      type: Number,
      default: 0
    }
  },
  computed: {
    resultStats () {
      const resultsLabel = this.totalResults > 1 ? 'resultados' : 'resultado'
      const meaningfulTime = this.time > 0 ? ` em ${this.time.toFixed(2)}ms` : ''
      return `${this.totalResults} ${resultsLabel + meaningfulTime}`
    }
  }
}
</script>
<style lang="stylus" scoped>
.ResultStats
  display: flex
  flex-direction: column
  text-align: center
  display: flex
  justify-content: flex-start
  align-items: center

.ResultsCounter
  order: 1

.ResultsCounter.microtext
  margin-right: 1rem
</style>
