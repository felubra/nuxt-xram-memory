<template>
  <div class="Page NewsPage">
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
  </div>
</template>

<script>
import UnknownFilePreview from '~/components/viewers/UnknownFilePreview'
import { sanitize, getMediaUrl } from '@/utils/'
import NewsInfo from '~/components/news/NewsInfo'
import AbstractPage from '~/components/common/AbstractPage'
import Microtext from '~/components/common/Microtext'

export default {
  components: {
    NewsInfo,
    Microtext,
    PDFFilePreview: () => {
      if (!process.client) {
        return {
          component: UnknownFilePreview
        }
      } else {
        return {
          component: import('../../components/viewers/PDFFilePreview')
        }
      }
    }
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
  padding: 1rem 0;
}

.NewsPage__Info {
  flex-grow: 1;
  max-width: 960px;
  text-align: center;
}

.NewsPage__NewsInfo {
  text-align: justify;
}

figure {
  min-height: 350px;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
}

@media only screen and (min-width: 960px) {
  .NewsPage {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
