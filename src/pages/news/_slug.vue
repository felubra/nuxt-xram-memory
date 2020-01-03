<template>
  <section class="Page NewsPage">
    <div class="NewsPage__Info">
      <header>
        <figure v-if="theImage">
          <img :src="theImage" />
        </figure>
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
import NewsInfo from '~/components/news/NewsInfo'
import { sanitize, getMediaUrl } from '@/utils/'

export default {
  name: 'NewsPage',
  components: {
    NewsInfo
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
    if (newsSlug) {
      try {
        const newsItem = await $axios.$get(`/api/v1/news/${newsSlug}`)
        return { newsItem }
      } catch (e) {
        const statusCode = (e.response && e.response.status) || 500
        return error({ statusCode })
      }
    }
    return error({ statusCode: 400 })
  }
}
</script>
<style lang="stylus" scoped>
header {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 200px;
  margin-bottom: 40px;
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
  margin-bottom: 1rem;
}

p.microtext {
  margin-top: auto;
}

h1 {
  margin: auto 0;
}

@media only screen and (min-width: 960px) {
  .NewsPage {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
