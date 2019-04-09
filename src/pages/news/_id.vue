<template>
  <AbstractPage>
    <template v-slot:header>
      <img :src="theImage">
      <div class="content-container">
        <h1>{{theTitle}}</h1>
      </div>
    </template>
    <div class="content-container">
      <h2>Detalhes da notícia</h2>
      <NewsInfo :news-item="newsItem"></NewsInfo>
    </div>
  </AbstractPage>
</template>

<script>
import xss from 'xss'
import { appClassesXSSFilter, getMediaUrl } from '@/utils/'
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
      return xss(this.newsItem.title, appClassesXSSFilter)
    },
    theImage() {
      const urlVal = xss(this.newsItem.image_capture, appClassesXSSFilter)
      return urlVal ? getMediaUrl(urlVal) : ''
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
