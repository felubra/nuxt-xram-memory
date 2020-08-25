<template>
  <div class="ResultStats">
    <Microtext class-name="ResultsCounter" arrow="down" arrow-position="before">
      {{resultStats}}
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
    resultStats() {
      try {
        return `${this.totalResults} ${
          this.totalResults > 1 ? 'resultados' : 'resultado'
        } em ${this.time.toFixed(2)}ms`
      } catch {
        return ''
      }
    }
  }
}
</script>
<style lang="stylus">
.ResultsCounter {
  order: 1;
}
.ResultsCounter.microtext {
  margin-right: 1rem;

}

.ResultStats {
  display: flex;
  flex-direction: column;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
