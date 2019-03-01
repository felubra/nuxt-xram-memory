<template>
  <section class="Page">
    <NewsCard :label="true" :footer="false" :news-item="newsItem"/>
    <NewsInfo :news-item="newsItem"/>
  </section>
</template>

<script>
import NewsCard from '~/components/news/NewsCard'
import NewsInfo from '~/components/news/NewsInfo'
export default {
  components: {
    NewsCard,
    NewsInfo
  },
  data() {
    return {
      newsItem: {}
    }
  },
  async asyncData({ $axios, route }) {
    const newsId = parseInt(route.params.id) || null
    return $axios.$get(`/api/v1/news/${newsId}`).then(newsItem => {
      return { newsItem }
    })
  }
}
</script>

<style scoped>
</style>
