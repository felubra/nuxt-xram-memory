<template>
  <div
    v-masonry
    class="masonry-container"
    transition-duration="0.3s"
    item-selector=".masonry-container > .item"
    column-width="270"
    gutter="32"
    fit-width="true"
    stagger="0.03s"
  >
    <div v-for="(item, index) in items" :key="index" v-masonry-tile class="item">
      <component :is="componentType(item)" class="item" :item="item" />
    </div>
  </div>
</template>

<script>
import NewsCard from './NewsCard'
import ImageCard from './ImageCard'
import DocumentCard from './DocumentCard'

export default {
  name: 'NewsGrid',
  components: {
    NewsCard,
    ImageCard,
    DocumentCard
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    componentType(item) {
      if (item._type && item._type === 'Documento') {
        return item.mime_type && item.mime_type.includes('image/')
          ? 'ImageCard'
          : 'DocumentCard'
      } else {
        return 'NewsCard'
      }
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
