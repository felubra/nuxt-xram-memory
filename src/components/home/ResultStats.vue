<template>
  <div class="ResultStats">
    <selected-filters
      class-name="SelectedFilters"
      clear-all-label="Limpar filtros"
      :inner-class="{
                button:'SelectedFilters__Filter'
              }"
    />
    <Microtext
      class-name="ResultsCounter"
      arrow="down"
    >{{totalResults}} {{totalResults > 1 ? 'resultados' : 'resultado'}} em {{time}}ms</Microtext>
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
  justify-content: center;
}

.SearchResults__ResultsInfo {
  align-self: stretch;
}

.ResultStats {
  margin: 0.5rem 22px;
  display: flex;
  flex-direction: column;
  margin: 3rem 0 0;
  text-align: center;
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
}

.SelectedFilters {
  margin: 2rem 1rem;
}

.SelectedFilters {
  margin: 2rem 1rem;
}

.SelectedFilters {
  margin: 0;
  /* margin-left: auto; */
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  /* margin-left: 20px; */
}

.SelectedFilters__Filter {
  background: #dcdbdb !important;
  color: #909399;
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
    margin: 3rem 4rem 0;
  }

  .ResultCount {
    display: flex;
    font-weight: bold;
    align-items: center;
  }
}
</style>
