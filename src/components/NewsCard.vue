<template>
  <div class="news-card">
    <img v-if="image" :src="image" alt="">
    <h3>{{newsItem.title}}</h3>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    newsItem: {
      type: Object,
    }
  },
  computed: {
    title() {
      return this.newsItem.title
    },
    teaser() {
      return this.newsItem.teaser
    },
    image() {
      if (this.newsItem.image_capture) {
        return `${process.env.mediaUrl}${this.newsItem.image_capture}`
      }
      /** TODO: retorne um ícone padrão se não houver imagem */
      return "";
    },
  }
}
</script>

<style scoped>

h3{
  font-weight:normal;
  text-align: left;
  margin: 0;
}

</style>
