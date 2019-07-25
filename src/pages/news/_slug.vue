<template>
  <section class="Page NewsPage">
    <div class="NewsPage__Info">
      <header>
        <figure>
          <img :src="theImage" />
        </figure>
        <Microtext>Notícia</Microtext>
        <h1>{{theTitle}}</h1>
      </header>
      <main>
        <NewsInfo class="NewsPage__NewsInfo" :news-item="newsItem"></NewsInfo>
      </main>
    </div>
    <div v-if="false" class="NewsPage__Capture"></div>
  </section>
</template>

<script>
import Microtext from '~/components/common/Microtext'
import NewsInfo from '~/components/news/NewsInfo'
import { sanitize, getMediaUrl } from '@/utils/'

export default {
  components: {
    NewsInfo,
    Microtext
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
      const urlVal = sanitize(this.newsItem.thumbnails.news_page)
      return urlVal ? getMediaUrl(urlVal) : ''
    },
    pdfUrl() {
      try {
        return (
          this.newsItem.pdf_captures &&
          this.newsItem.pdf_captures.map(capture => {
            return {
              document_id: capture.pdf_document.document_id,
              title: this.captureNameAndSize(capture)
            }
          })[0]
        )
      } catch {
        return ''
      }
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
<style lang="stylus" scoped>
header {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.NewsPage {
  display: flex;
  flex-direction: column;
  padding-top: 0;
}

.NewsPage__Info {
  flex-grow: 1;
  text-align: center;
  max-width: $max-width;
}

.NewsPage__NewsInfo {
  text-align: justify;
}

figure {
  min-height: 350px;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  margin: 0;
}

@media only screen and (min-width: 960px) {
  .NewsPage {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
