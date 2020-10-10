<template>
  <section class="Page NewsPage">
    <div class="NewsPage__Info">
      <header>
        <figure v-if="theImage">
          <v-img
            :src="theImage"
            @error="changeImagePlaceholder"
          >
            <template
              #placeholder
              class="image-slot"
            >
              <div class="image-slot">
                <v-icon>download</v-icon>
                <Microtext>{{ imagePlaceholder }}</Microtext>
              </div>
            </template>
          </v-img>
        </figure>
        <h1>{{ theTitle }}</h1>
      </header>
      <main>
        <NewsInfo
          class="NewsPage__NewsInfo"
          :news-item="newsItem"
        />
      </main>
    </div>
    <div
      v-if="false"
      class="NewsPage__Capture"
    />
  </section>
</template>

<script>
import NewsInfo from '~/components/news/NewsInfo'

export default {
  name: 'NewsPage',
  components: {
    NewsInfo
  },
  async asyncData ({ $api: { News }, route, error }) {
    const { slug } = route.params
    if (slug) {
      try {
        const newsItem = await News.getBySlug(slug)
        return { newsItem }
      } catch (e) {
        const statusCode = (e.response && e.response.status) || 500
        return error({ statusCode })
      }
    }
    return error({ statusCode: 400 })
  },
  data () {
    return {
      newsItem: {},
      imagePlaceholder: 'Carregando...'
    }
  },
  head () {
    return {
      title: this.newsItem.title,
      titleTemplate: 'xraM-Memory - %s'
    }
  },
  computed: {
    theTitle () {
      return this.$utils.sanitize(this.newsItem.title)
    },
    theImage () {
      const urlVal = this.$utils.sanitize(this.newsItem.thumbnails.news_page)
      return urlVal ? this.$utils.getMediaUrl(urlVal) : ''
    }
  },
  methods: {
    changeImagePlaceholder () {
      this.imagePlaceholder = 'Falha ao carregar a imagem.'
    }
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

a.ImageLink {
  border: solid 1px #efefef;
  display: inline-flex;
  padding: 2px;
  transition: border-color 0.25s ease;
}

a.ImageLink:hover {
  border-color: #a00;
}

.image-slot {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

@media only screen and (min-width: 960px) {
  .NewsPage {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
