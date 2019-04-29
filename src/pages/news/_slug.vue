<template>
  <AbstractPage>
    <template v-slot:header>
      <img :src="theImage">
      <h1>{{theTitle}}</h1>
    </template>
    <div class="content-container">
      <h2>Detalhes da notícia</h2>
      <NewsInfo :news-item="newsItem"></NewsInfo>
    </div>
  </AbstractPage>
</template>

<script>
import { sanitize, getMediaUrl } from '@/utils/'
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
  computed: {
    theTitle() {
      return sanitize(this.newsItem.title)
    },
    theImage() {
      const urlVal = sanitize(this.newsItem.image_capture)
      return urlVal ? getMediaUrl(urlVal) : ''
    }
  },
  async asyncData({ $axios, route, error }) {
    const newsSlug = route.params.slug
    return $axios
      .$get(`/api/v1/news/${newsSlug}`)
      .then(newsItem => {
        return { newsItem }
      })
      .catch(e => {
        const statusCode = (e.response && e.response.status) || 500
        error({ statusCode })
      })
  }
}
</script>
<style scoped>
h2 {
  font-family: 'Cabin', serif;
  font-size: 1.2rem;
}
</style>
