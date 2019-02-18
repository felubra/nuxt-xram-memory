<template>
  <dl>
    <div v-if="url">
      <dt>Endereço original</dt>
      <dd><a :href="url.url">{{url.title}}</a></dd>
    </div>
    <div v-if="newspaper">
      <dt>Site / veículo</dt>
      <dd><a :href="newspaper.url">{{newspaper.title}}</a></dd>
    </div>
    <div v-if="published_date">
      <dt>Data de publicação</dt>
      <dd>{{published_date}}</dd>
    </div>
    <div v-if="captures_links">
      <dt>Capturas</dt>
      <dd>{{captures_links}}</dd>
    </div>
    <div v-if="subjects">
      <dt>Assuntos</dt>
      <dd>{{subjects}}</dd>
    </div>
    <div v-if="keywords">
      <dt>Palavras-chave</dt>
      <dd>{{keywords}}</dd>
    </div>
    <div v-if="teaser">
      <dt>Resumo</dt>
      <dd>{{teaser}}</dd>
    </div>
  </dl>
</template>

<script>
const smartTruncate = require('smart-truncate')
export default {
  name: 'NewsInfo',
  props: {
    newsItem: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    teaser() {
      return this.newsItem.teaser
    },
    keywords() {
      //TODO:
      return ''
    },
    subjects() {
      //TODO:
      return ''
    },
    captures_links() {
      //TODO:
      return ''
    },
    published_date() {
      if (this.newsItem.published_date) {
        try {
          const time = new Date(
            this.newsItem.published_date
          ).toLocaleTimeString()
          const date = new Date(
            this.newsItem.published_date
          ).toLocaleDateString()
          return `${date} ${time}`
        } catch {
          return ''
        }
      }
      return ''
    },
    newspaper() {
      if (
        this.newsItem.newspaper &&
        this.newsItem.newspaper.url &&
        this.newsItem.newspaper.title
      ) {
        return {
          url: this.newsItem.newspaper.url,
          title: this.newsItem.newspaper.title
        }
      }
      return false
    },
    url() {
      return {
        url: this.newsItem.url,
        title: smartTruncate(this.newsItem.url, 120, { position: 20 })
      }
    }
  }
}
</script>

<style scoped>
dt {
  color: #555555;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75rem;
  font-family: 'Cabin', sans-serif;
}
dl {
  background: #e0e0e0;
  position: relative;
  height: 100%;
  padding: 0.75rem;
  margin: 0;
}
dd {
  margin: 0.5rem 0;
  font-size: 0.875rem;
}
</style>
