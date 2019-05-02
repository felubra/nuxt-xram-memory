<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <ResultCard :result-item="item"></ResultCard>
    </li>
  </ul>
</template>
<script>
import ResultCard from './ResultCard'
export default {
  name: 'ResultCardList',
  components: {
    ResultCard
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
}

li {
  margin: 1rem 0;
}
</style>
