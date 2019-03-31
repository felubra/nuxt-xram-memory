<template>
  <AbstractPage :title="newsItem.title" :body="newsItem.body" :image="newsItem.image_capture">
    <h2>Detalhes da notícia</h2>
    <NewsInfo :news-item="newsItem"></NewsInfo>
  </AbstractPage>
</template>

<script>
import NewsInfo from '~/components/news/NewsInfo'
import AbstractPage from '~/components/common/AbstractPage'
export default {
  components: {
    NewsInfo,
    AbstractPage
  },
  head() {
    return {
      title: this.newsItem.title,
      titleTemplate: 'xraM-Memory - %s'
    }
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
