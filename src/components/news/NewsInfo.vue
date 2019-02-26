<template>
  <dl class="NewsInfo">
    <div v-if="url" class="NewsInfo__Field">
      <dt>Endereço original</dt>
      <dd>
        <a :href="url.url">{{url.title}}</a>
      </dd>
    </div>
    <div v-if="newspaper" class="NewsInfo__Field">
      <dt>Site / veículo</dt>
      <dd>
        <a :href="newspaper.url">{{newspaper.title}}</a>
      </dd>
    </div>
    <div v-if="published_date" class="NewsInfo__Field">
      <dt>Data de publicação</dt>
      <dd>{{published_date}}</dd>
    </div>
    <div v-if="pdf_captures" class="NewsInfo__Field">
      <dt>Capturas em PDF</dt>
      <dd>
        <a v-for="capture in pdf_captures" :key="capture.url" :href="capture.url">{{capture.title}}</a>
      </dd>
    </div>
    <div v-if="subjects" class="NewsInfo__Field">
      <dt>Assuntos</dt>
      <dd>
        <nuxt-link
          v-for="subject in subjects"
          :key="subject.slug"
          :to="{name:'subject-slug', params:{ slug: subject.slug}, query:  {title:subject.name } }"
        >{{subject.name}}</nuxt-link>
      </dd>
    </div>
    <div v-if="keywords" class="NewsInfo__Field">
      <dt>Palavras-chave</dt>
      <dd>
        <nuxt-link
          v-for="keyword in keywords"
          :key="keyword.slug"
          :to="{name:'keyword-slug', params:{ slug: keyword.slug}, query:  {title:keyword.name } }"
        >{{keyword.name}}</nuxt-link>
      </dd>
    </div>
    <div v-if="teaser" class="NewsInfo__Field">
      <dt>Resumo</dt>
      <dd>{{teaser}}</dd>
    </div>
  </dl>
</template>

<script>
const smartTruncate = require('smart-truncate')
const humanSize = require('human-size')
const dayJs = require('dayjs')
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
      return this.newsItem.keywords
    },
    subjects() {
      return this.newsItem.subjects
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
        const dateTime = dayJs(capture.pdf_capture_date)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        title['date'] = dateTime.toDate().toLocaleDateString()
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
