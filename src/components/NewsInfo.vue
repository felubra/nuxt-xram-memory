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
    <div v-if="pdf_captures">
      <dt>Capturas em PDF</dt>
      <dd><a v-for="capture in pdf_captures" :key="capture.url" :href="capture.url">{{capture.title}} </a> </dd>
    </div>
    <div v-if="subjects">
      <dt>Assuntos</dt>
      <dd><a v-for="subject in subjects" :key="subject.url" :href="subject.url">{{subject.title}} </a></dd>
    </div>
    <div v-if="keywords">
      <dt>Palavras-chave</dt>
      <dd><a v-for="keyword in keywords" :key="keyword.url" :href="keyword.url">{{keyword.title}} </a></dd>
    </div>
    <div v-if="teaser">
      <dt>Resumo</dt>
      <dd>{{teaser}}</dd>
    </div>
  </dl>
</template>

<script>
const smartTruncate = require('smart-truncate')
const humanSize = require('human-size')
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
      return this.newsItem.keywords.map(keyword => {
        return {
          url: `/keyword/${keyword.slug}`,
          title: keyword.name
        }
      })
    },
    subjects() {
      return this.newsItem.subjects.map(subject => {
        return {
          url: `/subjects/${subject.slug}`,
          title: subject.name
        }
      })
    },
    pdf_captures() {
      return this.newsItem.pdf_captures.map(capture => {
        return {
          url: capture.pdf_document.file_url,
          title: this.captureNameAndSize(capture)
        }
      })
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
  },
  methods: {
    captureNameAndSize(capture) {
      let title = {}
      try {
        const date = new Date(capture.pdf_capture_date).toLocaleDateString()
        title['date'] = date
      } catch {
        // não adicione
      }

      try {
        const size = humanSize(parseInt(capture.pdf_document.file_size, 10))
        title['size'] = size
      } catch {
        // não adicione
      }
      return `${title.date || 'Captura em PDF'} ${
        title.size ? `(${title.size})` : ''
      }`
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
