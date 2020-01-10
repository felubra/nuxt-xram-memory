<template>
  <div class="ResultStats">
    <Microtext
      class-name="ResultsCounter"
      arrow="down"
      arrow-position="before"
    >{{totalResults}} {{totalResults > 1 ? 'resultados' : 'resultado'}} em {{time}}ms</Microtext>
    <selected-filters
      class-name="SelectedFilters"
      clear-all-label="Limpar filtros"
      :inner-class="{
                button:'SelectedFilters__Filter'
              }"
    />
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

.SelectedFilters {
  margin: 1rem auto !important;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;

}

.SelectedFilters__Filter {
  background: #dcdbdb !important;
  color: #909399;
  font-size: 12px !important;
  /* text-transform: none; */
}

.SelectedFilters__Filter:hover {
  background: $link-color !important;
  color: #fff !important;
  /* text-transform: none; */
}

.ResultCount {
  display: block;
  text-align: center;
}

@media only screen and (min-width: 768px) {
  .ResultStats {
    flex-direction: row;
  }

  .ResultCount {
    display: flex;
    font-weight: 500;
    align-items: center;
  }
  .ResultsCounter {
    order: -1;
  }
}
</style>
