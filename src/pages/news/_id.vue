<template>
  <AbstractPage :title="newsItem.title" :body="newsItem.body" :image="newsItem.thumbnail">
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
