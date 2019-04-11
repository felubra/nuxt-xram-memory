<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <NewsCard :news-item="item"></NewsCard>
    </li>
  </ul>
</template>
<script>
import NewsCard from './NewsCard'
export default {
  name: 'NewsCardList',
  components: {
    NewsCard
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
