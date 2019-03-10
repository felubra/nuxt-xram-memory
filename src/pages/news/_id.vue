<template>
  <section class="Page">
    <header>
      <img v-if="image" :src="image" alt>
      <div class="content-container">
        <p class="microtext">Notícia</p>
        <h1 v-html="title"></h1>
      </div>
    </header>
    <aside>
      <div class="content-container">
        <h2 class="Page__Subtitle">Detalhes da notícia</h2>
        <NewsInfo :newsItem="newsItem"/>
      </div>
    </aside>
  </section>
</template>

<script>
const { getMediaUrl } = require('~/utils')
import NewsCard from '~/components/news/NewsCard'
import NewsInfo from '~/components/news/NewsInfo'
import xss from 'xss'
import { appClassesXSSFilter } from '@/utils/'
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
  computed: {
    teaser() {
      return (
        this.newsItem.teaser !== undefined &&
        xss(this.newsItem.teaser, appClassesXSSFilter)
      )
    },
    title() {
      return (
        this.newsItem.title !== undefined &&
        xss(this.newsItem.title, appClassesXSSFilter)
      )
    },
    image() {
      try {
        if (
          this.newsItem &&
          this.newsItem.image_capture &&
          typeof this.newsItem.image_capture === 'string'
        ) {
          // path obtido por um resultado do ElasticSearch
          return getMediaUrl(this.newsItem.image_capture)
        } else {
          // path obtido pela API
          return (
            this.newsItem.image_capture.image_document &&
            getMediaUrl(this.newsItem.image_capture.image_document.file)
          )
        }
      } catch {
        /** TODO: retorne um ícone padrão se não houver imagem */
        return false
      }
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
h1,
h2 {
  font-weight: 500;
}
.Page__Subtitle {
  display: none;
}

section.Page {
  align-content: center;
}
header {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
}

aside {
  flex-grow: 1;
  background: #ffffff;
}

@media only screen and (min-width: 768px) {
  .Page__Subtitle {
    display: block;
    margin: 0 0 1rem;
  }
}
</style>
