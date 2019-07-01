<template>
  <div
    v-masonry
    class="masonry-container"
    transition-duration="0.3s"
    item-selector=".masonry-container > .item"
    column-width="270"
    gutter="32"
    fit-width="true"
  >
    <div v-for="(item, index) in items" :key="index" v-masonry-tile class="item">
      <NewsCard class="item" :result-item="item" />
    </div>
  </div>
</template>

<script>
import NewsCard from './NewsCard'

export default {
  name: 'NewsGrid',
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

<style lang="stylus" scoped>
.item {
  width: 270px;
  min-height: 420px;
  margin: 6px 0;
}

.masonry-container {
  margin: 0 auto;
}
</style>
